/*
 * ====================================================================
 * StrategiModule.js: (FIXED: Light Mode & Aligned Layout)
 * ====================================================================
 * REFACTOR (PERBAIKAN KRITIS):
 * 1. MASALAH TEMA: Keluhan "being black is not good" dikonfirmasi.
 * SOLUSI: Tema diubah total dari Dark Mode -> LIGHT MODE.
 * - Latar belakang utama: bg-gray-50
 * - Latar belakang kartu: bg-white
 * - Teks: text-gray-800 / text-gray-600
 *
 * 2. MASALAH HOVER: Mengembalikan ide hover yang disukai pengguna
 * tetapi dengan warna yang JAUH LEBIH HALUS & profesional
 * (hover:border-emerald-300 & hover:border-blue-300).
 *
 * 3. MASALAH TATA LETAK ("SAME LEVEL"): Tetap menggunakan struktur
 * 4-BARIS-GRID dari versi sebelumnya, karena ini adalah
 * solusi yang benar untuk menyamakan tinggi kartu.
 *
 * 4. DOM INJECTION: Tetap menggunakan metode .createElement yang aman.
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
     * Render (Ditulis Ulang dengan Light Mode & Tata Letak BARIS)
     */
    render() {

        // 1. Hapus konten lama
        this.section.innerHTML = '';

        // 2. Buat dan suntikkan <style> secara programatik (Aman)
        const styleElement = document.createElement('style');
        const cssRules = `
            @keyframes fadeIn {
                '0%': { opacity: '0', transform: 'scale(0.98)' };
                '100%': { opacity: '1', transform: 'scale(1)' };
            }
            .animate-fade-in {
                animation: fadeIn 0.5s ease-out;
            }
        `;
        styleElement.textContent = cssRules;
        this.section.appendChild(styleElement);


        // 3. Buat div konten dan atur innerHTML-nya
        const contentDiv = document.createElement('div');
        // (PERUBAHAN TEMA) Mengganti dark mode dengan light mode
        contentDiv.className = "bg-gray-50 text-gray-800 font-sans p-4 sm:p-8 animate-fade-in";

        // 4. Atur innerHTML dengan TATA LETAK BERBASIS BARIS (Light Mode)
        contentDiv.innerHTML = `
            <!-- Header Utama -->
            <header class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 mb-4">
                    Analisis Strategi Investasi Syariah
                </h1>
                <!-- (PERUBAHAN TEMA) Teks diubah menjadi abu-abu gelap -->
                <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                    Membedah Dua Filosofi Inti: Pendekatan Aktif vs. Pasif
                </p>
            </header>

            <!-- Judul Kolom (Tetap) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <!-- Judul Kolom Aktif -->
                <div class="py-4">
                    <!-- (PERUBAHAN TEMA) Border diubah menjadi lebih terang -->
                    <h2 class="text-3xl font-bold text-emerald-600 border-b-2 border-emerald-200 pb-3 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                        BAGIAN B: INVESTASI AKTIF
                    </h2>
                    <p class="text-sm text-gray-500 pt-2">Strategi proaktif untuk "mengalahkan pasar" (beat the market).</p>
                </div>
                <!-- Judul Kolom Pasif -->
                <div class="py-4">
                    <!-- (PERUBAHAN TEMA) Border diubah menjadi lebih terang -->
                    <h2 class="text-3xl font-bold text-blue-600 border-b-2 border-blue-200 pb-3 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        BAGIAN C: INVESTASI PASIF
                    </h2>
                    <p class="text-sm text-gray-500 pt-2">Strategi "beli dan tahan" untuk "meniru pasar" (match the market).</p>
                </div>
            </div>

            <!-- BARIS 1 (Definisi) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
                <!-- Card 2.1: Definisi Aktif -->
                <!-- (PERUBAHAN TEMA) Kartu bg-white, shadow, border-gray, hover effect halus -->
                <article class="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-emerald-300">
                    <h3 class="text-xl font-bold text-emerald-600 mb-4">2.1 Definisi, Filosofi, dan Tujuan Utama</h3>
                    <div class="space-y-4 text-gray-700 leading-relaxed">
                        <p>Investasi aktif adalah pendekatan proaktif untuk memilih dan mengelola aset. Tujuan utamanya adalah untuk <strong class="text-gray-900">"mengalahkan pasar" (beat the market)</strong> atau menghasilkan imbal hasil lebih tinggi dari indeks acuan.</p>
                        <p>Filosofinya adalah keyakinan bahwa pasar tidak efisien, sehingga ada peluang menemukan <strong class="text-gray-900">aset yang salah harga (mispriced assets)</strong> melalui analisis superior.</p>
                    </div>
                </article>

                <!-- Card 3.1: Definisi Pasif -->
                <article class="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-blue-300">
                    <h3 class="text-xl font-bold text-blue-600 mb-4">3.1 Definisi, Filosofi, dan Tujuan Utama</h3>
                    <div class="space-y-4 text-gray-700 leading-relaxed">
                        <p>Investasi pasif ("beli dan tahan") adalah pendekatan yang tidak bertujuan mengalahkan pasar, melainkan untuk <strong class="text-gray-900">mereplikasi atau mencerminkan kinerjanya (match the market)</strong>.</p>
                        <p>Filosofinya adalah <strong class="text-gray-900">Hipotesis Pasar Efisien (Efficient Market Hypothesis)</strong>, yang berpendapat bahwa upaya "mengalahkan pasar" dalam jangka panjang adalah sia-sia.</p>
                    </div>
                </article>
            </div>

            <!-- BARIS 2 (Karakteristik, Kelebihan, Kekurangan) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
                <!-- Card 2.2: Karakteristik Aktif -->
                <article class="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-emerald-300">
                    <h3 class="text-xl font-bold text-emerald-600 mb-4">2.2 Karakteristik, Kelebihan, dan Kekurangan</h3>
                    
                    <h4 class="font-semibold text-gray-900 mt-4 mb-2">Karakteristik Utama:</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                        <li><strong>Analisis Intensif:</strong> Sangat bergantung pada riset fundamental dan teknikal.</li>
                        <li><strong>Fleksibilitas Tinggi:</strong> Manajer bebas memutuskan kapan harus membeli, menahan, atau menjual.</li>
                    </ul>

                    <h4 class="font-semibold text-gray-900 mt-6 mb-3">Kelebihan:</h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Potensi Imbal Hasil Superior</strong></span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Manajemen Risiko Proaktif</strong></span>
                        </li>
                    </ul>

                    <h4 class="font-semibold text-gray-900 mt-6 mb-3">Kekurangan:</h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Biaya yang Lebih Tinggi</strong></span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Risiko Kinerja Buruk</strong></span>
                        </li>
                    </ul>
                </article>

                <!-- Card 3.2: Karakteristik Pasif -->
                <article class="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-blue-300">
                    <h3 class="text-xl font-bold text-blue-600 mb-4">3.2 Karakteristik, Kelebihan, dan Kekurangan</h3>
                    
                    <h4 class="font-semibold text-gray-900 mt-4 mb-2">Karakteristik Utama:</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                        <li><strong>Mengikuti Indeks (Index Tracking):</strong> Portofolio disusun untuk meniru indeks acuan (misal: JII70).</li>
                        <li><strong>Aktivitas Perdagangan Rendah:</strong> Transaksi minim, hanya untuk rebalancing.</li>
                    </ul>

                    <h4 class="font-semibold text-gray-900 mt-6 mb-3">Kelebihan:</h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Efisiensi Biaya (Jauh Lebih Rendah)</strong></span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Diversifikasi Otomatis dan Luas</strong></span>
                        </li>
                         <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500 flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Menghilangkan Emosi</strong></span>
                        </li>
                    </ul>

                    <h4 class="font-semibold text-gray-900 mt-6 mb-3">Kekurangan:</h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Potensi Imbal Hasil Terbatas</strong></span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            <span class="text-gray-700 leading-relaxed"><strong>Kurang Fleksibel</strong></span>
                        </li>
                    </ul>
                </article>
            </div>

            <!-- BARIS 3 (Highlight "Syariah Twist") -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
                <!-- Card 2.3: Highlight Aktif -->
                <!-- (PERUBAHAN TEMA) Kartu highlight dengan bg-emerald-50 -->
                <article class="bg-emerald-50 p-6 rounded-xl shadow-lg border-l-4 border-emerald-400 transition-all duration-300 hover:shadow-xl">
                    <h3 class="text-xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600"><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line><path d="M8.2 11.1c.9-.5 1.4-1.5 1.4-2.6C9.6 6 8.2 4.6 6.5 4.6S3.4 6 3.4 8.5c0 1.1.5 2.1 1.4 2.6L12 21l7.2-7.3c.9-.5 1.4-1.5 1.4-2.6 0-2.5-1.4-3.9-3.1-3.9s-3.1 1.4-3.1 3.9c0 1.1.5 2.1 1.4 2.6L12 21z"></path></svg>
                        2.3 Perspektif Kritis: Sifat Aktif Inheren
                    </h3>
                    <div class="space-y-4 text-emerald-800 leading-relaxed">
                        <p>Investasi syariah <strong class="text-emerald-900">secara fundamental memiliki sifat yang inheren aktif</strong> karena dua alasan:</p>
                        <ol class="list-decimal list-inside space-y-2">
                            <li><strong>Penyaringan Syariah adalah Filter Aktif:</strong> Proses screening untuk membuang industri haram adalah sebuah tindakan aktif. Tidak ada investasi yang benar-benar "pasif".</li>
                            <li><strong>Sifat Kontrak Mendorong Keterlibatan Aktif:</strong> Kontrak <em>Musharakah</em> & <em>Mudarabah</em> adalah kemitraan, memaksa bank menjadi mitra investasi aktif.</li>
                        </ol>
                    </div>
                </article>

                <!-- Card 3.4: Highlight Pasif -->
                <!-- (PERUBAHAN TEMA) Kartu highlight dengan bg-blue-50 -->
                <article class="bg-blue-50 p-6 rounded-xl shadow-lg border-l-4 border-blue-400 transition-all duration-300 hover:shadow-xl">
                    <h3 class="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line><path d="M8.2 11.1c.9-.5 1.4-1.5 1.4-2.6C9.6 6 8.2 4.6 6.5 4.6S3.4 6 3.4 8.5c0 1.1.5 2.1 1.4 2.6L12 21l7.2-7.3c.9-.5 1.4-1.5 1.4-2.6 0-2.5-1.4-3.9-3.1-3.9s-3.1 1.4-3.1 3.9c0 1.1.5 2.1 1.4 2.6L12 21z"></path></svg>
                        3.4 Analisis Kepatuhan: Keunggulan Struktural
                    </h3>
                    <div class="space-y-4 text-blue-800 leading-relaxed">
                        <p>Strategi pasif menawarkan <strong class="text-blue-900">keunggulan struktural yang signifikan</strong> dari sudut pandang manajemen risiko kepatuhan syariah.</p>
                        
                        <div class="mt-6 bg-blue-100 p-4 rounded-lg border border-blue-200">
                            <h5 class="font-bold text-blue-900">Keunggulan Utama: Efisiensi Proses Penyaringan</h5>
                            <p class="text-blue-800 text-sm leading-relaxed mt-1">Proses screening yang rumit telah <strong class="text-blue-900">dilakukan oleh penyedia indeks (OJK/BEI)</strong>. MI hanya perlu mereplikasi indeks.</p>
                        </div>

                        <p>Ini <strong class="text-blue-900">menyederhanakan kepatuhan</strong> dan mengurangi <em>compliance burden</em>. Sifat "beli dan tahan" juga menjauhkan dari spekulasi (maysir).</p>
                    </div>
                </article>
            </div>

            <!-- BARIS 4 (Penerapan & Tantangan) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
                <!-- Card 2.4: Penerapan Aktif -->
                <article class="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-emerald-300">
                    <h3 class="text-xl font-bold text-emerald-600 mb-4">2.4 Penerapan, Tantangan, dan Peluang</h3>
                    <p class="text-gray-700 leading-relaxed mb-4">Diwujudkan melalui Reksadana Saham Syariah, di mana MI aktif memilih saham dari Daftar Efek Syariah (DES).</p>

                    <h4 class="font-semibold text-gray-900 mt-6 mb-3">Tantangan Kepatuhan dan Kinerja:</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                        <li><strong>Beban Kepatuhan:</strong> Frekuensi transaksi tinggi menuntut pemantauan ketat.</li>
                        <li><strong>Alam Semesta Investasi Terbatas:</strong> Mengurangi jumlah peluang "penghasil alpha".</li>
                        <li><strong>Risiko Konsentrasi Sektor:</strong> Pengecualian sektor besar mengurangi diversifikasi.</li>
                    </ul>

                    <div class="mt-6 bg-gray-100 p-4 rounded-lg border border-gray-200">
                        <h5 class="font-bold text-gray-900">Konsep Unik: "Alpha Kepatuhan"</h5>
                        <p class="text-gray-700 text-sm leading-relaxed mt-1">Keunggulan MI syariah tidak hanya mencari untung, tetapi juga mengidentifikasi perusahaan dengan "kualitas syariah" terbaik (misal: rasio utang jauh di bawah batas 45%).</p>
                    </div>
                </article>

                <!-- Card 3.3: Penerapan Pasif -->
                <article class="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-blue-300">
                    <h3 class="text-xl font-bold text-blue-600 mb-4">3.3 Penerapan dalam Konteks Syariah Indonesia</h3>
                    <div class="space-y-4 text-gray-700 leading-relaxed">
                        <p>Strategi pasif dieksekusi terutama melalui dua produk:</p>
                        <ul class="list-decimal list-inside space-y-2">
                            <li><strong>Reksa Dana Indeks Syariah:</strong> Produk reksa dana tradisional.</li>
                            <li><strong>Exchange-Traded Fund (ETF) Syariah:</strong> Diperdagangkan di bursa seperti saham, menawarkan fleksibilitas intraday.</li>
                        </ul>
                    </div>
                </article>
            </div>
        `;

        // 5. Append div konten utama ke 'this.section'
        this.section.appendChild(contentDiv);

        // 6. Sediakan slot khusus untuk modul kurikulum
        const kurikulumSlot = document.createElement('div');
        kurikulumSlot.id = "strategi-kurikulum-slot";
        this.section.appendChild(kurikulumSlot);
    }
}