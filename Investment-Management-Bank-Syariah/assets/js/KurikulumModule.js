/*
 * ====================================================================
 * KurikulumModule.js: A shared "service" (TYPO FIX)
 * ====================================================================
 * BUGFIX:
 * - Fixed 'class.name=' typos to the correct 'className'.
 */
class KurikulumModule {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.allKurikulum = [];
        this.hasFetched = false;

        this.eventBus.subscribe('tabChanged', (targetId) => this.handleTabChange(targetId));
    }

    async fetchData() {
        try {
            const response = await fetch('assets/data/kurikulum.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.allKurikulum = await response.json();
            this.hasFetched = true;
        } catch (error) {
            console.error("Gagal memuat kurikulum.json:", error);
        }
    }

    async handleTabChange(targetId) {
        const section = document.getElementById(targetId);
        if (!section || section.classList.contains('kurikulum-added')) {
            return;
        }

        if (!this.hasFetched) {
            await this.fetchData();
        }

        const items = this.allKurikulum.filter(item => item.kategori_tab === targetId);
        if (items.length === 0) {
            return;
        }

        const curriculumElement = this.render(items, targetId);
        if (curriculumElement) {
            section.appendChild(curriculumElement);
            section.classList.add('kurikulum-added');
        }
    }

    // --- View Logic (TYPOS FIXED) ---
    render(items, targetId) {
        let titleText = "Materi Terkait";
        if (targetId === 'beranda') titleText = "Materi Pengantar";
        if (targetId === 'instrumen') titleText = "Riset Pendukung";
        if (targetId === 'batasan') titleText = "Kajian Mendalam";

        const sectionWrapper = document.createElement('div');
        // --- FIX ---
        sectionWrapper.className = "mt-8";

        const title = document.createElement('h3');
        // --- FIX ---
        title.className = "font-serif text-2xl text-brand-dark mb-4 border-b-2 border-brand-accent/30 pb-2";
        title.textContent = titleText;

        const grid = document.createElement('div');
        // --- FIX ---
        grid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

        items.forEach(item => {
            const url = item.url || '#';
            const icon = item.tipe === 'video' ? '▶️' : (item.tipe === 'artikel' ? '📄' : '📚');

            const cardLink = document.createElement('a');
            cardLink.href = url;
            if (item.url) {
                cardLink.target = "_blank";
                cardLink.rel = "noopener noreferrer";
            }
            // --- FIX ---
            cardLink.className = "block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300";
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