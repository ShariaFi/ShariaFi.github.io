/*
 * ====================================================================
 * StrategiModule.js: (PERBAIKAN DOM & INTEGRASI DESAIN)
 * ====================================================================
 * REFACTOR (PERBAIKAN KRITIS):
 * - Memperbaiki bug DOM di mana hanya tag <style> yang ditambahkan.
 * - Logika render() sekarang dengan benar memindahkan *semua* node
 * (termasuk <style> dan <div> utama) ke 'this.section'.
 * - Menghapus 'container', 'mx-auto', dan 'max-w-7xl' dari HTML
 * agar modul dapat beradaptasi dengan layout 'section' induknya.
 */
class StrategiModule {

    constructor(eventBus, kurikulumModule) {
        this.section = document.getElementById('strategi');
        this.eventBus = eventBus;
        this.kurikulumModule = kurikulumModule;
        this.hasInitialized = false;

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
    }

    /**
     * Render (Diperbarui dengan Logika DOM yang Benar)
     */
    render() {
        // 1. Buat elemen pembungkus SEMENTARA
        const contentWrapper = document.createElement('div');

        // 2. Isi pembungkus dengan SEMUA HTML yang diperlukan
        contentWrapper.innerHTML = `
    <!-- 
      STYLE KUSTOM (diambil dari file inspirasi)
      Ini akan dipindahkan ke this.section bersama dengan div utama.
    -->
    <style>
        @keyframes fadeIn {
            '0%': { opacity: '0', transform: 'scale(0.98)' };
            '100%': { opacity: '1', transform: 'scale(1)' };
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out;
        }
    </style>

    <!-- 
      Kontainer Utama (Menggunakan Dark Mode)
      PERHATIKAN: 'container', 'mx-auto', 'max-w-7xl' DIHAPUS.
      Modul ini sekarang akan mengisi 'section#strategi'.
      'section#strategi' harus menangani layout halaman (lebar maks, dll).
    -->
    <div class="bg-gray-900 text-gray-100 font-sans p-4 sm:p-8 animate-fade-in">

        <!-- Header Utama (Terinspirasi "Indonesia 2050") -->
        <header class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 mb-4">
                Analisis Strategi Investasi Syariah
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Membedah Dua Filosofi Inti: Pendekatan Aktif vs. Pasif
            </p>
        </header>

        <!-- Grid Perbandingan Utama -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

            <!-- ====================================================== -->
            <!-- KOLOM KIRI: INVESTASI AKTIF (BAGIAN B) -->
            <!-- ====================================================== -->
            <section class="flex flex-col gap-8">
                
                <!-- Judul Kolom Aktif -->
                <div class="py-4">
                    <h2 class="text-3xl font-bold text-emerald-400 border-b-2 border-emerald-700 pb-3 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                        BAGIAN B: INVESTASI AKTIF
                    </h2>
                    <p class="text-sm text-gray-400 pt-2">Strategi proaktif untuk "mengalahkan pasar" (beat the market).</p>
                </div>

                <!-- Card 2.1: Definisi -->
                <article class="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transition-all hover:border-emerald-500/50">
                    <h3 class="text-xl font-bold text-emerald-400 mb-4">2.1 Definisi, Filosofi, dan Tujuan Utama</h3>
                    <div class="space-y-4 text-gray-300 leading-relaxed">
                        <p>Investasi aktif adalah pendekatan proaktif untuk memilih dan mengelola aset. Tujuan utamanya adalah untuk <strong class="text-white">"mengalahkan pasar" (beat the market)</strong> atau menghasilkan imbal hasil lebih tinggi dari indeks acuan.</p>
                        <p>Filosofinya adalah keyakinan bahwa pasar tidak efisien, sehingga ada peluang menemukan <strong class="text-white">aset yang salah harga (mispriced assets)</strong> melalui analisis superior.</p>
                    </div>
                </article>

                <!-- Card 2.2: Karakteristik, Kelebihan, Kekurangan -->
                <article class="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transition-all hover:border-emerald-500/50">
                    <h3 class="text-xl font-bold text-emerald-400 mb-4">2.2 Karakteristik, Kelebihan, dan Kekurangan</h3>
                    
                    <h4 class="font-semibold text-white mt-4 mb-2">Karakteristik Utama:</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
                        <li><strong>Analisis Intensif:</strong> Sangat bergantung pada riset fundamental dan teknikal.</li>
                        <li><strong>Fleksibilitas Tinggi:</strong> Manajer bebas memutuskan kapan harus membeli, menahan, atau menjual.</li>
                    </ul>

                    <h4 class="font-semibold text-white mt-6 mb-3">Kelebihan:</h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-300 leading-relaxed"><strong>Potensi Imbal Hasil Superior:</strong> Peluang untuk meraih alpha di atas pasar.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-300 leading-relaxed"><strong>Manajemen Risiko Proaktif:</strong> Dapat mengurangi eksposur atau mengambil posisi defensif.</span>
                        </li>
                    </ul>

                    <h4 class="font-semibold text-white mt-6 mb-3">Kekurangan:</h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-400 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-300 leading-relaxed"><strong>Biaya yang Lebih Tinggi:</strong> Biaya manajemen, riset, dan transaksi menggerus imbal hasil.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-400 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-300 leading-relaxed"><strong>Risiko Kinerja Buruk:</strong> Ada risiko signifikan bahwa manajer gagal mengalahkan pasar.</span>
                        </li>
                    </ul>
                </article>

                <!-- Card 2.3: "SYARIAH TWIST" (Highlight Card) -->
                <article class="bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-emerald-500">
                    <h3 class="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line><path d="M8.2 11.1c.9-.5 1.4-1.5 1.4-2.6C9.6 6 8.2 4.6 6.5 4.6S3.4 6 3.4 8.5c0 1.1.5 2.1 1.4 2.6L12 21l7.2-7.3c.9-.5 1.4-1.5 1.4-2.6 0-2.5-1.4-3.9-3.1-3.9s-3.1 1.4-3.1 3.9c0 1.1.5 2.1 1.4 2.6L12 21z"></path></svg>
                        2.3 Perspektif Kritis: Sifat Aktif Inheren
                    </h3>
                    <div class="space-y-4 text-gray-300 leading-relaxed">
                        <p>Investasi syariah <strong class="text-white">secara fundamental memiliki sifat yang inheren aktif</strong> karena dua alasan:</p>
                        <ol class="list-decimal list-inside space-y-2">
                            <li><strong>Penyaringan Syariah adalah Filter Aktif:</strong> Proses screening untuk membuang industri haram adalah sebuah tindakan aktif. Tidak ada investasi yang benar-benar "pasif".</li>
                            <li><strong>Sifat Kontrak Mendorong Keterlibatan Aktif:</strong> Kontrak <em>Musharakah</em> & <em>Mudarabah</em> adalah kemitraan, memaksa bank menjadi mitra investasi aktif, bukan pemberi pinjaman pasif.</li>
                        </ol>
                    </div>
                </article>

                <!-- Card 2.4: Penerapan di Indonesia -->
                <article class="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transition-all hover:border-emerald-500/50">
                    <h3 class="text-xl font-bold text-emerald-400 mb-4">2.4 Penerapan, Tantangan, dan Peluang</h3>
                    <p class="text-gray-300 leading-relaxed mb-4">Di Indonesia, ini diwujudkan melalui Reksadana Saham Syariah, di mana MI aktif memilih saham dari Daftar Efek Syariah (DES).</p>

                    <h4 class="font-semibold text-white mt-6 mb-3">Tantangan Kepatuhan dan Kinerja:</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
                        <li><strong>Beban Kepatuhan:</strong> Frekuensi transaksi tinggi menuntut pemantauan kepatuhan yang ketat.</li>
                        <li><strong>Alam Semesta Investasi Terbatas:</strong> Mengurangi jumlah peluang "penghasil alpha".</li>
                        <li><strong>Risiko Konsentrasi Sektor:</strong> Pengecualian sektor besar (keuangan konvensional) mengurangi diversifikasi.</li>
                    </ul>

                    <!-- Mini-callout (Inspiration style) -->
                    <div class="mt-6 bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                        <h5 class="font-bold text-white">Konsep Unik: "Alpha Kepatuhan"</h5>
                        <p class="text-gray-300 text-sm leading-relaxed mt-1">Keunggulan MI syariah tidak hanya mencari untung, tetapi juga mengidentifikasi perusahaan dengan "kualitas syariah" terbaik (misal: rasio utang jauh di bawah batas 45%). Ini adalah keunggulan kompetitif unik.</p>
                    </div>
                </article>

            </section>
            
            <!-- ====================================================== -->
            <!-- KOLOM KANAN: INVESTASI PASIF (BAGIAN C) -->
            <!-- ====================================================== -->
            <section class="flex flex-col gap-8">
                
                <!-- Judul Kolom Pasif -->
                <div class="py-4">
                    <h2 class="text-3xl font-bold text-blue-400 border-b-2 border-blue-700 pb-3 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        BAGIAN C: INVESTASI PASIF
                    </h2>
                    <p class="text-sm text-gray-400 pt-2">Strategi "beli dan tahan" untuk "meniru pasar" (match the market).</p>
                </div>

                <!-- Card 3.1: Definisi -->
                <article class="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transition-all hover:border-blue-500/50">
                    <h3 class="text-xl font-bold text-blue-400 mb-4">3.1 Definisi, Filosofi, dan Tujuan Utama</h3>
                    <div class="space-y-4 text-gray-300 leading-relaxed">
                        <p>Investasi pasif ("beli dan tahan") adalah pendekatan yang tidak bertujuan mengalahkan pasar, melainkan untuk <strong class="text-white">mereplikasi atau mencerminkan kinerjanya (match the market)</strong>.</p>
                        <p>Filosofinya adalah <strong class="text-white">Hipotesis Pasar Efisien (Efficient Market Hypothesis)</strong>, yang berpendapat bahwa upaya "mengalahkan pasar" dalam jangka panjang adalah sia-sia.</p>
                    </div>
                </article>

                <!-- Card 3.2: Karakteristik, Kelebihan, Kekurangan -->
                <article class="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transition-all hover:border-blue-500/50">
                    <h3 class="text-xl font-bold text-blue-400 mb-4">3.2 Karakteristik, Kelebihan, dan Kekurangan</h3>
                    
                    <h4 class="font-semibold text-white mt-4 mb-2">Karakteristik Utama:</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
                        <li><strong>Mengikuti Indeks (Index Tracking):</strong> Portofolio disusun untuk meniru indeks acuan (misal: JII70).</li>
                        <li><strong>Aktivitas Perdagangan Rendah:</strong> Transaksi minim, hanya untuk rebalancing.</li>
                    </ul>

                    <h4 class="font-semibold text-white mt-6 mb-3">Kelebihan:</h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-300 leading-relaxed"><strong>Efisiensi Biaya (Biaya Jauh Lebih Rendah):</strong> Keunggulan terbesar. Tidak perlu tim analis besar.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-300 leading-relaxed"><strong>Diversifikasi Otomatis dan Luas:</strong> Efektif membeli "sekeranjang" saham.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-300 leading-relaxed"><strong>Menghilangkan Emosi:</strong> Strategi disiplin "beli dan tahan" menghilangkan risiko keputusan panik.</span>
                        </li>
                    </ul>

                    <h4 class="font-semibold text-white mt-6 mb-3">Kekurangan:</h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-400 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-300 leading-relaxed"><strong>Potensi Imbal Hasil Terbatas:</strong> Tidak akan pernah bisa mengungguli pasar (by design).</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-400 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-300 leading-relaxed"><strong>Kurang Fleksibel:</strong> Tidak bisa beralih ke kas atau mengambil posisi defensif saat pasar turun.</span>
                        </li>
                    </ul>
                </article>

                <!-- Card 3.3: Penerapan di Indonesia -->
                <article class="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transition-all hover:border-blue-500/50">
                    <h3 class="text-xl font-bold text-blue-400 mb-4">3.3 Penerapan dalam Konteks Syariah Indonesia</h3>
                    <div class="space-y-4 text-gray-300 leading-relaxed">
                        <p>Strategi pasif dieksekusi terutama melalui dua produk:</p>
                        <ul class="list-decimal list-inside space-y-2">
                            <li><strong>Reksa Dana Indeks Syariah:</strong> Produk reksa dana tradisional.</li>
                            <li><strong>Exchange-Traded Fund (ETF) Syariah:</strong> Diperdagangkan di bursa seperti saham, menawarkan fleksibilitas intraday.</li>
                        </ul>
                    </div>
                </article>

                <!-- Card 3.4: "SYARIAH TWIST" (Highlight Card) -->
                <article class="bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                    <h3 class="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line><path d="M8.2 11.1c.9-.5 1.4-1.5 1.4-2.6C9.6 6 8.2 4.6 6.5 4.6S3.4 6 3.4 8.5c0 1.1.5 2.1 1.4 2.6L12 21l7.2-7.3c.9-.5 1.4-1.5 1.4-2.6 0-2.5-1.4-3.9-3.1-3.9s-3.1 1.4-3.1 3.9c0 1.1.5 2.1 1.4 2.6L12 21z"></path></svg>
                        3.4 Analisis Kepatuhan: Keunggulan Struktural
                    </h3>
                    <div class="space-y-4 text-gray-300 leading-relaxed">
                        <p>Strategi pasif menawarkan <strong class="text-white">keunggulan struktural yang signifikan</strong> dari sudut pandang manajemen risiko kepatuhan syariah.</p>
                        
                        <!-- Mini-callout (Inspiration style) -->
                        <div class="mt-6 bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                            <h5 class="font-bold text-white">Keunggulan Utama: Efisiensi Proses Penyaringan</h5>
                            <p class="text-gray-300 text-sm leading-relaxed mt-1">Proses screening efek syariah yang rumit telah <strong class="text-blue-300">dilakukan oleh penyedia indeks (OJK/BEI)</strong>. Manajer Investasi hanya perlu mereplikasi indeks tersebut.</p>
                        </div>

                        <p>Ini secara drastis <strong class="text-white">menyederhanakan kepatuhan</strong> dan mengurangi <em>compliance burden</em> (beban kepatuhan) dibandingkan MI aktif. Sifat "beli dan tahan" juga menjauhkan investor dari aktivitas spekulatif (maysir).</p>
                    </div>
                </article>

            </section>

        </div> <!-- Akhir dari Grid Utama -->

    </div> <!-- Akhir dari Kontainer Konten -->
        `;

        // 3. (PERBAIKAN) Hapus konten lama di 'this.section'
        this.section.innerHTML = '';

        // 4. (PERBAIKAN) Pindahkan SEMUA ANAK dari 'contentWrapper' ke 'this.section'
        // Ini akan memindahkan <style> DAN <div> konten utama
        while (contentWrapper.firstChild) {
            this.section.appendChild(contentWrapper.firstChild);
        }

        // 5. (PERBAIKAN ARSITEKTUR) Sediakan slot khusus untuk modul kurikulum
        const kurikulumSlot = document.createElement('div');
        kurikulumSlot.id = "strategi-kurikulum-slot";
        this.section.appendChild(kurikulumSlot);
    }
}

