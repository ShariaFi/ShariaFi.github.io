/*
 * ====================================================================
 * StrategiModule.js: (VERSI TERINTEGRASI DENGAN DESAIN BARU)
 * ====================================================================
 * REFACTOR:
 * - Logika render statis dipertahankan.
 * - Konten HTML placeholder yang lama DIHAPUS.
 * - Desain visual baru (HTML + Tailwind) DIINTEGRASIKAN
 * ke dalam metode render().
 * - Logika 'kurikulumSlot' dipertahankan untuk kompatibilitas arsitektur.
 */
class StrategiModule {

    constructor(eventBus, kurikulumModule) {
        this.section = document.getElementById('strategi');
        this.eventBus = eventBus;
        this.kurikulumModule = kurikulumModule; // Tetap ada, meski tidak digunakan di sini
        this.hasInitialized = false;

        // Subscribe ke event tab
        this.eventBus.subscribe(AppConfig.EVENTS.TAB_CHANGED, (targetId) => this.handleTabChange(targetId));
    }

    /**
     * Menangani 'tabChanged' (Tidak berubah)
     * Hanya me-render konten satu kali saat tab diaktifkan.
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
    }

    /**
     * Render (Diperbarui dengan Desain HTML Baru)
     * Mengisi section#strategi dengan konten visual yang kaya.
     */
    render() {
        // 1. Buat elemen kontainer untuk HTML baru
        const content = document.createElement('div');

        // 2. (PERBARUIAN) Masukkan HTML baru yang kaya visual ke sini.
        //    Kita hilangkan tag <head>, <body>, dan script/link
        //    karena diasumsikan sudah ada di HTML utama.
        content.innerHTML = `
    <!-- Kontainer Utama dari Desain Baru -->
    <div class="container mx-auto max-w-7xl p-4 sm:p-8">

        <!-- Header Utama -->
        <header class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-extrabold text-green-800 mb-4">
                Analisis Strategi Investasi Syariah
            </h1>
            <p class="text-xl md:text-2xl text-gray-600">
                Membedah Pendekatan Aktif vs. Pasif
            </p>
        </header>

        <!-- Grid Perbandingan Utama (2 kolom di desktop, 1 kolom di mobile) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

            <!-- ====================================================== -->
            <!-- KOLOM KIRI: INVESTASI AKTIF (BAGIAN B) -->
            <!-- ====================================================== -->
            <section class="flex flex-col gap-8">
                
                <!-- Judul Kolom Aktif -->
                <div class="sticky top-0 lg:top-8 bg-gray-50/90 backdrop-blur-sm z-10 py-4">
                    <h2 class="text-3xl font-bold text-gray-900 border-b-4 border-green-600 pb-3 flex items-center gap-3">
                        <!-- Ikon untuk Aktif (Target) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                        BAGIAN B: INVESTASI AKTIF
                    </h2>
                    <p class="text-sm text-gray-500 pt-2">Strategi proaktif untuk "mengalahkan pasar" (beat the market).</p>
                </div>

                <!-- Card 2.1: Definisi -->
                <article class="bg-white p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl">
                    <h3 class="text-xl font-bold text-green-700 mb-4">2.1 Definisi, Filosofi, dan Tujuan Utama</h3>
                    <div class="space-y-4 text-gray-700 leading-relaxed">
                        <p>Investasi aktif adalah pendekatan manajemen portofolio yang melibatkan upaya proaktif manajer investasi untuk memilih dan mengelola aset. Tujuan utamanya adalah untuk <strong>"mengalahkan pasar" (beat the market)</strong> atau menghasilkan imbal hasil yang lebih tinggi daripada indeks acuan.</p>
                        <p>Filosofi di baliknya adalah keyakinan bahwa pasar tidak selalu efisien, sehingga terdapat peluang menemukan aset yang nilainya salah harga (mispriced assets) melalui analisis superior dan market timing.</p>
                    </div>
                </article>

                <!-- Card 2.2: Karakteristik, Kelebihan, Kekurangan -->
                <article class="bg-white p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl">
                    <h3 class="text-xl font-bold text-green-700 mb-4">2.2 Karakteristik, Kelebihan, dan Kekurangan</h3>
                    
                    <h4 class="font-semibold text-gray-900 mt-4 mb-2">Karakteristik Utama:</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                        <li><strong>Analisis Intensif:</strong> Sangat bergantung pada riset fundamental dan teknikal.</li>
                        <li><strong>Fleksibilitas Tinggi:</strong> Manajer bebas memutuskan kapan harus membeli, menahan, atau menjual aset.</li>
                    </ul>

                    <h4 class="font-semibold text-gray-900 mt-6 mb-3">Kelebihan:</h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Potensi Imbal Hasil Superior:</strong> Peluang untuk meraih alpha atau imbal hasil di atas pasar.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Manajemen Risiko Proaktif:</strong> Manajer dapat secara aktif mengurangi eksposur atau mengambil posisi defensif.</span>
                        </li>
                    </ul>

                    <h4 class="font-semibold text-gray-900 mt-6 mb-3">Kekurangan:</h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Biaya yang Lebih Tinggi:</strong> Biaya manajemen, riset, dan transaksi yang lebih tinggi menggerus imbal hasil.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Risiko Kinerja Buruk:</strong> Ada risiko signifikan bahwa manajer gagal mengalahkan pasar.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Risiko Manajer (Manager Risk):</strong> Kinerja portofolio sangat bergantung pada keahlian satu tim.</span>
                        </li>
                    </ul>
                </article>

                <!-- Card 2.3: "SYARIAH TWIST" (PENTING) -->
                <article class="bg-green-50 border-l-4 border-green-600 p-6 rounded-2xl shadow-lg">
                    <h3 class="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                        <!-- Ikon Wawasan (Lampu) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line><path d="M8.2 11.1c.9-.5 1.4-1.5 1.4-2.6C9.6 6 8.2 4.6 6.5 4.6S3.4 6 3.4 8.5c0 1.1.5 2.1 1.4 2.6L12 21l7.2-7.3c.9-.5 1.4-1.5 1.4-2.6 0-2.5-1.4-3.9-3.1-3.9s-3.1 1.4-3.1 3.9c0 1.1.5 2.1 1.4 2.6L12 21z"></path></svg>
                        2.3 Perspektif Kritis: Sifat Aktif Inheren
                    </h3>
                    <div class="space-y-4 text-green-900/90 leading-relaxed">
                        <p>Penerapan dikotomi "aktif vs pasif" bisa menyesatkan dalam keuangan syariah. Investasi syariah <strong>secara fundamental memiliki sifat yang inheren aktif</strong> karena dua alasan:</p>
                        <ol class="list-decimal list-inside space-y-2">
                            <li><strong>Penyaringan Syariah adalah Filter Aktif:</strong> Investasi syariah secara tegas melarang industri haram. Proses penyaringan (screening) untuk membuang yang tidak patuh ini adalah sebuah tindakan aktif. Tidak ada investasi yang benar-benar "pasif" seperti membeli seluruh indeks pasar.</li>
                            <li><strong>Sifat Kontrak Mendorong Keterlibatan Aktif:</strong> Kontrak inti seperti <em>Musharakah</em> dan <em>Mudarabah</em> adalah perjanjian kemitraan. Bank (investor) dipaksa menjadi mitra investasi aktif yang melakukan uji tuntas, bukan sekadar pemberi pinjaman pasif.</li>
                        </ol>
                    </div>
                </article>

                <!-- Card 2.4: Penerapan di Indonesia -->
                <article class="bg-white p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl">
                    <h3 class="text-xl font-bold text-green-700 mb-4">2.4 Penerapan, Tantangan, dan Peluang</h3>
                    <p class="text-gray-700 leading-relaxed mb-4">Di Indonesia, strategi ini diwujudkan melalui Reksadana Saham Syariah, di mana Manajer Investasi (MI) aktif memilih saham dari Daftar Efek Syariah (DES) untuk mengungguli benchmark (misal: JII70).</p>

                    <h4 class="font-semibold text-gray-900 mt-6 mb-3">Tantangan Kepatuhan dan Kinerja:</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                        <li><strong>Beban Kepatuhan:</strong> Frekuensi transaksi tinggi menuntut pemantauan kepatuhan syariah yang ketat dan berkelanjutan.</li>
                        <li><strong>Alam Semesta Investasi Terbatas:</strong> Proses screening mengurangi jumlah peluang "penghasil alpha".</li>
                        <li><strong>Risiko Konsentrasi Sektor:</strong> Pengecualian sektor besar (misal: keuangan konvensional) dapat mengurangi diversifikasi.</li>
                        <li><strong>Tantangan Kinerja Historis:</strong> Data menunjukkan reksa dana syariah aktif sering berjuang mengalahkan benchmark-nya.</li>
                    </ul>

                    <h4 class="font-semibold text-gray-900 mt-6 mb-3">Peluang Unik dan "Alpha Kepatuhan":</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                        <li><strong>Karakteristik Defensif:</strong> Penyaringan syariah secara inheren menyukai perusahaan dengan utang rendah, yang berpotensi lebih stabil saat pasar bergejolak.</li>
                    </ul>

                    <!-- Mini-callout untuk Konsep Kunci -->
                    <div class="mt-6 bg-gray-100 p-4 rounded-lg border border-gray-200">
                        <h5 class="font-bold text-gray-800">Konsep Unik: "Alpha Kepatuhan"</h5>
                        <p class="text-gray-600 text-sm leading-relaxed mt-1">Keunggulan MI syariah tidak hanya mencari untung, tetapi juga mengidentifikasi perusahaan dengan "kualitas syariah" terbaik (misal: rasio utang jauh di bawah batas 45%). Ini adalah sumber keunggulan kompetitif yang unik.</p>
                    </div>
                </article>

            </section>
            
            <!-- ====================================================== -->
            <!-- KOLOM KANAN: INVESTASI PASIF (BAGIAN C) -->
            <!-- ====================================================== -->
            <section class="flex flex-col gap-8">
                
                <!-- Judul Kolom Pasif -->
                <div class="sticky top-0 lg:top-8 bg-gray-50/90 backdrop-blur-sm z-10 py-4">
                    <h2 class="text-3xl font-bold text-gray-900 border-b-4 border-green-600 pb-3 flex items-center gap-3">
                        <!-- Ikon untuk Pasif (Perisai/Indeks) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        BAGIAN C: INVESTASI PASIF
                    </h2>
                    <p class="text-sm text-gray-500 pt-2">Strategi "beli dan tahan" untuk "meniru pasar" (match the market).</p>
                </div>

                <!-- Card 3.1: Definisi -->
                <article class="bg-white p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl">
                    <h3 class="text-xl font-bold text-green-700 mb-4">3.1 Definisi, Filosofi, dan Tujuan Utama</h3>
                    <div class="space-y-4 text-gray-700 leading-relaxed">
                        <p>Investasi pasif (strategi "beli dan tahan") adalah pendekatan yang tidak bertujuan mengalahkan pasar, melainkan untuk <strong>mereplikasi atau mencerminkan kinerjanya (match the market)</strong>.</p>
                        <p>Filosofi dasarnya mengacu pada <strong>Hipotesis Pasar Efisien (Efficient Market Hypothesis)</strong>, yang berpendapat bahwa harga aset telah mencerminkan semua informasi, sehingga upaya "mengalahkan pasar" dalam jangka panjang adalah sia-sia.</p>
                    </div>
                </article>

                <!-- Card 3.2: Karakteristik, Kelebihan, Kekurangan -->
                <article class="bg-white p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl">
                    <h3 class="text-xl font-bold text-green-700 mb-4">3.2 Karakteristik, Kelebihan, dan Kekurangan</h3>
                    
                    <h4 class="font-semibold text-gray-900 mt-4 mb-2">Karakteristik Utama:</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                        <li><strong>Mengikuti Indeks (Index Tracking):</strong> Portofolio disusun untuk meniru indeks acuan (misal: JII70).</li>
                        <li><strong>Aktivitas Perdagangan Rendah:</strong> Transaksi jual-beli hanya dilakukan sesekali untuk rebalancing.</li>
                    </ul>

                    <h4 class="font-semibold text-gray-900 mt-6 mb-3">Kelebihan:</h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Efisiensi Biaya (Biaya Jauh Lebih Rendah):</strong> Keunggulan terbesar. Tidak perlu tim analis besar atau trading sering.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Diversifikasi Otomatis dan Luas:</strong> Efektif membeli "sekeranjang" saham yang mewakili segmen pasar.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Menghilangkan Emosi:</strong> Strategi disiplin "beli dan tahan" menghilangkan risiko keputusan panik.</span>
                        </li>
                    </ul>

                    <h4 class="font-semibold text-gray-900 mt-6 mb-3">Kekurangan:</h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Potensi Imbal Hasil Terbatas:</strong> Investor tidak akan pernah bisa mengungguli pasar (by design).</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Kurang Fleksibel:</strong> Tidak bisa beralih ke kas atau mengambil posisi defensif saat pasar turun.</span>
                        </li>
                    </ul>
                </article>

                <!-- Card 3.3: Penerapan di Indonesia -->
                <article class="bg-white p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl">
                    <h3 class="text-xl font-bold text-green-700 mb-4">3.3 Penerapan dalam Konteks Syariah Indonesia</h3>
                    <div class="space-y-4 text-gray-700 leading-relaxed">
                        <p>Strategi pasif dieksekusi terutama melalui dua produk:</p>
                        <ul class="list-decimal list-inside space-y-2">
                            <li><strong>Reksa Dana Indeks Syariah:</strong> Produk reksa dana tradisional yang melacak indeks syariah.</li>
                            <li><strong>Exchange-Traded Fund (ETF) Syariah:</strong> Jenis reksa dana yang unitnya diperdagangkan di bursa efek seperti saham, menawarkan fleksibilitas intraday.</li>
                        </ul>
                        <p>Meskipun pasarnya masih baru (nascent), OJK secara eksplisit mengakui keberadaan "ETF syariah aktif" dan "ETF syariah pasif".</p>
                    </div>
                </article>

                <!-- Card 3.4: "SYARIAH TWIST" (PENTING) -->
                <article class="bg-green-50 border-l-4 border-green-600 p-6 rounded-2xl shadow-lg">
                    <h3 class="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                        <!-- Ikon Wawasan (Lampu) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line><path d="M8.2 11.1c.9-.5 1.4-1.5 1.4-2.6C9.6 6 8.2 4.6 6.5 4.6S3.4 6 3.4 8.5c0 1.1.5 2.1 1.4 2.6L12 21l7.2-7.3c.9-.5 1.4-1.5 1.4-2.6 0-2.5-1.4-3.9-3.1-3.9s-3.1 1.4-3.1 3.9c0 1.1.5 2.1 1.4 2.6L12 21z"></path></svg>
                        3.4 Analisis Kepatuhan: Keunggulan Struktural
                    </h3>
                    <div class="space-y-4 text-green-900/90 leading-relaxed">
                        <p>Dari perspektif hukum Islam, baik strategi aktif maupun pasif pada dasarnya diperbolehkan (mubah). Kepatuhan ditentukan oleh kehalalan aset dan mekanisme transaksinya.</p>
                        <p>Namun, <strong>strategi pasif menawarkan keunggulan struktural yang signifikan</strong> dari sudut pandang manajemen risiko kepatuhan syariah.</p>
                        
                        <!-- Mini-callout untuk Konsep Kunci -->
                        <div class="mt-6 bg-green-100 p-4 rounded-lg border border-green-200">
                            <h5 class="font-bold text-green-900">Keunggulan Utama: Efisiensi Proses Penyaringan</h5>
                            <p class="text-green-800 text-sm leading-relaxed mt-1">Dalam strategi pasif, proses penyaringan (screening) efek syariah yang rumit telah <strong>dilakukan oleh penyedia indeks (OJK/BEI)</strong>. Manajer Investasi hanya perlu mereplikasi indeks tersebut.</p>
                        </div>

                        <p>Ini secara drastis <strong>menyederhanakan kepatuhan</strong> dan mengurangi <em>compliance burden</em> (beban kepatuhan) dibandingkan MI aktif yang harus memantau setiap saham secara individual. Sifat "beli dan tahan" juga menjauhkan investor dari aktivitas spekulatif (maysir).</p>
                    </div>
                </article>

            </section>

        </div> <!-- Akhir dari Grid Utama -->

    </div> <!-- Akhir dari Kontainer Utama -->
        `;

        // 3. (PERBAIKAN ARSITEKTUR) Lampirkan konten utama "Strategi"
        this.section.appendChild(content);

        // 4. (PERBAIKAN ARSITEKTUR) Sediakan slot khusus untuk modul kurikulum
        //    Ini PENTING untuk arsitektur Anda yang ada.
        const kurikulumSlot = document.createElement('div');
        kurikulumSlot.id = "strategi-kurikulum-slot";
        this.section.appendChild(kurikulumSlot);
    }
}
