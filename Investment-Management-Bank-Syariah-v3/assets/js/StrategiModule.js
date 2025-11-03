/*
 * ====================================================================
 * StrategiModule.js: (REFACTORED)
 * ====================================================================
 * MODUL INI TELAH DI-REFACTOR MENGIKUTI POLA BerandaModule.js
 *
 * 1. SEPARATION OF CONCERNS:
 * - KONTEN (Data): Dipindahkan ke objek `_contentData` di constructor.
 * - PRESENTASI (Logic): Dikelola oleh `render()` dan helper `build...()`.
 *
 * 2. RENDER():
 * - Sekarang menjadi "mesin" yang bersih, memanggil helper
 * berdasarkan data di `_contentData`.
 *
 * 3. HELPER `build...()`:
 * - Fungsi baru ditambahkan untuk membangun setiap komponen visual
 * (mis. buildHero, buildPhilosophyCards, buildTradeoffCards, dll).
 *
 * 4. LOGIKA INTERAKTIF (TIDAK BERUBAH):
 * - Metode `_initSubNav()` dan `_initTradeOffsChart()`
 * tetap dipertahankan dan dipanggil setelah render.
 *
 * !! KETERGANTUNGAN Chart.js TETAP BERLAKU !!
 */
class StrategiModule {

    constructor(eventBus) {
        this.section = document.getElementById('strategi');
        this.eventBus = eventBus;
        this.hasInitialized = false;

        // --- 1. DATA (KONTEN) ---
        // "Single Source of Truth" baru untuk semua konten di modul ini.
        this._contentData = {
            navLinks: [
                { value: "#filosofi", text: "Filosofi Inti" },
                { value: "#tradeoffs", text: "Trade-Offs" },
                { value: "#analisis-syariah", text: "Analisis Syariah" },
                { value: "#penerapan", text: "Penerapan" }
            ],
            hero: {
                title: "Investasi Syariah: Aktif vs. Pasif",
                subtitle: "Sebuah analisis interaktif untuk membedah dua filosofi inti manajemen portofolio.",
                description: "Aplikasi ini membandingkan strategi investasi Aktif dan Pasif berdasarkan laporan Anda. Gunakan navigasi di atas untuk melompat ke bagian tematik, atau gulir ke bawah untuk menjelajahi perbandingan lengkap dari definisi, trade-off, hingga penerapan uniknya dalam konteks syariah di Indonesia."
            },
            sections: [
                // --- BAGIAN 1: FILOSOFI ---
                {
                    id: "filosofi",
                    title: "Filosofi Inti & Tujuan Utama",
                    subtitle: "Bagian ini membedah definisi dasar dan keyakinan fundamental yang mendorong setiap strategi. Apa tujuan utama mereka, dan apa asumsi mereka tentang pasar?",
                    content: [
                        {
                            type: 'philosophyCards',
                            cards: [
                                {
                                    id: 'aktif',
                                    icon: '🎯',
                                    title: 'Investasi Aktif',
                                    color: 'emerald',
                                    main_purpose: 'Untuk <strong class="text-emerald-700">"mengalahkan pasar" (beat the market)</strong>. Menghasilkan imbal hasil yang lebih tinggi daripada indeks acuan (benchmark) melalui keputusan proaktif.',
                                    philosophy: 'Didasarkan pada keyakinan bahwa <strong class="text-emerald-700">pasar tidak selalu efisien</strong>. Ada peluang untuk menemukan aset yang nilainya salah harga (mispriced assets) melalui analisis superior dan riset mendalam.',
                                    footnote: 'Keberhasilan bergantung sepenuhnya pada keahlian manajer investasi.'
                                },
                                {
                                    id: 'pasif',
                                    icon: '🛡️',
                                    title: 'Investasi Pasif',
                                    color: 'blue',
                                    main_purpose: 'Untuk <strong class="text-blue-700">"mereplikasi pasar" (match the market)</strong>. Menerima imbal hasil rata-rata pasar dengan meniru komposisi indeks acuan.',
                                    philosophy: 'Didasarkan pada <strong class="text-blue-700">Hipotesis Pasar Efisien (EMH)</strong>. Teori ini berpendapat bahwa harga aset telah mencerminkan semua informasi, sehingga upaya "mengalahkan pasar" adalah sia-sia dalam jangka panjang.',
                                    footnote: 'Keberhasilan bergantung pada disiplin "beli dan tahan" (buy and hold).'
                                }
                            ]
                        }
                    ]
                },
                // --- BAGIAN 2: TRADEOFFS ---
                {
                    id: "tradeoffs",
                    title: "Trade-Offs: Kelebihan & Kekurangan",
                    subtitle: "Setiap strategi memiliki konsekuensi yang jelas. Bagian ini membandingkan kelebihan dan kekurangan utama yang harus dipertimbangkan investor, mulai dari biaya hingga potensi risiko dan imbal hasil.",
                    content: [
                        {
                            type: 'tradeoffCards',
                            cards: [
                                {
                                    id: 'aktif',
                                    title: 'Aktif: Karakteristik',
                                    color: 'emerald',
                                    pro_list: [
                                        { icon: '📈', text: '<strong>Potensi Imbal Hasil Superior:</strong> Peluang untuk menciptakan \'alpha\' dan mengungguli pasar.' },
                                        { icon: '🔄', text: '<strong>Manajemen Risiko Proaktif:</strong> Fleksibilitas untuk menjual aset atau beralih ke kas saat pasar turun.' }
                                    ],
                                    con_list: [
                                        { icon: '⚠️', text: '<strong>Biaya yang Lebih Tinggi:</strong> Biaya manajemen, riset, dan transaksi yang signifikan menggerus imbal hasil.' },
                                        { icon: '📉', text: '<strong>Risiko Kinerja Buruk:</strong> Terdapat risiko signifikan bahwa manajer gagal mengalahkan pasar (underperform).' },
                                        { icon: '👤', text: '<strong>Risiko Manajer:</strong> Kinerja sangat bergantung pada keahlian satu individu atau tim.' }
                                    ]
                                },
                                {
                                    id: 'pasif',
                                    title: 'Pasif: Karakteristik',
                                    color: 'blue',
                                    pro_list: [
                                        { icon: '💰', text: '<strong>Efisiensi Biaya (Jauh Lebih Rendah):</strong> Keunggulan terbesar karena minim riset dan transaksi.' },
                                        { icon: '🌐', text: '<strong>Diversifikasi Otomatis dan Luas:</strong> Membeli "sekeranjang" saham sekaligus mengurangi risiko.' },
                                        { icon: '🧘', text: '<strong>Menghilangkan Emosi:</strong> Disiplin "beli dan tahan" menghindari keputusan panik atau serakah.' }
                                    ],
                                    con_list: [
                                        { icon: '⚖️', text: '<strong>Potensi Imbal Hasil Terbatas:</strong> Berdasarkan desain, tidak akan pernah bisa mengungguli pasar.' },
                                        { icon: '🔒', text: '<strong>Kurang Fleksibel:</strong> Tidak bisa beralih ke kas atau menjual aset saat pasar turun tajam.' }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'chartPlaceholder' // Placeholder untuk Chart.js
                        }
                    ]
                },
                // --- BAGIAN 3: ANALISIS SYARIAH ---
                {
                    id: "analisis-syariah",
                    title: "Analisis Kritis dalam Konteks Syariah",
                    subtitle: "Ini adalah inti dari analisis. Bagaimana kerangka kepatuhan syariah mengubah dikotomi standar \"aktif vs pasif\"? Jawabannya penuh nuansa dan mengungkapkan wawasan penting.",
                    content: [
                        {
                            type: 'analysisCards',
                            cards: [
                                {
                                    id: 'aktif',
                                    icon: '🔑',
                                    title: 'Wawasan Aktif: Sifat Inheren',
                                    color: 'emerald',
                                    intro: 'Investasi syariah <strong class="text-emerald-700">secara fundamental memiliki sifat yang inheren aktif</strong> karena dua alasan:',
                                    points: [
                                        {
                                            title: 'Penyaringan Syariah adalah Filter Aktif',
                                            text: 'Proses penyaringan (screening) untuk membuang industri haram (alkohol, riba, dll.) adalah sebuah <strong class="text-gray-900">tindakan seleksi aktif</strong>. Strategi pasif murni (membeli seluruh pasar) secara fundamental tidak mungkin dilakukan.'
                                        },
                                        {
                                            title: 'Sifat Kontrak Mendorong Keterlibatan Aktif',
                                            text: 'Kontrak inti seperti <em>Musharakah</em> & <em>Mudarabah</em> adalah kemitraan bagi hasil, bukan pinjaman pasif. Ini <strong class="text-gray-900">memaksa bank menjadi mitra investasi aktif</strong> yang melakukan uji tuntas (due diligence) pada bisnis.'
                                        }
                                    ],
                                    conclusion: '<strong class="font-semibold">Kesimpulan:</strong> Dalam konteks syariah, tidak ada investasi yang benar-benar "pasif". Yang ada hanyalah berbagai tingkat manajemen aktif.'
                                },
                                {
                                    id: 'pasif',
                                    icon: '💡',
                                    title: 'Wawasan Pasif: Keunggulan Struktural',
                                    color: 'blue',
                                    intro: 'Meskipun secara filosofis aktif, strategi pasif (pelacakan indeks) menawarkan <strong class="text-blue-700">keunggulan struktural yang signifikan</strong> untuk manajemen risiko kepatuhan.',
                                    points: [
                                        {
                                            title: '1. Efisiensi Proses Penyaringan',
                                            text: 'Proses screening yang rumit dan padat karya <strong class="text-gray-900">telah dilakukan oleh penyedia indeks</strong> (OJK, BEI, DSN-MUI). Manajer investasi (MI) dari dana pasif hanya perlu mereplikasi indeks tersebut.'
                                        },
                                        {
                                            title: '2. Penyederhanaan Kepatuhan',
                                            text: 'Ini secara drastis <strong class="text-gray-900">mengurangi <em>compliance burden</em> (beban kepatuhan)</strong> MI, tidak seperti MI aktif yang harus memantau setiap transaksi secara individual.'
                                        },
                                        {
                                            title: '3. Menghindari Spekulasi (Maysir)',
                                            text: 'Sifat "beli dan tahan" secara inheren <strong class="text-gray-900">menjauhkan investor dari aktivitas spekulatif</strong> frekuensi tinggi yang dilarang.'
                                        }
                                    ],
                                    conclusion: '<strong class="font-semibold">Kesimpulan:</strong> Strategi pasif mengurangi titik potensi kegagalan kepatuhan dan memiliki efisiensi yang lebih tinggi.'
                                }
                            ]
                        }
                    ]
                },
                // --- BAGIAN 4: PENERAPAN ---
                {
                    id: "penerapan",
                    title: "Penerapan & Tantangan di Indonesia",
                    subtitle: "Bagaimana kedua strategi ini diwujudkan dalam produk nyata di pasar modal syariah Indonesia, dan apa tantangan serta peluang unik yang mereka hadapi?",
                    content: [
                        {
                            type: 'implementationCards',
                            cards: [
                                {
                                    id: 'aktif',
                                    title: 'Aktif: Reksadana & Tantangannya',
                                    color: 'emerald',
                                    implementation_text: 'Diwujudkan melalui <strong class="text-emerald-700">Reksadana Saham Syariah</strong>. Manajer Investasi (MI) secara aktif memilih saham dari Daftar Efek Syariah (DES) untuk mengungguli benchmark (spt. JII70, ISSI).',
                                    challenges_title: 'Tantangan Kepatuhan & Kinerja:',
                                    challenges_list: [
                                        '<strong>Beban Kepatuhan:</strong> Frekuensi transaksi tinggi menuntut pemantauan syariah yang ketat dan berkelanjutan untuk setiap transaksi.',
                                        '<strong>Alam Semesta Investasi Terbatas:</strong> Proses screening mengurangi jumlah saham yang tersedia, sehingga lebih sulit mencari peluang "alpha".',
                                        '<strong>Risiko Konsentrasi Sektor:</strong> Pengecualian sektor besar (misal: keuangan konvensional) dapat mengurangi diversifikasi.',
                                        '<strong>Tantangan Kinerja:</strong> Studi menunjukkan Reksadana Saham Syariah aktif sering kesulitan untuk konsisten mengungguli benchmark-nya.'
                                    ],
                                    opportunity: {
                                        title: 'Peluang Unik: "Alpha Kepatuhan"',
                                        text: 'Keunggulan MI syariah tidak hanya mencari untung, tetapi juga keahlian mengidentifikasi perusahaan dengan "kualitas syariah" terbaik (misal: rasio utang jauh di bawah batas 45%) yang paling kecil kemungkinannya untuk dikeluarkan dari DES.'
                                    }
                                },
                                {
                                    id: 'pasif',
                                    title: 'Pasif: ETF & Efisiensinya',
                                    color: 'blue',
                                    implementation_text: 'Dieksekusi terutama melalui dua produk:',
                                    implementation_list: [
                                        {
                                            title: 'Reksa Dana Indeks Syariah:',
                                            text: 'Produk reksa dana tradisional yang dirancang untuk melacak kinerja indeks syariah tertentu.'
                                        },
                                        {
                                            title: 'Exchange-Traded Fund (ETF) Syariah:',
                                            text: 'Seperti reksa dana, tetapi diperdagangkan di bursa efek seperti saham, menawarkan fleksibilitas perdagangan intraday.'
                                        }
                                    ],
                                    conclusion: 'Meskipun pangsa pasarnya masih baru (nascent), OJK secara eksplisit mengakui keberadaan ETF syariah pasif, yang memiliki potensi besar untuk tumbuh karena keunggulan struktural dalam hal biaya dan efisiensi kepatuhan.'
                                }
                            ]
                        },
                        {
                            type: 'flowchart',
                            title: 'Diagram Alur Kerja Kepatuhan (Penyederhanaan)',
                            charts: [
                                {
                                    id: 'aktif',
                                    title: 'Alur Kerja AKTIF',
                                    color: 'emerald',
                                    steps: [
                                        { title: 'Manajer Investasi (MI)', text: 'Mencari peluang "alpha"', style: 'default' },
                                        { title: 'Screening Per Transaksi', text: 'Kepatuhan DES dipantau per beli/jual', style: 'highlight' },
                                        { title: 'Eksekusi Transaksi', text: 'Beban Kepatuhan Tinggi', style: 'default-danger' }
                                    ]
                                },
                                {
                                    id: 'pasif',
                                    title: 'Alur Kerja PASIF',
                                    color: 'blue',
                                    steps: [
                                        { title: 'OJK / BEI / DSN-MUI', text: 'Menetapkan standar', style: 'default' },
                                        { title: 'Screening Level Indeks', text: 'DES diterbitkan, Indeks Syariah dibuat', style: 'highlight' },
                                        { title: 'Manajer Investasi (MI)', text: 'Hanya Mereplikasi Indeks', style: 'default-success' }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            footer: {
                text: "Modul interaktif ini dibuat berdasarkan konten dari `analisis_investasi.md`."
            }
        }; // Akhir dari _contentData

        // Subscribe ke event tab
        this.eventBus.subscribe(AppConfig.EVENTS.TAB_CHANGED, (targetId) => this.handleTabChange(targetId));
    }

    /**
     * Menangani 'tabChanged' (Tidak berubah)
     */
    handleTabChange(targetId) {
        if (targetId !== 'strategi') {
            return;
        }
        if (this.hasInitialized) {
            return;
        }

        this.render(); // Panggil render statis
        this.hasInitialized = true;
        // Kirim event untuk memberitahu KurikulumModule agar merender kontennya.
        this.eventBus.publish('renderKurikulum', targetId);
    }

    /**
     * Render (BARU: Ditulis ulang untuk menggunakan _contentData)
     */
    /**
     * Render (BARU: Ditulis ulang untuk menggunakan _contentData)
     * (FIX: Menghapus wrapper 'contentDiv' agar bg-brand-light dapat tembus)
     */
    render() {

        // 1. Buat dan suntikkan <style>
        const styleElement = document.createElement('style');
        const cssRules = `
            body { font-family: 'Inter', sans-serif; }
            .chart-container { position: relative; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto; height: 300px; max-height: 400px; }
            @media (min-width: 768px) { .chart-container { height: 350px; } }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .fade-in { animation: fadeIn 0.6s ease-out forwards; }
        `;
        styleElement.textContent = cssRules;

        // 2. Bangun HTML dari _contentData menggunakan helper
        let html = '';

        // (FIX) Injeksi style
        html += styleElement.outerHTML;

        // Bangun Navigasi
        html += this.buildSubNav(this._contentData.navLinks);

        // Bangun Konten Utama
        html += `<main class="container mx-auto p-4 sm:p-8 max-w-7xl bg-neutral-100 rounded-lg shadow-md">`;

        // Bangun Hero
        html += this.buildHero(this._contentData.hero);

        // Bangun Semua Section
        this._contentData.sections.forEach((section, index) => {
            html += `<section id="${section.id}" class="mb-16 sm:mb-24 fade-in" style="animation-delay: ${index * 0.2 + 0.2}s;">
                        <h2 class="text-3xl font-bold text-center mb-4 text-gray-900">${section.title}</h2>
                        <p class="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                            ${section.subtitle}
                        </p>`;

            // Render konten di dalam section
            section.content.forEach(item => {
                switch (item.type) {
                    case 'philosophyCards':
                        html += this.buildPhilosophyCards(item.cards);
                        break;
                    case 'tradeoffCards':
                        html += this.buildTradeoffCards(item.cards);
                        break;
                    case 'chartPlaceholder':
                        html += this.buildChartPlaceholder();
                        break;
                    case 'analysisCards':
                        html += this.buildAnalysisCards(item.cards);
                        break;
                    case 'implementationCards':
                        html += this.buildImplementationCards(item.cards);
                        break;
                    case 'flowchart':
                        html += this.buildComplianceFlowchart(item.title, item.charts);
                        break;
                }
            });

            html += `</section>`;
        });

        // Tutup <main>
        html += `</main>`;

        // Tambahkan Slot Kurikulum
        html += `<div id="strategi-kurikulum-slot"></div>`;

        // 3. Atur innerHTML dari this.section
        this.section.innerHTML = html;

        // 4. Panggil inisialisasi untuk SEMUA elemen interaktif
        try {
            // Inisialisasi navigasi <select> mobile
            this._initSubNav();

            // Inisialisasi bagan
            this._initTradeOffsChart();
        } catch (e) {
            console.error("Gagal menginisialisasi komponen interaktif. Apakah Chart.js sudah dimuat?", e);
            const chartArea = document.getElementById('tradeOffsChart');
            if (chartArea) {
                chartArea.parentElement.innerHTML = '<p class="text-center text-red-500">Gagal memuat bagan. Pastikan Chart.js telah dimuat di halaman utama.</p>';
            }
        }
    }

    // --- 3. (BARU) FUNGSI HELPER UNTUK MEMBANGUN HTML ---

    /**
     * Membangun Sub-Navigasi Responsif (Mobile <select> & Desktop <a>)
     */
    buildSubNav(links) {
        let options = links.map(link => `<option value="${link.value}">${link.text}</option>`).join('');
        let anchors = links.map(link => `
            <a href="${link.value}" class="text-sm sm:text-base font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md">${link.text}</a>
        `).join('');

        return `
            <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
                <div class="container mx-auto max-w-7xl p-4">
                    <!-- Tampilan Mobile: <select> dropdown -->
                    <div class="md:hidden">
                        <label for="strategi-subnav-select" class="sr-only">Pilih Bagian</label>
                        <select id="strategi-subnav-select" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base">
                            ${options}
                        </select>
                    </div>
                    <!-- Tampilan Desktop: Link horizontal -->
                    <div class="hidden md:flex justify-center items-center space-x-4 sm:space-x-8">
                        ${anchors}
                    </div>
                </div>
            </nav>
        `;
    }

    /**
     * Membangun Header/Hero Utama
     */
    buildHero(hero) {
        return `
            <header class="text-center my-12 sm:my-16 fade-in">
                <h1 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 mb-4">
                    ${hero.title}
                </h1>
                <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                    ${hero.subtitle}
                </p>
                <p class="text-base text-gray-500 max-w-2xl mx-auto mt-6">
                    ${hero.description}
                </p>
            </header>
        `;
    }

    /**
     * Membangun kartu perbandingan Filosofi
     */
    buildPhilosophyCards(cards) {
        let cardsHtml = cards.map(card => `
            <article class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-${card.color}-300 h-full flex flex-col">
                <h3 class="text-2xl font-bold text-${card.color}-600 mb-5 pb-3 border-b border-${card.color}-100 flex items-center gap-3">
                    <span class="text-3xl">${card.icon}</span>
                    ${card.title}
                </h3>
                <div class="space-y-4 text-gray-700 leading-relaxed flex-grow">
                    <p><strong class="text-gray-900">Tujuan Utama:</strong> ${card.main_purpose}</p>
                    <p><strong class="text-gray-900">Filosofi:</strong> ${card.philosophy}</p>
                    <p class="text-sm text-gray-500 italic mt-4">${card.footnote}</p>
                </div>
            </article>
        `).join('');

        return `<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">${cardsHtml}</div>`;
    }

    /**
     * Membangun kartu perbandingan Trade-Offs (Kelebihan & Kekurangan)
     */
    buildTradeoffCards(cards) {
        let cardsHtml = cards.map(card => {
            let pros = card.pro_list.map(item => `
                <li class="flex items-start gap-3">
                    <span class="text-xl mt-0.5">${item.icon}</span>
                    <span class="text-gray-700 leading-relaxed">${item.text}</span>
                </li>
            `).join('');

            let cons = card.con_list.map(item => `
                <li class="flex items-start gap-3">
                    <span class="text-xl mt-0.5">${item.icon}</span>
                    <span class="text-gray-700 leading-relaxed">${item.text}</span>
                </li>
            `).join('');

            return `
                <article class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-${card.color}-300 h-full">
                    <h3 class="text-2xl font-bold text-${card.color}-600 mb-5 pb-3 border-b border-gray-100">${card.title}</h3>
                    <div class="space-y-6">
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-3 text-lg">Kelebihan</h4>
                            <ul class="space-y-3">${pros}</ul>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-3 text-lg">Kekurangan</h4>
                            <ul class="space-y-3">${cons}</ul>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        return `<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">${cardsHtml}</div>`;
    }

    /**
     * Membangun placeholder untuk Chart.js
     */
    buildChartPlaceholder() {
        return `
            <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
                <h3 class="text-2xl font-bold text-center text-gray-900 mb-6">Perbandingan Visual Trade-Offs</h3>
                <div class="chart-container">
                    <canvas id="tradeOffsChart"></canvas>
                </div>
            </div>
        `;
    }

    /**
     * Membangun kartu Analisis Syariah
     */
    buildAnalysisCards(cards) {
        let cardsHtml = cards.map(card => {
            let pointsHtml = (card.id === 'aktif')
                ? card.points.map(point => `
                    <li>
                        <strong class="text-gray-900">${point.title}</strong>
                        <p class="text-gray-600">${point.text}</p>
                    </li>
                `).join('')
                : card.points.map(point => `
                    <div>
                        <strong class="text-gray-900">${point.title}</strong>
                        <p class="text-gray-600">${point.text}</p>
                    </div>
                `).join('');

            let listType = (card.id === 'aktif') ? 'ol class="list-decimal list-outside space-y-3 pl-6 mt-4"' : 'div class="space-y-3 mt-4"';

            return `
                <article class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-${card.color}-500 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                    <h3 class="text-2xl font-bold text-${card.color}-700 mb-5 pb-3 border-b border-gray-100 flex items-center gap-3">
                        <span class="text-3xl">${card.icon}</span>
                        ${card.title}
                    </h3>
                    <div class="space-y-4 text-gray-700 leading-relaxed flex-grow">
                        <p class="text-lg">${card.intro}</p>
                        <${listType}>
                            ${pointsHtml}
                        </${listType}>
                        <p class="text-sm text-${card.color}-800 bg-${card.color}-50 p-3 rounded-md border border-${card.color}-200 mt-4">
                            ${card.conclusion}
                        </p>
                    </div>
                </article>
            `;
        }).join('');

        return `<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">${cardsHtml}</div>`;
    }

    /**
     * Membangun kartu Penerapan
     */
    buildImplementationCards(cards) {
        let cardsHtml = cards.map(card => {
            if (card.id === 'aktif') {
                let challengesHtml = card.challenges_list.map(item => `<li>${item}</li>`).join('');
                return `
                    <article class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-${card.color}-300 h-full">
                        <h3 class="text-2xl font-bold text-${card.color}-600 mb-5 pb-3 border-b border-gray-100">${card.title}</h3>
                        <p class="text-gray-700 leading-relaxed mb-4">${card.implementation_text}</p>
                        <h4 class="font-semibold text-gray-900 mt-6 mb-3 text-lg">${card.challenges_title}</h4>
                        <ul class="list-disc list-outside space-y-2 text-gray-700 leading-relaxed pl-5">
                            ${challengesHtml}
                        </ul>
                        <div class="mt-6 bg-gray-100 p-4 rounded-lg border-gray-200">
                            <h5 class="font-bold text-gray-900">${card.opportunity.title}</h5>
                            <p class="text-gray-700 text-sm leading-relaxed mt-1">${card.opportunity.text}</p>
                        </div>
                    </article>
                `;
            } else { // Pasif
                let implementationListHtml = card.implementation_list.map(item => `
                    <li>
                        <strong class="text-${card.color}-700">${item.title}</strong>
                        <p class="text-gray-600">${item.text}</p>
                    </li>
                `).join('');
                return `
                    <article class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-${card.color}-300 h-full">
                        <h3 class="text-2xl font-bold text-${card.color}-600 mb-5 pb-3 border-b border-gray-100">${card.title}</h3>
                        <p class="text-gray-700 leading-relaxed mb-4">${card.implementation_text}</p>
                        <ol class="list-decimal list-outside space-y-3 text-gray-700 leading-relaxed pl-6">
                            ${implementationListHtml}
                        </ol>
                        <p class="text-gray-700 leading-relaxed mt-6">${card.conclusion}</p>
                    </article>
                `;
            }
        }).join('');

        return `<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">${cardsHtml}</div>`;
    }

    /**
     * Membangun Diagram Alur Kerja Kepatuhan
     */
    buildComplianceFlowchart(title, charts) {
        let chartsHtml = charts.map(chart => {
            let stepsHtml = chart.steps.map(step => {
                let style = 'bg-white border border-gray-200 rounded-md shadow-sm'; // default
                let textStyle = 'text-xs text-gray-500';
                if (step.style === 'highlight') {
                    style = `bg-white border border-${chart.color}-300 rounded-md shadow-sm ring-2 ring-${chart.color}-100`;
                }
                if (step.style === 'default-danger') {
                    textStyle = 'text-xs text-red-500 font-medium';
                }
                if (step.style === 'default-success') {
                    textStyle = 'text-xs text-green-600 font-medium';
                }

                return `
                    <div class="p-3 ${style}">
                        <span class="font-semibold ${step.style === 'highlight' ? `text-${chart.color}-700` : 'text-gray-800'}">${step.title}</span>
                        <p class="${textStyle}">${step.text}</p>
                    </div>
                `;
            }).join(`<span class="text-2xl font-light text-${chart.color}-500">&darr;</span>`);

            return `
                <div class="border border-${chart.color}-200 rounded-lg p-4 bg-${chart.color}-50/50">
                    <h4 class="text-lg font-bold text-${chart.color}-700 text-center mb-4">${chart.title}</h4>
                    <div class="space-y-3 text-center">
                        ${stepsHtml}
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
                <h3 class="text-2xl font-bold text-center text-gray-900 mb-8">${title}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    ${chartsHtml}
                </div>
            </div>
        `;
    }



    // --- 4. (TIDAK BERUBAH) METODE INTERAKTIF ---

    /**
     * (TIDAK BERUBAH) Metode privat untuk menginisialisasi sub-navigasi mobile
     */
    _initSubNav() {
        const selectEl = document.getElementById('strategi-subnav-select');
        if (selectEl) {
            selectEl.addEventListener('change', (e) => {
                // Gunakan hash untuk menavigasi, sama seperti link <a>
                // Ini akan memicu scroll-smooth dari tag <html>
                window.location.hash = e.target.value;
            });
        }
    }

    /**
     * (TIDAK BERUBAH) Metode privat untuk menginisialisasi Chart.js
     */
    _initTradeOffsChart() {
        if (typeof Chart === 'undefined') {
            throw new Error("Chart.js tidak ditemukan di global scope.");
        }

        const ctx = document.getElementById('tradeOffsChart').getContext('2d');

        const data = {
            labels: ['Biaya', 'Potensi Imbal Hasil', 'Risiko Manajer/Fleksibilitas'],
            datasets: [
                {
                    label: 'Investasi Aktif',
                    data: [8, 9, 8],
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 1 // <-- KESALAHAN DIPERBAIKI DI SINI (sebelumnya 'T borderWidth')
                },
                {
                    label: 'Investasi Pasif',
                    data: [2, 6, 2],
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1
                }
            ]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Level Relatif (0 = Rendah, 10 = Tinggi)'
                    },
                    ticks: { color: '#4B5563' },
                    grid: { color: '#E5E7EB' }
                },
                x: {
                    ticks: { color: '#4B5563' },
                    grid: { display: false }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Perbandingan Relatif Strategi Investasi',
                    font: { size: 16 },
                    color: '#1F2937'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) { label += ': '; }
                            let value = context.parsed.y;
                            if (context.label === 'Biaya') {
                                label += (value > 5 ? 'Tinggi' : 'Rendah');
                            } else if (context.label === 'Potensi Imbal Hasil') {
                                label += (value > 7 ? 'Superior' : 'Terbatas/Sesuai Pasar');
                            } else if (context.label === 'Risiko Manajer/Fleksibilitas') {
                                label += (value > 5 ? 'Tinggi (Risiko Manajer)' : 'Rendah (Kurang Fleksibel)');
                            } else {
                                label += value;
                            }
                            return label + ` (${value})`;
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: { color: '#374151' }
                }
            },
            color: '#374151'
        };

        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }
}


