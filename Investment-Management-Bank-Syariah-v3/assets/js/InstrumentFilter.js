/**
 * @fileoverview InstrumentFilter.js: A dedicated class for managing filter UI.
 * This class adheres to SRP by encapsulating all logic for populating,
 * listening to, and processing the instrument filters.
 * It notifies the controller of changes via a callback.
 *
 * --- MIGRATION NOTE ---
 * This file has been updated to support the new data model:
 * 1. Changed 'tingkat_risiko' to 'risiko'.
 * 2. Added a new filter for 'syariah'.
 */
class InstrumentFilter {
    /**
     * @param {HTMLElement} filterContainer - The <div an element to build the filter UI inside.
     * @param {Array<Object>} allInstrumen - The full, unfiltered list of instruments.
     */
    constructor(filterContainer, allInstrumen) {
        this.container = filterContainer;
        this.allInstrumen = allInstrumen;

        // Internal state
        this.currentKategori = 'all';
        this.currentRisiko = 'all';
        this.currentSyariah = 'all'; // --- NEW ---

        // Callback to be set by the controller
        this.onFilterChangeCallback = null;

        this._buildFilterUI();
        this._populateFilters();
        this._addEventListeners();
    }

    /**
     * PUBLIC: Registers a callback function to be executed when the filter state changes.
     * @param {function} callback - The function to call, e.g., controller._renderInstrumen
     */
    onFilterChange(callback) {
        this.onFilterChangeCallback = callback;
    }

    /**
     * PUBLIC: Returns the list of instruments based on the current filter state.
     * @returns {Array<Object>} The filtered list of instruments.
     */
    getFilteredList() {
        // If 'all' is selected, the match is always true.
        // Otherwise, check for a direct match.
        return this.allInstrumen.filter(item => {
            const kategoriMatch = (this.currentKategori === 'all') || (item.kategori === this.currentKategori);
            // --- MODIFIED ---
            const risikoMatch = (this.currentRisiko === 'all') || (item.risiko === this.currentRisiko);
            // --- NEW ---
            const syariahMatch = (this.currentSyariah === 'all') || (item.syariah === this.currentSyariah);

            return kategoriMatch && risikoMatch && syariahMatch;
        });
    }

    // --- Internal (Private) Methods ---

    /**
     * Injects the filter HTML skeleton into the container.
     * --- MODIFIED --- Now a 3-column grid
     */
    _buildFilterUI() {
        this.container.className = "p-6 bg-white rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-4";
        this.container.innerHTML = `
            <div class="flex-1">
                <label for="kategori-filter" class="block text-sm font-medium text-brand-dark mb-1">Filter Kategori</label>
                <select id="kategori-filter" class="w-full p-2 border border-brand-secondary/40 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent">
                    <option value="all">Semua Kategori</option>
                </select>
            </div>
            <div class="flex-1">
                <label for="risiko-filter" class="block text-sm font-medium text-brand-dark mb-1">Filter Risiko</label>
                <select id="risiko-filter" class="w-full p-2 border border-brand-secondary/40 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent">
                    <option value="all">Semua Tingkat Risiko</option>
                </select>
            </div>
            <div class="flex-1">
                <label for="syariah-filter" class="block text-sm font-medium text-brand-dark mb-1">Filter Syariah</label>
                <select id="syariah-filter" class="w-full p-2 border border-brand-secondary/40 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent">
                    <option value="all">Semua Status Syariah</option>
                </select>
            </div>
        `;

        // Store references to the dropdowns for event listeners
        this.kategoriFilterEl = this.container.querySelector('#kategori-filter');
        this.risikoFilterEl = this.container.querySelector('#risiko-filter');
        this.syariahFilterEl = this.container.querySelector('#syariah-filter'); // --- NEW ---
    }

    /**
     * Populates the filter dropdowns with unique, sorted values from the data.
     * --- MODIFIED --- Reads 'risiko' and adds 'syariah'
     */
    _populateFilters() {
        // Clean Code: Use sets for unique values, then sort
        const kategori = [...new Set(this.allInstrumen.map(item => item.kategori))].sort();
        // --- MODIFIED ---
        const risiko = [...new Set(this.allInstrumen.map(item => item.risiko))].sort();
        // --- NEW ---
        const syariah = [...new Set(this.allInstrumen.map(item => item.syariah))].sort();

        kategori.forEach(val => {
            if (val) this.kategoriFilterEl.innerHTML += `<option value="${val}">${val}</option>`;
        });
        risiko.forEach(val => {
            if (val) this.risikoFilterEl.innerHTML += `<option value="${val}">${val}</option>`;
        });
        // --- NEW ---
        syariah.forEach(val => {
            if (val) this.syariahFilterEl.innerHTML += `<option value="${val}">${val}</option>`;
        });
    }

    /**
     * Attaches change listeners to the filter dropdowns.
     * --- MODIFIED --- Added listener for syariah filter
     */
    _addEventListeners() {
        this.kategoriFilterEl.addEventListener('change', () => this._handleFilterChange());
        this.risikoFilterEl.addEventListener('change', () => this._handleFilterChange());
        // --- THIS LINE IS NOW FIXED ---
        this.syariahFilterEl.addEventListener('change', () => this._handleFilterChange());
    }

    /**
     * Internal handler that updates state and executes the controller's callback.
     * --- MODIFIED --- Added listener for syariah filter
     */
    _handleFilterChange() {
        this.currentKategori = this.kategoriFilterEl.value;
        this.currentRisiko = this.risikoFilterEl.value;
        this.currentSyariah = this.syariahFilterEl.value; // --- NEW ---

        if (this.onFilterChangeCallback) {
            this.onFilterChangeCallback(this.getFilteredList());
        }
    }
}
