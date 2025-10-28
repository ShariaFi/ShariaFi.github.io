/*
 * ====================================================================
 * app.js: Main Application Shell & Router (VERSION 7 - FINAL)
 * ====================================================================
 * This is the final version.
 *
 * NEW:
 * - Added a new 'subscribe' call for 'navigateToTab'.
 * - This allows the Quiz module (or any module) to
 * request a tab change, which this AppShell will execute.
 * - This completes the "loop" for our Smart Quiz feature.
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

        // --- BIND 'this' CONTEXT ---
        // Bind 'switchTab' so it can be used as a callback
        this.switchTab = this.switchTab.bind(this);
    }

    init() {
        // 2. Instantiate all "App" modules
        new BerandaModule(this.eventBus);
        new StrategiModule(this.eventBus);
        new BatasanModule(this.eventBus);
        new InstrumenExplorer(this.eventBus);
        new SimulasiModule(this.eventBus);
        new Quiz(this.eventBus);

        // 3. Instantiate "Service" modules
        new KurikulumModule(this.eventBus);

        // 4. Set up the tab-switching logic for click events
        this.navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.dataset.target;
                this.switchTab(targetId);
            });
        });

        // --- THE NEW LINE ---
        // 5. Subscribe to "navigation request" events
        // This allows the quiz to tell the AppShell to change tabs.
        this.eventBus.subscribe('navigateToTab', this.switchTab);
        // ---------------------

        // 6. Load the default tab
        this.switchTab('beranda');
    }

    /**
     * This is the "Router" logic.
     * @param {string} targetId - The ID of the tab to show.
     */
    switchTab(targetId) {
        this.contentSections.forEach(section => {
            section.classList.toggle('active', section.id === targetId);
        });

        this.navButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.target === targetId);
        });

        this.eventBus.publish('tabChanged', targetId);
    }
}