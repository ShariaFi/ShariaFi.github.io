/*
 * ====================================================================
 * app.js: Main Application Shell & Router (VERSION 10 - Truly Robust Errors)
 * ====================================================================
 * BUGFIX:
 * - 'switchTab' no longer hides the error banner.
 * - 'handleCriticalError' now disables all nav buttons for a true
 * "graceful crash" state, forcing a page refresh.
 */

/*
 * ====================================================================
 * app.js: Main Application Shell & Router (VERSION 11 - ESM)
 * ====================================================================
 */


document.addEventListener('DOMContentLoaded', () => {
    const app = new AppShell();
    app.init();
});

class AppShell {
    constructor() {
        this.eventBus = new EventBus();
        this.navButtons = document.querySelectorAll('.nav-link');
        this.contentSections = document.querySelectorAll('.content-section');
        this.errorBanner = document.getElementById('global-error-banner');

        // BIND 'this' CONTEXT
        this.switchTab = this.switchTab.bind(this);
        this.handleCriticalError = this.handleCriticalError.bind(this);
    }

   init() {

        // 1. Create the new renderer instance
        const kurikulumRenderer = new KurikulumRenderer();

        // 2. Inject the renderer into the KurikulumModule
        const kurikulumModule = new KurikulumModule(this.eventBus, kurikulumRenderer); // <-- UPDATED LINE

        // All other modules that depend on kurikulumModule will now
        // get the refactored version automatically. No other changes needed here.
        new BerandaModule(this.eventBus, kurikulumModule);
        new StrategiModule(this.eventBus, kurikulumModule);
        new PrinsipModule(this.eventBus);
        new InstrumenController(this.eventBus);
        new SimulasiModule(this.eventBus);
        new Quiz(this.eventBus);


        this.navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.dataset.target;
                this.switchTab(targetId);
            });
        });

        // Subscribe to navigation events...
        this.eventBus.subscribe(AppConfig.EVENTS.NAVIGATE_TO_TAB, this.switchTab);

        // Subscribe to CRITICAL_ERROR events
        this.eventBus.subscribe(AppConfig.EVENTS.CRITICAL_ERROR, this.handleCriticalError);

        // Load the default tab
        this.switchTab(AppConfig.DEFAULT_TAB_ID);
    }

    /**
     * This is the "Router" logic.
     * @param {string} targetId - The ID of the tab to show.
     */
    switchTab(targetId) {
        // --- THIS BLOCK IS REMOVED ---
        // if (!this.errorBanner.classList.contains('hidden')) {
        //     this.errorBanner.classList.add('hidden');
        // }
        // ------------------------------

        this.contentSections.forEach(section => {
            section.classList.toggle('active', section.id === targetId);
        });

        this.navButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.target === targetId);
        });

        this.eventBus.publish(AppConfig.EVENTS.TAB_CHANGED, targetId);
    }

    /**
     * --- Global Error Handler (UPDATED) ---
     * Displays a user-friendly error message and disables the UI.
     * @param {object} errorData - An object containing { module, message }
     */
    handleCriticalError(errorData) {
        console.error(`CRITICAL ERROR in ${errorData.module}:`, errorData.message);

        this.errorBanner.innerHTML = `
            <div class="p-4 mb-6 bg-red-100 border-l-4 border-red-500 text-red-700">
                <p class="font-bold">Terjadi Kesalahan Kritis</p>
                <p>Gagal memuat data (${errorData.module}). Aplikasi tidak dapat dilanjutkan. Silakan muat ulang halaman.</p>
            </div>
        `;
        this.errorBanner.classList.remove('hidden');

        // Hide all main content sections
        this.contentSections.forEach(section => {
            section.classList.remove('active');
        });
        // Disable all navigation buttons to prevent further actions
        // in a broken state.
        this.navButtons.forEach(button => {
            button.disabled = true;
            // This 'disabled' attribute will be styled by your style.css
        });


    }
}