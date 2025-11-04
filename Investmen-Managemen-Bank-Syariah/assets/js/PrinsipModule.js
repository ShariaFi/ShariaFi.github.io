/**
 * @fileoverview PrinsipModule.js: (REFACTORED V2)
 *
 * Versi ini mempertahankan arsitektur class asli (constructor, eventBus,
 * lifecycle) tetapi mengimplementasikan struktur HTML dan desain CSS
 * yang telah diperbarui untuk hierarki tab yang lebih bersih.
 *
 * PERUBAHAN UTAMA (DARI V1 ANDA):
 * 1. RENDER HTML:
 * - `render()` & `build...()` helpers diubah untuk menghasilkan
 * struktur HTML baru (Pill Mega-Tabs, Underline Sub-Nav, Vertical Tabs).
 * 2. CSS:
 * - Modul ini sekarang membutuhkan file CSS eksternal (mis. `prinsip-module.css`)
 * untuk menangani styling kelas-kelas baru (.mega-tab-btn, .sub-nav-btn, dll).
 * 3. HELPER BARU/MODIFIKASI:
 * - `_renderSubPageE()`: Helper baru untuk merender konten sub-halaman (Pilar, dll).
 * - `_initVerticalTabs()`: Menggantikan `_initTabbedContent` untuk menangani
 * layout tab vertikal yang baru pada 'Pilar' dan 'Praktik'.
 * - `_initListeners()`: Diperbarui untuk menargetkan ID dan kelas CSS baru.
 * 4. LOGIKA:
 * - Semua logika state internal (this.activeMegaTab, etc) dan koneksi
 * eventBus (this.eventBus.subscribe) 100% DIPERTAHANKAN.
 */
class PrinsipModule {

    constructor(eventBus) {
        this.section = document.getElementById('prinsip');
        this.eventBus = eventBus;
        this.hasInitialized = false;

        // Status untuk melacak UI internal
        this.activeMegaTab = 'larangan'; // 'larangan' atau 'regulasi'
        this.activeSubTabE = 'pilar'; // 'pilar', 'industri', 'praktik', 'filosofi'
        this.activeBankTypeF = 'bus'; // 'bus' atau 'bprs'

        // Status untuk Chart.js
        this.radarChart = null;
        this.bmpdChart = null;

        // "Single Source of Truth" (Sama seperti V1 Anda)
        this._contentData = {
            pageTitle: "Prinsip & Praktik Keuangan Syariah",
            megaTabs: [
                { id: 'larangan', title: 'Prinsip Larangan (Bagian E)', icon: '⚖️' },
                { id: 'regulasi', title: 'Praktik Regulasi (Bagian F)', icon: '🏛️' }
            ],
            larangan: {
                title: "Eksplorasi Larangan Investasi Syariah",
                nav: [
                    { id: 'pilar', title: 'Pilar Fundamental' },
                    { id: 'industri', title: 'Industri Terlarang' },
                    { id: 'praktik', title: 'Praktik Pasar Terlarang' },
                    { id: 'filosofi', title: 'Fungsi & Filosofi' }
                ],
                pilar: {
                    title: "Tiga Pilar Larangan Fundamental",
                    subtitle: "Pahami tiga pilar fundamental yang menjadi dasar seluruh larangan dalam keuangan syariah. Pilih pilar di sebelah kiri untuk melihat detail.",
                    tabs: [
                        { id: 'pilar-riba', title: 'Riba (Bunga)' },
                        { id: 'pilar-gharar', title: 'Gharar (Ketidakpastian)' },
                        { id: 'pilar-maysir', title: 'Maysir (Perjudian)' }
                    ],
                    content: {
                        "pilar-riba": {
                            title: "Riba (Bunga/Tambahan)",
                            content: `<p class="text-lg text-gray-700/90 mb-4"><strong>Definisi:</strong> Setiap tambahan, peningkatan, atau kelebihan yang telah ditentukan sebelumnya dan dijamin atas jumlah pokok pinjaman atau utang, terlepas dari kinerjanya. Ini adalah larangan mutlak terhadap bunga.</p><h4 class="text-lg font-semibold text-gray-800 mb-2">Mengapa Dilarang?</h4><p class="text-gray-700/90 mb-4">Dianggap sebagai praktik eksploitatif yang tidak adil (QS. Al-Baqarah: 275). Riba memungkinkan pemberi pinjaman menghasilkan kekayaan hanya dari waktu, tanpa mengambil risiko wirausaha atau berkontribusi pada aktivitas ekonomi riil yang produktif.</p><h4 class="text-lg font-semibold text-gray-800 mb-2">Implikasi Investasi:</h4><p class="text-gray-700/90">Secara langsung mengecualikan investasi pada obligasi konvensional, T-bills, rekening tabungan berbunga, dan saham bank konvensional atau perusahaan pembiayaan konvensional.</p>`
                        },
                        "pilar-gharar": {
                            title: "Gharar (Ketidakpastian/Ambiguitas Berlebihan)",
                            content: `<p class="text-lg text-gray-700/90 mb-4"><strong>Definisi:</strong> Ketidakjelasan, ketidakpastian, ambiguitas, atau penipuan yang berlebihan dalam suatu kontrak. Terjadi jika elemen kunci (objek, harga, pengiriman) tidak diketahui atau tidak pasti.</p><h4 class="text-lg font-semibold text-gray-800 mb-2">Mengapa Dilarang?</h4><p class="text-gray-700/90 mb-4">Bertujuan untuk menjamin transparansi, pengungkapan penuh (full disclosure), dan keadilan. Ini memitigasi potensi perselisihan atau eksploitasi. Penting: Risiko komersial yang wajar (risiko bisnis) diizinkan, yang dilarang adalah ketidakpastian yang berlebihan dan dapat dihindari.</p><h4 class="text-lg font-semibold text-gray-800 mb-2">Implikasi Investasi:</h4><p class="text-gray-700/90">Menjadi dasar pelarangan banyak derivatif keuangan konvensional yang kompleks (seperti futures dan options) dan praktik short selling, di mana subjek dan hasilnya sangat tidak jelas dan spekulatif.</p>`
                        },
                        "pilar-maysir": {
                            title: "Maysir & Qimar (Perjudian/Spekulasi)",
                            content: `<p class="text-lg text-gray-700/90 mb-4"><strong>Definisi:</strong> Setiap transaksi di mana perolehan kekayaan terjadi murni secara kebetulan, keberuntungan, atau spekulasi, bukan melalui usaha produktif atau pengambilan risiko komersial yang sah.</p><h4 class="text-lg font-semibold text-gray-800 mb-2">Mengapa Dilarang?</h4><p class="text-gray-700/90 mb-4">Ini adalah 'zero-sum game' di mana keuntungan satu pihak berasal langsung dari kerugian pihak lain, tanpa ada penciptaan nilai ekonomi riil. Ini tidak mendorong kerja produktif (QS. Al-Maidah: 90).</p><h4 class="text-lg font-semibold text-gray-800 mb-2">Implikasi Investasi:</h4><p class="text-gray-700/90">Melarang skema investasi yang berfungsi seperti lotre atau skema Ponzi. Praktik manipulasi pasar seperti 'pump and dump' juga dianggap Maysir karena menciptakan keuntungan buatan atas kerugian investor lain.</p>`
                        }
                    }
                },
                industri: {
                    title: "Larangan Objek Investasi (Industri Haram)",
                    subtitle: "Investasi syariah secara tegas menghindari pendanaan pada perusahaan yang pendapatan utamanya berasal dari industri yang bertentangan dengan prinsip syariah.",
                    items: [
                        { icon: '🏦', title: 'Jasa Keuangan Konvensional', text: 'Perbankan berbasis riba, asuransi konvensional, dan perusahaan pembiayaan konvensional.' },
                        { icon: '🍷', title: 'Alkohol dan Produk Haram', text: 'Produksi, distribusi, atau perdagangan minuman keras dan produk terkait babi.' },
                        { icon: '🎲', title: 'Perjudian dan Kasino', text: 'Segala bentuk aktivitas yang mengandung unsur maysir atau untung-untungan.' },
                        { icon: '🔞', title: 'Hiburan Tidak Etis', text: 'Hiburan dewasa, pornografi, dan media yang dianggap tidak sesuai dengan nilai etika.' },
                        { icon: '🚬', title: 'Tembakau', text: 'Produksi dan perdagangan produk tembaku dan rokok.' },
                        { icon: '💣', title: 'Manufaktur Senjata', text: 'Manufaktur senjata dan pertahanan (tergantung yurisdiksi dan aplikasinya).' }
                    ]
                },
                praktik: {
                    title: "Praktik Transaksi Terlarang di Pasar Modal",
                    subtitle: "Lebih dari sekadar industri, metode transaksi di pasar modal juga diatur. Pilih praktik di sebelah kiri untuk melihat detail.",
                    tabs: [
                        { id: 'praktik-bai-madum', title: 'Short Selling' },
                        { id: 'praktik-margin', title: 'Margin Trading' },
                        { id: 'praktik-insider', title: 'Insider Trading' },
                        { id: 'praktik-manipulasi', title: 'Manipulasi Pasar' },
                        { id: 'praktik-risywah', title: 'Risywah (Suap)' }
                    ],
                    content: {
                        "praktik-bai-madum": {
                            title: "Ba'i al-Ma'dum (Short Selling)",
                            content: `<p class="text-lg text-gray-700/90 mb-4"><strong>Definisi:</strong> Dikenal sebagai <strong>short selling</strong>. Seorang investor menjual efek (saham) yang tidak ia miliki saat transaksi, dengan harapan membelinya kembali nanti dengan harga lebih rendah.</p><p class="text-gray-700/90"><strong>Dasar Larangan:</strong> Dilarang karena mengandung unsur <strong>Gharar</strong> yang ekstrem (menjual sesuatu yang berada di luar kepemilikan dan kendalinya).</p>`
                        },
                        "praktik-margin": {
                            title: "Transaksi Margin Berbasis Bunga",
                            content: `<p class="text-lg text-gray-700/90 mb-4"><strong>Definisi:</strong> Fasilitas di mana investor meminjam uang dari broker untuk membeli saham, dan broker tersebut mengenakan bunga (riba) atas pinjaman tersebut.</p><p class="text-gray-700/90"><strong>Dasar Larangan:</strong> Mengandung unsur <strong>Riba</strong> yang jelas.</p>`
                        },
                        "praktik-insider": {
                            title: "Insider Trading",
                            content: `<p class="text-lg text-gray-700/90 mb-4"><strong>Definisi:</strong> Memanfaatkan informasi material dan relevan yang belum diungkapkan kepada publik (informasi non-publik) untuk melakukan transaksi demi keuntungan pribadi.</p><p class="text-gray-700/90"><strong>Dasar Larangan:</strong> Diharamkan karena menciptakan asimetri informasi yang ekstrem dan merugikan investor lain. Ini melanggar prinsip keadilan ('Adalah).</p>`
                        },
                        "praktik-manipulasi": {
                            title: "Praktik Manipulasi Pasar (Tadlis, Najasy, Ihtikar)",
                            content: `<p class="text-lg text-gray-700/90 mb-4">Serangkaian tindakan yang dirancang untuk menipu pasar atau investor lain.</p><ul class="list-disc list-inside space-y-2 text-gray-700/90"><li><strong>Tadlis (Informasi Menyesatkan):</strong> Menyembunyikan informasi negatif atau cacat suatu objek transaksi.</li><li><strong>Taghrir (Tipuan):</strong> Tindakan aktif menipu pihak lain dengan janji palsu.</li><li><strong>Najasy (Permintaan/Penawaran Palsu):</strong> Merekayasa permintaan/penawaran untuk memanipulasi harga. Contoh: "Pump and Dump" atau "Wash Sale".</li><li><strong>Ihtikar (Penimbunan):</strong> Membeli dalam volume besar untuk menguasai pasokan dan menciptakan kelangkaan artifisial untuk menaikkan harga.</li></ul>`
                        },
                        "praktik-risywah": {
                            title: "Risywah (Suap)",
                            content: `<p class="text-lg text-gray-700/90 mb-4"><strong>Definisi:</strong> Memberikan atau menerima sesuatu (uang, fasilitas) secara tidak sah untuk memperoleh keuntungan atau keputusan yang tidak semestinya menjadi haknya.</p><p class="text-gray-700/90"><strong>Contoh:</strong> Memberi "hadiah" kepada analis agar mengeluarkan rekomendasi "beli" yang tidak jujur.</p>`
                        }
                    }
                },
                filosofi: {
                    title: "Fungsi Ganda Larangan: Filosofi & Manajemen Risiko",
                    subtitle: "Larangan-larangan ini bukan hanya aturan teologis, tetapi berfungsi sebagai kerangka manajemen risiko etis dan sistemik yang canggih untuk stabilitas jangka panjang.",
                    points: [
                        { title: 'Stabilitas Sistemik (vs. Riba)', text: 'Larangan Riba memaksa pergeseran dari transfer risiko berbasis utang menuju mekanisme bagi hasil berbasis ekuitas (Mudarabah, Musyarakah), yang membuat sistem lebih tahan terhadap krisis utang.' },
                        { title: 'Transparansi Pasar (vs. Gharar)', text: 'Larangan Gharar berfungsi sebagai alat melawan asimetri informasi, mewajibkan transparansi dan kejelasan dalam kontrak, yang mengurangi risiko sengketa dan kegagalan bayar.' },
                        { title: 'Fokus pada Ekonomi Riil (vs. Maysir)', text: 'Larangan Maysir mengekang spekulasi berlebihan, mencegah gelembung spekulatif, dan mendorong investasi pada ekonomi riil yang nyata dan berbasis aset.' }
                    ],
                    conclusion: '<b>Konvergensi:</b> Praktik seperti insider trading dan manipulasi pasar tidak hanya haram, tetapi juga ilegal menurut hukum sekuler (OJK), menunjukkan keselarasan etika Islam dengan prinsip pasar yang sehat.'
                }
            },
            regulasi: {
                title: "Regulasi & Batas Prudential (BMPD)",
                konsep: {
                    title: "Apa itu BMPD? (Konsep & Tujuan)",
                    text1: "Istilah \"Kredit\" (BMPK) berkonotasi pada pinjaman berbasis bunga (riba). Sebaliknya, \"Penyaluran Dana\" (BMPD) mencerminkan sifat unik keuangan syariah yang melibatkan pembiayaan berbasis kemitraan, jual-beli, dan sewa, bukan pinjaman konvensional.",
                    text2: "BMPD adalah instrumen manajemen risiko untuk mencegah terjadinya <strong>konsentrasi risiko pembiayaan</strong> yang berlebihan pada satu nasabah atau kelompok. Ini adalah pilar utama untuk mencegah kegagalan bank dan menjaga stabilitas sistemik.",
                    callout: "OJK secara sengaja menerapkan aturan berbeda untuk <strong>Bank Umum Syariah (BUS)</strong> yang berdampak sistemik besar, dan <strong>Bank Pembiayaan Rakyat Syariah (BPRS)</strong> yang lebih kecil dan berfokus pada komunitas."
                },
                dashboard: {
                    title: "Dasbor Perbandingan Batasan BMPD",
                    buttons: [
                        { id: 'bus', title: 'Bank Umum Syariah (BUS)' },
                        { id: 'bprs', title: 'Bank Pembiayaan Rakyat Syariah (BPRS)' }
                    ],
                    bus: {
                        chartTitle: "Batas BMPD - Bank Umum Syariah (BUS)",
                        subtitle: "Berdasarkan POJK No. 26/POJK.03/2021",
                        stats: [
                            { title: 'Pihak Terkait (Agregat)', value: '10%', note: 'dari Modal Bank (Total)' },
                            { title: 'Pihak Tidak Terkait (Single)', value: '25%', note: 'dari Modal Inti (Tier 1)' },
                            { title: 'Pihak Tidak Terkait (Grup)', value: '25%', note: 'dari Modal Inti (Tier 1)' }
                        ],
                        chartData: {
                            labels: ['Pihak Terkait (Agregat)', 'Pihak Tidak Terkait (Single/Grup)'],
                            values: [10, 25],
                            subLabels: ['dari Modal Total (T1+T2)', 'dari Modal Inti (T1)']
                        }
                    },
                    bprs: {
                        chartTitle: "Batas BMPD - Bank Pembiayaan Rakyat Syariah (BPRS)",
                        subtitle: "Berdasarkan POJK No. 23 Tahun 2022",
                        stats: [
                            { title: 'Pihak Terkait (Agregat)', value: '10%', note: 'dari Modal BPRS' },
                            { title: 'Pihak Tidak Terkait (Single)', value: '20%', note: 'dari Modal BPRS' },
                            { title: 'Pihak Tidak Terkait (Grup)', value: '30%', note: 'dari Modal BPRS' }
                        ],
                        chartData: {
                            labels: ['Pihak Terkait (Agregat)', 'Pihak Tidak Terkait (Single)', 'Pihak Tidak Terkait (Grup)'],
                            values: [10, 20, 30],
                            subLabels: ['dari Modal BPRS', 'dari Modal BPRS', 'dari Modal BPRS']
                        }
                    }
                },
                analisis: {
                    title: "Analisis Mendalam & Ketentuan Tambahan",
                    items: [
                        {
                            icon: '⚖️', title: 'Analisis Kunci: Perbedaan Basis Modal (BUS)',
                            content: `<div class="space-y-4">
                                <div>
                                    <strong class="text-sky-700">Pihak Tidak Terkait: 25% dari Modal Inti (Tier 1)</strong>
                                    <p class="text-gray-600 text-sm">OJK secara konservatif mengukur risiko dari debitur eksternal terhadap modal kualitas tertinggi (Tier 1) yang paling mampu menyerap kerugian.</p>
                                </div>
                                <div>
                                    <strong class="text-sky-700">Pihak Terkait: 10% dari Modal Total (Tier 1 + Tier 2)</strong>
                                    <p class="text-gray-600 text-sm">Batas yang sangat ketat ini bukan hanya mengelola risiko kredit, tetapi juga risiko tata kelola, benturan kepentingan (conflict of interest), dan moral hazard internal.</p>
                                </div>
                            </div>`
                        },
                        {
                            icon: '🌍', title: 'Ruang Lingkup Penyaluran Dana yang Luas',
                            content: `<p class="text-gray-600 mb-2">POJK 26/2021 (BUS) mendefinisikan "Penyaluran Dana" secara sangat luas untuk mencegah arbitrase regulasi. Ini mencakup:</p>
                            <ul class="list-disc list-inside text-gray-600 text-sm space-y-1">
                                <li>Pembiayaan standar, penempatan antar bank, dan Sukuk.</li>
                                <li>Penyertaan modal dan derivatif syariah.</li>
                                <li>Eksposur <i>off-balance sheet</i> (seperti jaminan/kafalah dan L/C).</li>
                            </ul>`
                        }
                    ],
                    tambahan: {
                        title: "Ketentuan Tambahan & Pengecualian (BUS)",
                        items: [
                            {
                                title: 'Penyaluran Dana Besar (Large Exposures)',
                                text: 'Didefinisikan sebagai eksposur ke pihak tidak terkait ≥ 10% dari Modal Inti (Tier 1). Ini <strong>bukan pelanggaran</strong>, melainkan penanda untuk pemantauan risiko yang lebih intensif.',
                                style: 'default'
                            },
                            {
                                title: '🏗️ Pengecualian BUMN (Tujuan Pembangunan)',
                                text: 'Penyaluran dana ke BUMN untuk proyek strategis (infrastruktur, ketahanan pangan, dll.) mendapat kelonggaran batas lebih tinggi, yaitu <strong>30% dari Modal Bank (Modal Total)</strong>.',
                                style: 'highlight'
                            }
                        ]
                    }
                }
            }
        }; // --- Akhir dari _contentData ---

        // Asumsi AppConfig.EVENTS.TAB_CHANGED ada di scope global atau diimpor
        this.eventBus.subscribe('tabChanged', (targetId) => this.handleTabChange(targetId));
    }

    /**
     * Menangani event 'tabChanged' (Lifecycle Hook Utama).
     * Hanya merender konten satu kali.
     */
    handleTabChange(targetId) {
        if (targetId !== 'prinsip' || this.hasInitialized) {
            return;
        }
        this.render();
        this._initListeners();
        this.hasInitialized = true;

        // Render halaman default (Pilar)
        this._renderSubPageE(this.activeSubTabE);

        // Kirim event (jika masih diperlukan)
        // this.eventBus.publish('renderKurikulum', targetId);
    }

    /**
     * Merender shell UI utama modul ini.
     * Fungsi ini dipanggil HANYA SEKALI.
     */
    render() {
        // 1. Bangun Navigasi Utama (Mega-Tabs)
        const mainNavHtml = this.buildMainNavigation(this.activeMegaTab);

        // 2. Bangun Header & Sub-Navigasi untuk Bagian E (Larangan)
        const laranganNavHtml = this.buildLaranganSubNav(this._contentData.larangan, this.activeSubTabE);

        // 3. Bangun Konten untuk Bagian F (Regulasi)
        // (Ini akan di-render penuh saat tab di-klik)
        const regulasiPageHtml = this.buildRegulasiPageShell();

        // 4. Gabungkan semuanya
        const fullHtml = `
            <!-- HEADER & NAVIGASI MEGA-TAB -->
            <header class="bg-white shadow-sm rounded-lg p-4 md:p-6 mb-8">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <h1 class="text-2xl font-bold text-gray-800">
                        ${this._contentData.pageTitle}
                    </h1>
                    <nav id="prinsip-main-nav" class="flex space-x-2 mt-4 md:mt-0 p-1 bg-gray-100 rounded-lg">
                        ${mainNavHtml}
                    </nav>
                </div>
            </header>

            <!-- KONTEN UTAMA (BERUBAH BERDASARKAN MEGA-TAB) -->
            <main>
                <!-- ====== BAGIAN E: HALAMAN PRINSIP LARANGAN ====== -->
                <section id="prinsip-page-larangan" class="page-section">
                    
                    <!-- HEADER & NAVIGASI SUB-HALAMAN (Pilar, Industri, dll) -->
                    <header id="prinsip-sub-nav-e-header" class="bg-white shadow-sm rounded-lg mb-8">
                        ${laranganNavHtml}
                    </header>

                    <!-- Area Konten Dinamis untuk Sub-Halaman -->
                    <div id="prinsip-sub-content-e" class="content-fade-in">
                        <!-- Konten (Pilar, Industri, dll.) akan di-render oleh _renderSubPageE() -->
                    </div>

                </section>
                
                <!-- ====== BAGIAN F: HALAMAN PRAKTIK REGULASI ====== -->
                <section id="prinsip-page-regulasi" class="page-section" style="display: none;">
                    ${regulasiPageHtml}
                </section>
            </main>

            <!-- Slot untuk KurikulumModule (jika masih dipakai) -->
            <!-- <div id="prinsip-kurikulum-slot" class="max-w-6xl mx-auto px-4 md:px-8"></div> -->
        `;

        this.section.innerHTML = fullHtml;
    }

    /**
     * Menyiapkan SEMUA listener untuk modul ini.
     * Dipanggil sekali setelah render().
     */
    _initListeners() {
        // --- 1. Listener Navigasi Utama (Mega-Tab) ---
        const mainNav = this.section.querySelector('#prinsip-main-nav');
        if (mainNav) {
            mainNav.addEventListener('click', (e) => {
                const button = e.target.closest('.mega-tab-btn');
                if (!button) return;

                const pageId = button.dataset.page;
                if (pageId === this.activeMegaTab) return; // Sudah aktif
                this.activeMegaTab = pageId;

                // Update tombol
                mainNav.querySelectorAll('.mega-tab-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.page === pageId);
                    btn.classList.toggle('inactive', btn.dataset.page !== pageId);
                });

                // Update halaman
                const pageLarangan = this.section.querySelector('#prinsip-page-larangan');
                const pageRegulasi = this.section.querySelector('#prinsip-page-regulasi');

                if (pageId === 'larangan') {
                    pageLarangan.style.display = 'block';
                    pageRegulasi.style.display = 'none';
                } else {
                    pageLarangan.style.display = 'none';
                    pageRegulasi.style.display = 'block';

                    // Lazy load Halaman Regulasi & Chart
                    if (!this.bmpdChart) {
                        this._renderRegulasiPageFull(); // Render konten penuh
                        this._initBmpdDashboard(this.activeBankTypeF); // Inisialisasi chart
                    }
                }
            });
        }

        // --- 2. Listener Sub-Navigasi Bagian E (Larangan) ---
        const subNavEContainer = this.section.querySelector('#prinsip-sub-nav-e-header');
        if (subNavEContainer) {
            subNavEContainer.addEventListener('click', (e) => {
                const button = e.target.closest('.sub-nav-btn');
                if (button) {
                    this._handleSubNavEChange(button.dataset.subpage);
                }
            });
        }
    }

    /**
     * Menangani perubahan sub-navigasi Bagian E (Larangan).
     * @param {string} pageId - ID halaman baru ('pilar', 'industri', dll.)
     */
    _handleSubNavEChange(pageId) {
        if (pageId === this.activeSubTabE) return;
        this.activeSubTabE = pageId;

        // 1. Update tombol
        this.section.querySelectorAll('#prinsip-sub-nav-e-header .sub-nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.subpage === pageId);
            btn.classList.toggle('inactive', btn.dataset.subpage !== pageId);
        });

        // 2. Render ulang konten sub-halaman
        this._renderSubPageE(pageId);
    }

    /**
     * Merender konten sub-halaman E (Pilar, Industri, dll) ke dalam DOM.
     * @param {string} pageId - ID halaman baru ('pilar', 'industri', dll.)
     */
    _renderSubPageE(pageId) {
        const contentArea = this.section.querySelector('#prinsip-sub-content-e');
        if (!contentArea) return;

        let newHtml = '';

        // Hancurkan chart lama jika ada
        if (this.radarChart) {
            this.radarChart.destroy();
            this.radarChart = null;
        }

        switch (pageId) {
            case 'pilar':
                newHtml = this.buildLaranganSubPage_VerticalTab(this._contentData.larangan.pilar, 'pilar');
                break;
            case 'industri':
                newHtml = this.buildLaranganSubPage_Industri(this._contentData.larangan.industri);
                break;
            case 'praktik':
                newHtml = this.buildLaranganSubPage_VerticalTab(this._contentData.larangan.praktik, 'praktik');
                break;
            case 'filosofi':
                newHtml = this.buildLaranganSubPage_Filosofi(this._contentData.larangan.filosofi);
                break;
        }
        contentArea.innerHTML = newHtml;

        // Tambahkan efek fade-in
        contentArea.classList.add('content-fade-in');
        contentArea.addEventListener('animationend', () => {
            contentArea.classList.remove('content-fade-in');
        }, { once: true });

        // 4. Inisialisasi ulang komponen interaktif jika ada
        if (pageId === 'pilar') {
            this._initVerticalTabs('pilar', this._contentData.larangan.pilar.content);
        } else if (pageId === 'praktik') {
            this._initVerticalTabs('praktik', this._contentData.larangan.praktik.content);
        } else if (pageId === 'filosofi') {
            this._initRadarChart(); // Inisialisasi chart
        }
    }


    /**
     * Helper untuk inisialisasi konten tab vertikal (Pilar & Praktik).
     * @param {string} type - 'pilar' atau 'praktik'
     * @param {object} contentData - Objek data (mis. _contentData.larangan.pilar.content).
     */
    _initVerticalTabs(type, contentData) {
        const tabContainer = this.section.querySelector(`#vertical-tabs-${type}`);
        const contentEl = this.section.querySelector(`#vertical-content-${type}`);

        if (!tabContainer || !contentEl) return;

        // Fungsi untuk update konten
        const updateContent = (tabId) => {
            const data = contentData[tabId];
            if (data) {
                contentEl.innerHTML = `<h3 class="text-2xl font-bold text-gray-800 mb-4">${data.title}</h3>${data.content}`;

                // Efek fade-in untuk konten
                contentEl.classList.add('content-fade-in-fast');
                contentEl.addEventListener('animationend', () => {
                    contentEl.classList.remove('content-fade-in-fast');
                }, { once: true });
            } else {
                contentEl.innerHTML = '<p>Konten tidak ditemukan.</p>';
            }
        };

        // Pasang listener
        tabContainer.addEventListener('click', (e) => {
            const tab = e.target.closest('.vertical-tab-btn');
            if (tab && !tab.classList.contains('active')) {
                tabContainer.querySelectorAll('.vertical-tab-btn').forEach(t => {
                    t.classList.remove('active');
                    t.classList.add('inactive');
                });
                tab.classList.add('active');
                tab.classList.remove('inactive');
                updateContent(tab.dataset.tab);
            }
        });

        // Tampilkan konten default
        const defaultTabId = tabContainer.querySelector('.vertical-tab-btn.active').dataset.tab;
        updateContent(defaultTabId);
    }


    // --- 2. FUNGSI HELPER UNTUK MEMBANGUN HTML ---

    /**
     * Membangun Navigasi Utama (Mega-Tabs).
     * @param {string} activeTabId - ID tab yang aktif ('larangan' atau 'regulasi').
     * @returns {string} HTML untuk tombol navigasi.
     */
    buildMainNavigation(activeTabId) {
        return this._contentData.megaTabs.map(tab => `
            <button 
                class="mega-tab-btn ${tab.id === activeTabId ? 'active' : 'inactive'}" 
                data-page="${tab.id}">
                ${tab.icon} ${tab.title}
            </button>
        `).join('');
    }

    // --- HELPER UNTUK BAGIAN E (LARANGAN) ---

    /**
     * Membangun kerangka HTML untuk Sub-Navigasi "Larangan".
     * @param {object} data - Objek _contentData.larangan.
     * @param {string} activeSubTabId - ID sub-tab yang aktif.
     * @returns {string} HTML untuk header sub-navigasi.
     */
    buildLaranganSubNav(data, activeSubTabId) {
        const navButtons = data.nav.map(item => `
            <button 
                class="sub-nav-btn ${item.id === activeSubTabId ? 'active' : 'inactive'}" 
                data-subpage="${item.id}">
                ${item.title}
            </button>
        `).join('');

        return `
            <div class="px-4 md:px-6 py-4 border-b border-gray-200">
                <h2 id="sub-nav-title" class="text-xl font-bold text-gray-800">
                    ${data.title}
                </h2>
            </div>
            <!-- Navigasi Horizontal-Scrolling untuk Sub-Halaman -->
            <nav id="prinsip-sub-nav-e-buttons" class="flex overflow-x-auto px-2 md:px-4">
                ${navButtons}
            </nav>
        `;
    }

    /**
     * Membangun HTML untuk layout tab vertikal (Pilar & Praktik).
     * @param {object} data - Data untuk sub-halaman (e.g., _contentData.larangan.pilar).
     * @param {string} type - 'pilar' atau 'praktik'.
     * @returns {string} HTML untuk halaman tersebut.
     */
    buildLaranganSubPage_VerticalTab(data, type) {
        const tabsHtml = data.tabs.map((tab, index) => `
            <button 
                class="vertical-tab-btn ${index === 0 ? 'active' : 'inactive'}" 
                data-tab="${tab.id}">
                ${tab.title}
            </button>
        `).join('');

        return `
            <div class="text-center mb-8">
                <h3 class="text-3xl font-bold text-gray-800 mb-2">${data.title}</h3>
                <p class="text-lg text-gray-600 max-w-3xl mx-auto">${data.subtitle}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                <!-- Navigasi Vertikal -->
                <div id="vertical-tabs-${type}" class="md:col-span-1 flex flex-col space-y-1">
                    ${tabsHtml}
                </div>
                <!-- Konten Vertikal -->
                <div class="md:col-span-3 bg-white rounded-lg shadow-sm p-6 md:p-8 min-h-[300px]">
                    <div id="vertical-content-${type}">
                        <!-- Konten diisi oleh _initVerticalTabs -->
                    </div>
                </div>
            </div>
        `;
    }

    buildLaranganSubPage_Industri(data) {
        const cardsHtml = data.items.map(item => `
            <div class="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4 transition-all duration-300 hover:shadow-md">
                <span class="text-4xl">${item.icon}</span>
                <div>
                    <h4 class="text-xl font-semibold text-red-700">${item.title}</h4>
                    <p class="text-gray-600">${item.text}</p>
                </div>
            </div>
        `).join('');

        return `
            <div class="text-center mb-8">
                <h3 class="text-3xl font-bold text-gray-800 mb-2">${data.title}</h3>
                <p class="text-lg text-gray-600 max-w-3xl mx-auto">${data.subtitle}</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                ${cardsHtml}
            </div>
        `;
    }

    buildLaranganSubPage_Filosofi(data) {
        const pointsHtml = data.points.map(point => `
            <div>
                <h4 class="text-xl font-semibold text-gray-800">${point.title}</h4>
                <p class="text-gray-600">${point.text}</p>
            </div>
        `).join('');

        return `
            <div class="text-center mb-8">
                <h3 class="text-3xl font-bold text-gray-800 mb-2">${data.title}</h3>
                <p class="text-lg text-gray-600 max-w-3xl mx-auto">${data.subtitle}</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div class="relative w-full max-w-[450px] mx-auto h-[350px]">
                        <canvas id="fungsiRadarChart"></canvas>
                    </div>
                    <div class="space-y-6">
                        ${pointsHtml}
                        <div class="border-t border-gray-200 pt-4 text-sm text-gray-500">
                            ${data.conclusion}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --- HELPER UNTUK BAGIAN F (REGULASI) ---

    /**
     * Membangun kerangka HTML *kosong* untuk halaman "Regulasi".
     * Konten akan diisi oleh _renderRegulasiPageFull() saat di-klik.
     * @returns {string} HTML kerangka.
     */
    buildRegulasiPageShell() {
        return `
            <div id="regulasi-content-wrapper">
                <!-- Konten penuh akan di-render di sini secara lazy load -->
            </div>
        `;
    }

    /**
     * Mengisi kerangka halaman "Regulasi" dengan konten penuh.
     * Dipanggil saat tab Regulasi pertama kali di-klik.
     */
    _renderRegulasiPageFull() {
        const wrapper = this.section.querySelector('#regulasi-content-wrapper');
        if (!wrapper) return;

        const data = this._contentData.regulasi;

        // 1. Konsep
        const konsepHtml = `
            <section class="mb-8 bg-white p-6 rounded-lg shadow-sm">
                <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">${data.konsep.title}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                        <h3 class="text-lg font-semibold mb-2 text-gray-700">Perbedaan Mendasar: BMPD vs BMPK</h3>
                        <p class="text-gray-600 mb-4">${data.konsep.text1}</p>
                        <h3 class="text-lg font-semibold mb-2 text-gray-700">Tujuan Utama Regulasi</h3>
                        <p class="text-gray-600">${data.konsep.text2}</p>
                    </div>
                    <div class="bg-sky-50 border-l-4 border-sky-600 p-5 rounded-r-lg">
                        <h3 class="text-lg font-semibold text-sky-800">Pendekatan Regulasi Berjenjang</h3>
                        <p class="text-sky-800/90">${data.konsep.callout}</p>
                    </div>
                </div>
            </section>
        `;

        // 2. Dashboard
        const dashboardButtons = data.dashboard.buttons.map(btn => `
            <button 
                id="btn-f-${btn.id}" 
                class="selector-btn-f w-full sm:w-auto text-base font-semibold py-2 px-6 rounded-lg transition-all duration-150 shadow-sm
                ${btn.id === this.activeBankTypeF ? 'bg-sky-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}" 
                data-type="${btn.id}">
                ${btn.title}
            </button>
        `).join('');

        const dashboardHtml = `
            <section id="prinsip-dashboard-f" class="mb-8 bg-white p-6 rounded-lg shadow-sm">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">${data.dashboard.title}</h2>
                <div id="dashboard-f-buttons" class="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-8">
                    ${dashboardButtons}
                </div>
                <div>
                    <h3 id="chart-title-f" class="text-xl font-semibold text-center mb-1 text-gray-800"></h3>
                    <p id="regulation-subtitle-f" class="text-center text-gray-500 mb-6"></p>
                    <div id="stats-container-f" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <!-- Stats diisi oleh _initBmpdDashboard -->
                    </div>
                    <div class="chart-container-bar relative w-full max-w-[700px] mx-auto h-[350px]">
                        <canvas id="bmpdChart"></canvas>
                    </div>
                </div>
            </section>
        `;

        // 3. Analisis
        const analisisCards = data.analisis.items.map(item => `
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
                    <span class="text-2xl mr-3">${item.icon}</span> ${item.title}
                </h3>
                ${item.content}
            </div>
        `).join('');

        const tambahanCards = data.analisis.tambahan.items.map(item => `
            <div class="${item.style === 'highlight' ? 'bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg' : 'bg-gray-100 p-4 rounded-lg'}">
                <strong class="${item.style === 'highlight' ? 'text-green-800' : 'text-gray-700'}">${item.title}</strong>
                <p class="${item.style === 'highlight' ? 'text-green-700' : 'text-gray-600'} text-sm">${item.text}</p>
            </div>
        `).join('');

        const analisisHtml = `
            <section>
                <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">${data.analisis.title}</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    ${analisisCards}
                    <div class="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
                        <h3 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
                            <span class="text-2xl mr-3">📑</span> ${data.analisis.tambahan.title}
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${tambahanCards}
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Gabungkan semua dan pasang listener
        wrapper.innerHTML = konsepHtml + dashboardHtml + analisisHtml;
        this._initRegulasiListeners();
    }

    /**
     * Menyiapkan listener khusus untuk halaman Regulasi (Tombol BUS/BPRS).
     */
    _initRegulasiListeners() {
        const dashboardButtons = this.section.querySelector('#dashboard-f-buttons');
        if (dashboardButtons) {
            dashboardButtons.addEventListener('click', e => {
                const button = e.target.closest('.selector-btn-f');
                if (button && button.dataset.type !== this.activeBankTypeF) {
                    this.activeBankTypeF = button.dataset.type;

                    // Update tombol
                    dashboardButtons.querySelectorAll('.selector-btn-f').forEach(btn => {
                        btn.classList.toggle('bg-sky-700', btn.dataset.type === this.activeBankTypeF);
                        btn.classList.toggle('text-white', btn.dataset.type === this.activeBankTypeF);
                        btn.classList.toggle('bg-white', btn.dataset.type !== this.activeBankTypeF);
                        btn.classList.toggle('text-gray-700', btn.dataset.type !== this.activeBankTypeF);
                    });

                    // Render ulang dashboard
                    this._initBmpdDashboard(this.activeBankTypeF);
                }
            });
        }
    }


    // --- 3. FUNGSI INTERAKTIF (CHART.JS) ---

    _initRadarChart() {
        const ctx = this.section.querySelector('#fungsiRadarChart');
        if (!ctx) return; // Canvas tidak ada di DOM (halaman salah)

        if (this.radarChart) {
            this.radarChart.destroy();
        }

        this.radarChart = new Chart(ctx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Stabilitas Sistemik (vs. Riba)', 'Transparansi Pasar (vs. Gharar)', 'Fokus Ekonomi Riil (vs. Maysir)'],
                datasets: [{
                    label: 'Fungsi Kerangka Larangan',
                    data: [5, 5, 5],
                    backgroundColor: 'rgba(3, 105, 161, 0.2)', // sky-700
                    borderColor: 'rgb(3, 105, 161)',
                    pointBackgroundColor: 'rgb(3, 105, 161)',
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    r: {
                        angleLines: { color: '#d1d5db' },
                        grid: { color: '#e5e7eb' },
                        pointLabels: { font: { size: 13 }, color: '#374151' },
                        ticks: { backdropColor: '#f9fafb', color: '#6b7280', stepSize: 1, display: false },
                        min: 0,
                        max: 5
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    _initBmpdDashboard(bankType) {
        const data = this._contentData.regulasi.dashboard[bankType];
        if (!data) return;

        // 1. Update Kartu Statistik
        const statsContainer = this.section.querySelector('#stats-container-f');
        if (!statsContainer) return; // Pastikan elemen ada

        const statsHtml = data.stats.map(stat => `
            <div class="bg-white p-5 rounded-lg shadow-md border border-gray-100 text-center">
                <span class="text-sm font-medium text-gray-500 uppercase tracking-wider">${stat.title}</span>
                <span class="block text-4xl font-bold text-sky-600">${stat.value}</span>
                <span class="text-sm text-gray-500">${stat.note}</span>
            </div>
        `).join('');
        statsContainer.innerHTML = statsHtml;

        // 2. Update Judul Chart
        this.section.querySelector('#chart-title-f').textContent = data.chartTitle;
        this.section.querySelector('#regulation-subtitle-f').textContent = data.subtitle;

        // 3. Update Chart.js
        const ctx = this.section.querySelector('#bmpdChart');
        if (!ctx) return;

        const chartColors = {
            bus: { bg: 'rgba(2, 132, 199, 0.7)', border: 'rgb(2, 132, 199)' }, // sky-600
            bprs: { bg: 'rgba(5, 150, 105, 0.7)', border: 'rgb(5, 150, 105)' } // emerald-600
        };
        const colors = chartColors[bankType] || chartColors.bus;

        if (this.bmpdChart) {
            this.bmpdChart.destroy(); // Hancurkan chart lama jika ada
        }

        this.bmpdChart = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: data.chartData.labels,
                datasets: [{
                    label: 'Batas Maksimum (%)',
                    data: data.chartData.values,
                    backgroundColor: data.chartData.values.map(() => colors.bg),
                    borderColor: data.chartData.values.map(() => colors.border),
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                scales: { y: { beginAtZero: true, max: 35, title: { display: true, text: 'Batas Persentase (%) dari Modal' } } },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.dataset.label || ''}: ${context.parsed.y || 0}%`,
                            afterLabel: (context) => data.chartData.subLabels[context.dataIndex]
                        }
                    }
                }
            }
        });
    }
}
