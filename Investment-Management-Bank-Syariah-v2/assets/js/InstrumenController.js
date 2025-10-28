/**
 * @fileoverview InstrumenController: Controls the Instrument tab (View and Logic).
 *
 * REFACTOR (FINAL): This class now delegates all filter logic to InstrumentFilter
 * and all modal logic to InstrumentModal. Its sole responsibilities are:
 * 1. Orchestrate its helper classes (Filter and Modal).
 * 2. Manage data fetching (this.allInstrumen).
 * 3. Render the grid (this._renderInstrumen).
 * This is a perfect example of the Single Responsibility Principle.
 */
class InstrumenController {
    /**
     * @param {EventBus} eventBus - The central communication bus for inter-module events.
     */
    constructor(eventBus) {
        this.section = document.getElementById('instrumen');
        this.eventBus = eventBus;
        this.hasInitialized = false;
        this.allInstrumen = [];

        // --- Class properties for our helper classes ---
        this.instrumentFilter = null;
        // Instantiate the modal class. It handles its own setup.
        this.instrumentModal = new InstrumentModal();


        // --- View Elements ---
        this.filterContainer = document.createElement('div');
        this.instrumenGrid = document.createElement('div');

        // Subscribe to 'tabChanged'
        this.eventBus.subscribe(AppConfig.EVENTS.TAB_CHANGED, (targetId) => this.handleTabChange(targetId));
    }

    // --- Controller Logic (Public Interface) ---

    /**
     * Handles the 'tabChanged' event from the AppShell.
     * @param {string} targetId - The ID of the currently active tab.
     * @returns {Promise<void>}
     */
    async handleTabChange(targetId) {
        if (targetId !== 'instrumen' || this.hasInitialized) {
            return;
        }
        await this.init();
        this.hasInitialized = true;
    }

    /**
     * Main initialization method: fetches data, builds UI, and attaches listeners.
     * @returns {Promise<void>}
     */
    async init() {
        this._createGridSkeleton();

        try {
            const response = await fetch(AppConfig.DATA_PATHS.INSTRUMEN);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} at ${AppConfig.DATA_PATHS.INSTRUMEN}`);
            }
            this.allInstrumen = await response.json();

            // 1. Instantiate the filter class
            this.instrumentFilter = new InstrumentFilter(this.filterContainer, this.allInstrumen);

            // 2. Tell the filter what to do on change (pass the callback)
            // We use .bind(this) to ensure '_renderInstrumen' has the correct 'this' context
            this.instrumentFilter.onFilterChange(this._renderInstrumen.bind(this));

            // Initial render with the default "all" filters
            this._renderInstrumen(this.instrumentFilter.getFilteredList());

            // 3. Add event listeners for the grid only
            this._addGridEventListeners();

        } catch (error) {
            // --- THIS BLOCK IS UPDATED ---
            // OLD: console.error(...)
            // OLD: this.instrumenGrid.innerHTML = ...

            // NEW: Publish the error to the global handler
            this.eventBus.publish(AppConfig.EVENTS.CRITICAL_ERROR, {
                module: "Instrumen",
                message: error.message
            });
            // -----------------------------
        }
    }

    // --- Internal View and Utility Functions ---

    /**
     * Creates the main grid skeleton and appends containers to the section.
     */
    _createGridSkeleton() {
        // The filter container is passed to InstrumentFilter, which populates it.
        this.section.appendChild(this.filterContainer);

        this.instrumenGrid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
        this.section.appendChild(this.instrumenGrid);
    }

    /**
     * Renders the filtered list of instrument data onto the grid.
     * @param {Array<Object>} instrumenList - The list of instruments to render.
     */
    _renderInstrumen(instrumenList) {
        this.instrumenGrid.innerHTML = '';
        if (instrumenList.length === 0) {
            this.instrumenGrid.innerHTML = `<p class="text-brand-secondary text-center col-span-3">Tidak ada instrumen yang cocok.</p>`;
            return;
        }
        instrumenList.forEach(item => {
            const card = document.createElement('div');
            card.className = "bg-white p-6 rounded-lg shadow-md border-t-4 border-transparent hover:shadow-lg hover:border-brand-accent transition-all duration-300 flex flex-col";
            card.innerHTML = `
                <div class="flex-grow">
                    <span class="inline-block bg-brand-accent/20 text-brand-dark text-xs font-semibold px-3 py-1 rounded-full mb-2">${item.kategori}</span>
                    <h3 class="font-serif text-2xl font-semibold text-brand-dark mb-2">${item.nama}</h3>
                    <p class="font-sans text-brand-secondary mb-4">${item.deskripsi_singkat}</p>
                </div>
                <button data-id="${item.id}" class="read-more-btn font-sans font-semibold text-brand-accent hover:text-brand-dark self-start">
                    Selengkapnya &rarr;
                </button>
            `;
            this.instrumenGrid.appendChild(card);
        });
    }

    // --- Event Handlers ---

    /**
     * Adds event listeners for the grid (modal triggers).
     */
    _addGridEventListeners() {
        this.instrumenGrid.addEventListener('click', (e) => {
            const button = e.target.closest('.read-more-btn');
            if (button) {
                // Find the data and tell the modal to open itself
                const item = this.allInstrumen.find(i => i.id === button.dataset.id);
                this.instrumentModal.open(item); // Delegate to the modal class
            }
        });
    }

    // ALL MODAL AND FILTER METHODS ARE NOW GONE.
}