/**
 * @fileoverview InstrumenController: Controls the Instrument tab (View and Logic).
 *
 * REFACTOR (FINAL): This class now delegates all filter logic to InstrumentFilter
 * and all modal logic to InstrumentModal. Its sole responsibilities are:
 * 1. Orchestrate its helper classes (Filter and Modal).
 * 2. Manage data fetching (this.allInstrumen).
 * 3. Render the grid (this._renderInstrumen).
 * This is a perfect example of the Single Responsibility Principle.
 *
 * NOTE: THIS FILE HAS BEEN MIGRATED TO A NEW INFOGRAPHIC-STYLE DESIGN.
 * It now renders a static header with charts and uses a new card format.
 * This requires 'Chart.js' to be loaded globally and custom CSS classes.
 * It also assumes the 'instrumen.json' data model has been expanded
 * to include fields like 'risiko', 'syariah', 'penjelasan', 'fatwa', etc.
 *
 * -- DYNAMIC REFACTOR --
 * This version now dynamically calculates stats (hero numbers, chart data)
 * from the fetched 'instrumen.json' file instead of using hard-coded values.
 *
 * -- CARD DESIGN HYBRID --
 * The _renderInstrumen method now uses a HYBRID card design, combining
 * the information density of the new card with the modal-triggering
 * button and layout of the original "prettier" card.
 */


// 2. REGISTER THE CHART COMPONENTS


class InstrumenController {
    /**
     * @param {EventBus} eventBus - The central communication bus for inter-module events.
     * @param {KurikulumModule} kurikulumModule - The shared curriculum service.
     */
    constructor(eventBus, kurikulumModule) {
        this.section = document.getElementById('instrumen');
        this.eventBus = eventBus;
        this.hasInitialized = false;

        // --- NEW ---
        // Property to store our dynamically calculated stats
        this.stats = {
            totalProducts: 0,
            syariahCategories: 0,
            riskLevels: 0,
            kategoriChartData: { labels: [], datasets: [] },
            risikoChartData: { labels: [], datasets: [] }
        };

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
        // Kirim event untuk memberitahu KurikulumModule agar merender kontennya.
        this.eventBus.publish('renderKurikulum', targetId);
    }

    /**
     * Main initialization method: fetches data, builds UI, and attaches listeners.
     * @returns {Promise<void>}
     */
    async init() {
        // --- MODIFIED ---
        // We create the skeleton, but the numbers will be empty at first.
        this._createGridSkeleton();

        try {
            const response = await fetch(AppConfig.DATA_PATHS.INSTRUMEN);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} at ${AppConfig.DATA_PATHS.INSTRUMEN}`);
            }
            this.allInstrumen = await response.json();

            // --- NEW ---
            // 1. Analyze the data and store it in this.stats
            this._analyzeAndStoreStats();

            // --- NEW ---
            // 2. Re-render the static content, this time WITH the stats
            this._renderStaticContent();

            // 3. Instantiate the filter class
            this.instrumentFilter = new InstrumentFilter(this.filterContainer, this.allInstrumen);

            // 4. Tell the filter what to do on change (pass the callback)
            this.instrumentFilter.onFilterChange(this._renderInstrumen.bind(this));

            // 5. Initial render with the default "all" filters
            this._renderInstrumen(this.instrumentFilter.getFilteredList());

            // 6. Add event listeners for the grid only
            this._addGridEventListeners();

            // 7. Create the charts (which will now use this.stats)
            this._createCharts();


        } catch (error) {
            this.eventBus.publish(AppConfig.EVENTS.CRITICAL_ERROR, {
                module: "Instrumen",
                message: error.message
            });
        }
    }

    // --- Internal View and Utility Functions ---

    /**
     * Creates the main grid skeleton and appends containers to the section.
     * (This method is unchanged from the previous step)
     */
    _createGridSkeleton() {
        // 1. Create a wrapper for all our new static content
        const staticContentWrapper = document.createElement('div');
        // --- NEW ---
        // We give it an ID so we can populate it later
        staticContentWrapper.id = "instrumen-static-content";
        this.section.appendChild(staticContentWrapper);

        // 2. Append the existing containers (which will be populated by other classes)
        this.section.appendChild(this.filterContainer);

        // 3. Add spacing for the grid
        // --- MODIFIED ---
        // We use the original grid class list from your old file.
        this.instrumenGrid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
        this.section.appendChild(this.instrumenGrid);

        // 4. Create the dedicated slot for curriculum content
        const kurikulumSlot = document.createElement('div');
        kurikulumSlot.id = "instrumen-kurikulum-slot"; // <-- The ID KurikulumModule looks for
        this.section.appendChild(kurikulumSlot);

    }

    // --- NEW ---
    /**
     * Renders the static infographic content AFTER data has been analyzed.
     * (This method is unchanged from the previous step, including the title fix)
     */
    _renderStaticContent() {
        const wrapper = document.getElementById('instrumen-static-content');
        if (!wrapper) return;

        // We use this.stats to dynamically build the HTML
        wrapper.innerHTML = `
            <section id="hero" class="text-center mb-10">
                <h1 class="text-4xl font-serif text-brand-dark font-bold mb-4">Panduan Visual Investasi Syariah</h1>
                <p class="text-lg text-brand-dark/80 mb-8">Menganalisis ${this.stats.totalProducts} jenis produk investasi umum di Indonesia berdasarkan risiko dan prinsip syariah.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <span class="text-4xl font-bold text-blue-700">${this.stats.totalProducts}</span>
                        <p class="text-slate-500">Produk Dianalisis</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <span class="text-4xl font-bold text-red-600">${this.stats.syariahCategories}</span>
                        <p class="text-slate-500">Kategori Syariah</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <span class="text-4xl font-bold text-yellow-600">${this.stats.riskLevels}</span>
                        <p class="text-slate-500">Level Risiko</p>
                    </div>
                </div>
            </section>
    
            <section id="visualisasi" class="mb-16">
                <h2 class="text-3xl font-bold text-center mb-10">Visualisasi Data</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-xl font-semibold text-center mb-4">Komposisi Kepatuhan Syariah per Kategori</h3>
                        <p class="text-sm text-slate-600 mb-4 text-center">Bagan ini menunjukkan bagaimana produk investasi di setiap kategori terbagi berdasarkan kepatuhan syariah (Sesuai, Tinjau Ulang, atau Tidak Sesuai).</p>
                        <div class="chart-container">
                            <canvas id="chartKategori"></canvas>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-xl font-semibold text-center mb-4">Sebaran Risiko dari ${this.stats.totalProducts} Produk</h3>
                        <p class="text-sm text-slate-600 mb-4 text-center">Distribusi dari total produk yang dianalisis berdasarkan tingkat risikonya, dari sangat rendah hingga sangat tinggi.</p>
                        <div class="chart-container">
                            <canvas id="chartRisiko"></canvas>
                        </div>
                    </div>
                </div>
            </section>
    
            <section id="prinsip" class="mb-16">
                <h2 class="text-3xl font-bold text-center mb-10">3 Pilar Utama Investasi Syariah</h2>
                <p class="text-lg text-slate-600 text-center mb-8">Investasi syariah diatur untuk menghindari tiga larangan utama ini. Status "Tidak Sesuai" umumnya disebabkan oleh pelanggaran satu atau lebih dari prinsip-prinsip ini.</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white p-8 rounded-lg shadow-lg text-center border-b-4 border-red-600">
                        <h3 class="text-3xl font-bold text-red-600 mb-2">Riba (ربا)</h3>
                        <h4 class="text-xl font-semibold text-slate-700 mb-4">Bunga</h4>
                        <p class="text-slate-600">Larangan atas tambahan atau keuntungan yang diperoleh dari pinjaman (utang-piutang), seperti bunga bank atau kupon obligasi konvensional. Ini adalah pelanggaran paling umum pada produk konvensional.</p>
                    </div>
                    <div class="bg-white p-8 rounded-lg shadow-lg text-center border-b-4 border-yellow-600">
                        <h3 class="text-3xl font-bold text-yellow-600 mb-2">Gharar (غرر)</h3>
                        <h4 class="text-xl font-semibold text-slate-700 mb-4">Ketidakpastian</h4>
                        <p class="text-slate-600">Larangan atas transaksi yang mengandung ketidakpastian, ketidakjelasan, atau ambiguitas yang berlebihan pada objek akad, yang dapat merugikan salah satu pihak. Sering ditemukan dalam derivatif atau asuransi konvensional.</p>
                    </div>
                    <div class="bg-white p-8 rounded-lg shadow-lg text-center border-b-4 border-blue-600">
                        <h3 class="text-3xl font-bold text-blue-600 mb-2">Maysir (ميسر)</h3>
                        <h4 class="text-xl font-semibold text-slate-700 mb-4">Spekulasi / Judi</h4>
                        <p class="text-slate-600">Larangan atas transaksi yang bersifat spekulatif atau untung-untungan (perjudian). Ini sering dikaitkan dengan perdagangan derivatif atau saham 'gorengan' yang tidak didasari analisis fundamental.</p>
                    </div>
                </div>
            </section>
    
            <hr class="my-8 border-slate-200">
            
            <h2 class="text-3xl font-bold text-center mb-10">Katalog Produk Investasi</h2>
        `;
    }

    /**
     * Renders the filtered list of instrument data onto the grid.
     * --- MODIFIED ---
     * This is now a HYBRID card design.
     * It combines the original layout/button with the new info (risk/syariah).
     * Assumes 'instrumen.json' contains 'kategori', 'nama', 'deskripsi_singkat',
     * 'risiko', 'syariah', and 'id'.
     */
    _renderInstrumen(instrumenList) {
        this.instrumenGrid.innerHTML = '';
        if (instrumenList.length === 0) {
            this.instrumenGrid.innerHTML = `<p class="text-brand-secondary text-center col-span-3">Tidak ada instrumen yang cocok.</p>`;
            return;
        }

        // --- Define the style mappings ---
        // These provide the colors for risk and syariah status.
        const riskClasses = {
            'Sangat Rendah': 'risk-sangat-rendah',
            'Rendah': 'risk-rendah',
            'Menengah': 'risk-menengah',
            'Tinggi': 'risk-tinggi',
            'Sangat Tinggi': 'risk-sangat-tinggi'
        };

        const syariahBorderClasses = {
            'Sesuai': 'border-blue-600',
            'Tinjau Ulang': 'border-yellow-600',
            'Tidak Sesuai': 'border-red-600'
        };

        const syariahTextColors = {
            'Sesuai': 'text-blue-600',
            'Tinjau Ulang': 'text-yellow-600',
            'Tidak Sesuai': 'text-red-600'
        };

        const syariahText = {
            'Sesuai': 'Sesuai Syariah',
            'Tinjau Ulang': 'Tinjau Ulang',
            'Tidak Sesuai': 'Tidak Sesuai'
        };
        // --------------------------------------------------------

        instrumenList.forEach(item => {
            const card = document.createElement('div');
            // This is the HYBRID card design
            // Uses original layout but adds dynamic border color from syariah status
            card.className = `bg-white p-6 rounded-lg shadow-md border-t-4 ${syariahBorderClasses[item.syariah] || 'border-transparent'} hover:shadow-lg transition-all duration-300 flex flex-col`;

            card.innerHTML = `
                <div class="flex-grow">
                    <div class="flex justify-between items-center mb-2">
                        <span class="inline-block bg-brand-accent/20 text-brand-dark text-xs font-semibold px-3 py-1 rounded-full">${item.kategori}</span>
                        <span class="px-3 py-1 rounded-full text-xs font-semibold ${riskClasses[item.risiko] || 'bg-slate-200 text-slate-800'}">
                            ${item.risiko}
                        </span>
                    </div>

                    <h3 class="font-serif text-2xl font-semibold text-brand-dark mb-2">${item.nama}</h3>
                    <p class="font-sans text-brand-secondary mb-4">${item.deskripsi_singkat}</p>

                    <span class="font-semibold text-sm ${syariahTextColors[item.syariah] || 'text-slate-800'} mb-4 block">
                        ${syariahText[item.syariah] || item.syariah}
                    </span>
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
     * This method will now work again because _renderInstrumen
     * is creating the '.read-more-btn' elements.
     */
    _addGridEventListeners() {
        this.instrumenGrid.addEventListener('click', (e) => {
            const button = e.target.closest('.read-more-btn');
            if (button) {
                const item = this.allInstrumen.find(i => i.id === button.dataset.id);
                this.instrumentModal.open(item);
            }
        });
    }

    // --- NEW ---
    /**
     * Analyzes 'this.allInstrumen' and populates 'this.stats'.
     * (This method is unchanged from the previous step)
     */
    _analyzeAndStoreStats() {
        const products = this.allInstrumen;

        // 1. Hero Stats
        this.stats.totalProducts = products.length;
        this.stats.syariahCategories = new Set(products.map(p => p.syariah)).size;
        this.stats.riskLevels = new Set(products.map(p => p.risiko)).size;

        // 2. Kategori Chart Data
        const kategoriLabels = ['Perbankan', 'Pasar Modal', 'Asuransi', 'Lainnya'];
        const syariahStatus = ['Sesuai', 'Tinjau Ulang', 'Tidak Sesuai'];
        const syariahColors = ['#00AEEF', '#F7941E', '#ED1C24'];

        const kategoriDatasets = syariahStatus.map((status, i) => {
            return {
                label: status,
                data: kategoriLabels.map(kategori => {
                    return products.filter(p => p.kategori === kategori && p.syariah === status).length;
                }),
                backgroundColor: syariahColors[i]
            };
        });

        this.stats.kategoriChartData = {
            labels: kategoriLabels,
            datasets: kategoriDatasets
        };

        // 3. Risiko Chart Data
        const risikoLabels = ['Sangat Rendah', 'Rendah', 'Menengah', 'Tinggi', 'Sangat Tinggi'];
        const risikoColors = ['#34D399', '#A7F3D0', '#FDE047', '#F87171', '#DC2626'];

        const risikoCounts = risikoLabels.map(label => {
            return products.filter(p => p.risiko === label).length;
        });

        this.stats.risikoChartData = {
            labels: risikoLabels,
            datasets: [{
                label: 'Jumlah Produk',
                data: risikoCounts,
                backgroundColor: risikoColors,
                hoverOffset: 4
            }]
        };
    }

    /**
     * **MODIFIED:** Creates the Chart.js charts using dynamic data.
     * (This method is unchanged from the previous step)
     */
    _createCharts() {
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded. Cannot create charts.');
            return;
        }

        const tooltipTitleCallback = {
             plugins: {
                 tooltip: {
                     callbacks: {
                         title: function(tooltipItems) {
                             const item = tooltipItems[0];
                             let label = item.chart.data.labels[item.dataIndex];
                             if (Array.isArray(label)) {
                                 return label.join(' ');
                             } else {
                                 return label;
                             }
                         }
                     }
                 }
             }
        };

        // Chart Kategori
        try {
            const ctxKategori = document.getElementById('chartKategori').getContext('2d');
            new Chart(ctxKategori, {
                type: 'bar',
                // --- MODIFIED ---
                data: this.stats.kategoriChartData,
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true, beginAtZero: true }
                    },
                    ...tooltipTitleCallback
                }
            });
        } catch(e) { console.error("Could not create Kategori chart:", e); }

        // Chart Risiko
        try {
            const ctxRisiko = document.getElementById('chartRisiko').getContext('2d');
            new Chart(ctxRisiko, {
                type: 'doughnut',
                // --- MODIFIED ---
                data: this.stats.risikoChartData,
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    ...tooltipTitleCallback
                }
            });
        } catch(e) { console.error("Could not create Risiko chart:", e); }
    }
}
