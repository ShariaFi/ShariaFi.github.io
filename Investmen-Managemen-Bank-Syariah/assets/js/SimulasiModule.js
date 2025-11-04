/*
 * ====================================================================
 * SimulasiModule.js: (REFACTORED - FINAL)
 * ====================================================================
 * Modul ini merender "halaman peluncuran" statis.
 *
 * (FIX): Tautan 'href' sekarang menunjuk ke
 * './Syariah-Portfolio-Simulator/index.html' sesuai
 * struktur file Anda.
 *
 * Ini juga menerapkan "handshake" kurikulum yang benar.
 */
class SimulasiModule {
    constructor(eventBus) {
        this.section = document.getElementById('simulasi');
        this.hasRendered = false;
        this.eventBus = eventBus;

        this.eventBus.subscribe(AppConfig.EVENTS.TAB_CHANGED, (targetId) => this.handleTabChange(targetId));
    }

    // --- Controller Logic (Termasuk Perbaikan Kurikulum) ---
    handleTabChange(targetId) {
        // Bukan tab kita? Jangan lakukan apa-apa. Sudah di-render? Jangan lakukan apa-apa.
        if (targetId !== 'simulasi' || this.hasRendered) {
            return;
        }

        // --- View Logic ---
        this.render();
        this.hasRendered = true; // Tandai sebagai selesai

        // --- 🛑 PERBAIKAN KURIKULUM (BAGIAN 1) 🛑 ---
        // Kirim event untuk memberitahu KurikulumModule agar merender kontennya.
        this.eventBus.publish('renderKurikulum', targetId);
    }

    // --- View Logic (REFACTORED) ---
    render() {
        // Hapus konten lama
        this.section.innerHTML = '';

        // Buat konten "launch page" yang baru
        const launchPageHtml = `
            <div class="p-8 bg-white rounded-lg shadow-md text-center">
                <h2 class="font-serif text-3xl text-brand-dark mb-4">Simulator Investasi</h2>
                <p class="font-sans text-brand-dark/80 leading-relaxed mb-6">
                    Simulator ini dirancang untuk berjalan di halamannya sendiri untuk performa terbaik.
                    <br>
                    Klik tombol di bawah ini untuk membukanya di tab baru.
                </p>
                
                <a href="./Syariah-Portfolio-Simulator/index.html" target="_blank" rel="noopener noreferrer" 
                   class="inline-block bg-brand-accent text-brand-dark font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-accent/80 transition-colors">
                    Buka Simulator di Tab Baru &rarr;
                </a>
            </div>
        `;

        this.section.innerHTML = launchPageHtml;

        // --- 🛑 PERBAIKAN KURIKULUM (BAGIAN 2) 🛑 ---
        // Sediakan slot khusus untuk KurikulumModule
        const kurikulumSlot = document.createElement('div');
        kurikulumSlot.id = "simulasi-kurikulum-slot";
        kurikulumSlot.className = "mt-8"; // Beri sedikit jarak
        this.section.appendChild(kurikulumSlot);
    }
}