/*
 * ====================================================================
 * KurikulumModule.js: A shared "service" (VERSION 3.1 - Typo Fix)
 * ====================================================================
 * BUGFIX:
 * - Fixed a 'ReferenceError' typo.
 * - The variable 'curriculumElement' was misspelled as 'curiculumElement'
 * in the 'if' check, causing the script to crash.
 */
class KurikulumModule {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.allKurikulum = [];
        this.hasFetched = false;

        // Use AppConfig constant
        this.eventBus.subscribe(AppConfig.EVENTS.TAB_CHANGED, (targetId) => this.handleTabChange(targetId));
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
            // --- THIS BLOCK IS UPDATED ---
            // OLD: console.error(...)

            // NEW: Publish the error to the global handler
            this.eventBus.publish(AppConfig.EVENTS.CRITICAL_ERROR, {
                module: "Kurikulum",
                message: error.message
            });
            // -----------------------------
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

        // --- THE FIX IS HERE ---
        // 1. Variable is created as 'curriculumElement'
        const curriculumElement = this.render(items, targetId);

        // 2. The 'if' check now uses the correctly spelled 'curriculumElement'
        if (curriculumElement) {
            section.appendChild(curriculumElement);
            section.classList.add('kurikulum-added');
        }
        // -------------------------
    }

    // --- View Logic (Unchanged) ---
    render(items, targetId) {
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
            cardLink.innerHTML = `
                <span class="text-xl">${icon}</span>
                <h4 class.name="font-serif font-semibold text-brand-dark mt-2">${item.judul}</h4>
                <p class="font-sans text-sm text-brand-secondary mt-1">${item.sumber}</p>
            `;
            grid.appendChild(cardLink);
        });

        sectionWrapper.appendChild(title);
        sectionWrapper.appendChild(grid);
        return sectionWrapper;
    }
}