/*
 * ====================================================================
 * KurikulumModule.js: (VERSI FINAL YANG SUDAH DIPERBAIKI)
 * ====================================================================
 * - Dikonversi ke ES Module (import/export).
 * - Menghapus 'eventBus.subscribe' untuk memperbaiki "race condition".
 * - Memperbaiki nama fungsi yang bertabrakan:
 * - 'render' adalah fungsi async publik (dipanggil modul lain).
 * - '_buildHTML' adalah fungsi privat untuk membuat tampilan.
 * - Memperbaiki typo 'class.name' di dalam _buildHTML.
 */

class KurikulumModule {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.allKurikulum = [];
        this.hasFetched = false;

        // eventBus.subscribe dihapus dari sini untuk memperbaiki bug "muncul di atas".
    }

    async fetchData() {
        try {
            const response = await fetch(AppConfig.DATA_PATHS.KURIKULUM);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.allKurikulum = await response.json();
            this.hasFetched = true;
        } catch (error) {
            this.eventBus.publish(AppConfig.EVENTS.CRITICAL_ERROR, {
                module: "Kurikulum",
                message: error.message
            });
            // Set allKurikulum ke array kosong jika gagal, agar .filter tidak error
            this.allKurikulum = [];
        }
    }

    /**
     * Ini adalah fungsi PUBLIK baru yang akan dipanggil oleh modul lain.
     * (Sebelumnya adalah 'handleTabChange').
     */
    async render(section, targetId) {
        // Periksa jika section valid
        if (!section || typeof section.classList === 'undefined' || section.classList.contains('kurikulum-added')) {
            return;
        }

        if (!this.hasFetched) {
            await this.fetchData();
        }

        // Pastikan this.allKurikulum adalah array sebelum memfilter
        if (!Array.isArray(this.allKurikulum)) {
             this.eventBus.publish(AppConfig.EVENTS.CRITICAL_ERROR, {
                module: "Kurikulum",
                message: "Data kurikulum tidak dalam format yang benar (bukan array)."
            });
            return; // Hentikan eksekusi
        }

        const items = this.allKurikulum.filter(item => {
            if (Array.isArray(item.kategori_tab)) {
                return item.kategori_tab.includes(targetId);
            }
            return item.kategori_tab === targetId;
        });

        if (items.length === 0) {
            section.classList.add('kurikulum-added');
            return;
        }

        // Memanggil helper privat _buildHTML
        const curriculumElement = this._buildHTML(items, targetId);

        if (curriculumElement) {
            section.appendChild(curriculumElement);
            section.classList.add('kurikulum-added');
        }
    }

    /**
     * Ini adalah helper PRIVAT baru untuk membuat HTML.
     * (Sebelumnya bernama 'render').
     */
    _buildHTML(items, targetId) {
        let titleText = "Materi Terkait";
        if (targetId === 'beranda') titleText = "Materi Pengantar";
        if (targetId === 'instrumen') titleText = "Riset Pendukung";
        if (targetId === 'batasan') titleText = "Kajian Mendalam";

        const sectionWrapper = document.createElement('div');
        sectionWrapper.className = "mt-8";

        const title = document.createElement('h3');
        title.className = "font-serif text-2xl text-brand-dark mb-4 border-b-2 border-brand-accent/30 pb-2";
        title.textContent = titleText;

        const grid = document.createElement('div');
        grid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

        // 'items' sekarang dijamin sebuah array, .forEach akan berhasil
        items.forEach(item => {
            const url = item.url || '#';
            const icon = item.tipe === 'video' ? '▶️' : (item.tipe === 'artikel' ? '📄' : '📚');

            const cardLink = document.createElement('a');
            cardLink.href = url;
            if (item.url) {
                cardLink.target = "_blank";
                cardLink.rel = "noopener noreferrer";
            }
            cardLink.className = "block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300";

            // MEMPERBAIKI typo 'class.name' dari file asli
            cardLink.innerHTML = `
                <span class="text-xl">${icon}</span>
                <h4 class="font-serif font-semibold text-brand-dark mt-2">${item.judul}</h4>
                <p class="font-sans text-sm text-brand-secondary mt-1">${item.sumber}</p>
            `;
            grid.appendChild(cardLink);
        });

        sectionWrapper.appendChild(title);
        sectionWrapper.appendChild(grid);
        return sectionWrapper;
    }
}
