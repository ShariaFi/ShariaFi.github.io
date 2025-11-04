/*
 * ====================================================================
 * KurikulumModule.js: (VERSION 4.2 - FINAL FIX)
 * ====================================================================
 * Listens for 'renderKurikulum' event from other modules.
 * This prevents the race condition and ensures the "slot"
 * exists before this module tries to render.
 */
class KurikulumModule {
    /**
     * @param {EventBus} eventBus - The global event bus.
     * @param {KurikulumRenderer} renderer - The dedicated view renderer.
     */
    constructor(eventBus, renderer) {
        this.eventBus = eventBus;
        this.renderer = renderer; // <-- Dependency Injected!

        this.allKurikulum = [];
        this.hasFetched = false;

        // --- 🛑 THIS IS THE FIX 🛑 ---
        // Stop listening for the old tab change event.
        // this.eventBus.subscribe(AppConfig.EVENTS.TAB_CHANGED, (targetId) => this.handleTabChange(targetId));

        // Start listening for the NEW event that BerandaModule is publishing.
        this.eventBus.subscribe('renderKurikulum', (targetId) => this.renderContent(targetId));
    }

    async fetchData() {
        try {
            const response = await fetch(AppConfig.DATA_PATHS.KURIKULUM);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.allKurikulum = await response.json();
            this.hasFetched = true;
        } catch (error) {
            this.eventBus.publish(AppConfig.EVENTS.CRITICAL_ERROR, {
                module: "Kurikulum",
                message: `Failed to fetch data: ${error.message}`
            });
        }
    }

    /**
     * (Renamed from 'handleTabChange' to 'renderContent')
     * Renders curriculum content into the correct slot.
     */
    async renderContent(targetId) {
        // Add error handling for safety
        try {
            // 1. Define the specific slot ID we are looking for
            const slotId = `${targetId}-kurikulum-slot`;
            const specificSlot = document.getElementById(slotId);

            // 2. Define the fallback (the main section)
            const fallbackSection = document.getElementById(targetId);

            // 3. Determine the correct container to append to
            const container = specificSlot || fallbackSection;

            // If the container doesn't exist or is already done, stop.
            if (!container || container.classList.contains('kurikulum-added')) {
                return;
            }

            // Fetch data if we haven't already
            if (!this.hasFetched) {
                await this.fetchData();
            }

            // Filter the data for the specific tab
            const items = this.allKurikulum.filter(item => {
                if (Array.isArray(item.kategori_tab)) {
                    return item.kategori_tab.includes(targetId);
                }
                return item.kategori_tab === targetId;
            });

            // If no items for this tab, mark as 'added' and stop.
            if (items.length === 0) {
                container.classList.add('kurikulum-added'); // Mark the container
                return;
            }

            // Use the renderer to build the HTML
            const curriculumElement = this.renderer.render(items, targetId);

            // Append the HTML and mark as 'added'
            if (curriculumElement) {
                container.appendChild(curriculumElement);
                container.classList.add('kurikulum-added'); // Mark the container
            }

        } catch (error) {
            // If anything failed, publish a critical error
            console.error(`Error rendering curriculum for ${targetId}:`, error);
            this.eventBus.publish(AppConfig.EVENTS.CRITICAL_ERROR, {
                module: "KurikulumRenderer",
                message: `Failed to render content: ${error.message}`
            });
        }
    }
}