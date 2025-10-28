/*
 * ====================================================================
 * instrumen-explorer.js: (TYPO FIX)
 * ====================================================================
 * BUGFIX:
 * - Fixed all 'class.name=' typos to the correct 'className'.
 * - This file should now render correctly.
 */
class InstrumenExplorer {
    constructor(eventBus) {
        this.section = document.getElementById('instrumen');
        this.eventBus = eventBus;
        this.hasInitialized = false;
        this.allInstrumen = [];

        this.filterContainer = document.createElement('div');
        this.instrumenGrid = document.createElement('div');
        this.modal = document.createElement('div');

        // This line is correct (from the last fix)
        this.eventBus.subscribe('tabChanged', (targetId) => this.handleTabChange(targetId));
    }

    // --- 2. Controller Logic (now async) ---
    async handleTabChange(targetId) {
        if (targetId !== 'instrumen' || this.hasInitialized) {
            return;
        }
        await this.init();
        this.hasInitialized = true;
    }

    // --- 3. Main Initialization Function (now awaited) ---
    async init() {
        this.createSkeleton();

        try {
            const response = await fetch('assets/data/instrumen.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.allInstrumen = await response.json();

            this.populateFilters();
            this.renderInstrumen(this.allInstrumen);
            this.addEventListeners();

        } catch (error) {
            console.error("Error fetching instrumen.json:", error);
            this.instrumenGrid.innerHTML = `<p class="text-brand-secondary text-center col-span-3">Gagal memuat data instrumen.</p>`;
        }
    }

    // --- 4. View Functions (TYPOS FIXED) ---
    createSkeleton() {
        // --- FIX ---
        this.filterContainer.className = "p-6 bg-white rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4";
        this.filterContainer.innerHTML = `
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
        `;

        // --- FIX ---
        this.instrumenGrid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

        this.modal.id = "instrumen-modal";

        // --- FIX ---
        this.modal.className = "hidden fixed inset-0 bg-brand-dark/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm";

        this.section.appendChild(this.filterContainer);
        this.section.appendChild(this.instrumenGrid);
        document.body.appendChild(this.modal);
    }

    populateFilters() {
        const kategoriFilter = document.getElementById('kategori-filter');
        const risikoFilter = document.getElementById('risiko-filter');
        const kategori = [...new Set(this.allInstrumen.map(item => item.kategori))];
        const risiko = [...new Set(this.allInstrumen.map(item => item.tingkat_risiko))];
        kategori.sort().forEach(val => {
            kategoriFilter.innerHTML += `<option value="${val}">${val}</option>`;
        });
        risiko.sort().forEach(val => {
            risikoFilter.innerHTML += `<option value="${val}">${val}</option>`;
        });
    }

    renderInstrumen(instrumenList) {
        this.instrumenGrid.innerHTML = '';
        if (instrumenList.length === 0) {
            this.instrumenGrid.innerHTML = `<p class="text-brand-secondary text-center col-span-3">Tidak ada instrumen yang cocok.</p>`;
            return;
        }
        instrumenList.forEach(item => {
            const card = document.createElement('div');
            // --- FIX ---
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

    // --- 5. Controller/Event Functions (Unchanged) ---
    addEventListeners() {
        document.getElementById('kategori-filter').addEventListener('change', () => this.filterInstrumen());
        document.getElementById('risiko-filter').addEventListener('change', () => this.filterInstrumen());
        this.instrumenGrid.addEventListener('click', (e) => {
            const button = e.target.closest('.read-more-btn');
            if (button) this.openModal(button.dataset.id);
        });
        this.modal.addEventListener('click', (e) => {
            if (e.target.id === 'instrumen-modal' || e.target.closest('#modal-close-btn')) {
                this.closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.closeModal();
            }
        });
    }

    filterInstrumen() {
        const kategori = document.getElementById('kategori-filter').value;
        const risiko = document.getElementById('risiko-filter').value;
        const filteredList = this.allInstrumen.filter(item => {
            const kategoriMatch = (kategori === 'all') || (item.kategori === kategori);
            const risikoMatch = (risiko === 'all') || (item.tingkat_risiko === risiko);
            return kategoriMatch && risikoMatch;
        });
        this.renderInstrumen(filteredList);
    }

    openModal(itemId) {
        const item = this.allInstrumen.find(i => i.id === itemId);
        if (!item) return;

        // --- FIXES ---
        this.modal.innerHTML = `
            <div class="bg-brand-light max-w-2xl w-full rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div class="p-6 border-b border-brand-secondary/20">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="inline-block bg-brand-accent/20 text-brand-dark text-xs font-semibold px-3 py-1 rounded-full mb-2">${item.kategori}</span>
                            <h2 class="font-serif text-3xl text-brand-dark">${item.nama}</h2>
                        </div>
                        <button id="modal-close-btn" class="text-brand-secondary text-3xl font-bold leading-none hover:text-brand-dark">&times;</button>
                    </div>
                </div>
                <div class="p-6 overflow-y-auto space-y-4">
                    <p class="font-sans text-brand-dark leading-relaxed">${item.deskripsi_lengkap}</p>
                    <div><h4 class="font-sans font-semibold text-brand-dark">Akad Utama:</h4><p class="font-sans text-brand-secondary">${item.akad_utama.join(', ')}</p></div>
                    <div><h4 class="font-sans font-semibold text-brand-dark">Dasar Hukum:</h4><p class="font-sans text-brand-secondary">${item.dasar_hukum}</p></div>
                </div>
            </div>
        `;
        // --- FIX ---
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        // --- FIX ---
        this.modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}