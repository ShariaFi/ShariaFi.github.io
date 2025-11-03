/*
 * ====================================================================
 * KurikulumRenderer.js: A dedicated "View" class.
 * ====================================================================
 * This class is responsible *only* for rendering curriculum data
 * into a DOM element. It is injected into KurikulumModule.
 * This separation follows the Single Responsibility Principle.
 */
class KurikulumRenderer {

    /**
     * Renders a list of curriculum items into a DOM element.
     * @param {Array<object>} items - The list of curriculum items to render.
     * @param {string} targetId - The ID of the tab (e.g., 'beranda', 'instrumen').
     * @returns {HTMLElement} - A DOM element (sectionWrapper) ready to be appended.
     */
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

            // (FIX) Create elements manually to prevent XSS vulnerabilities
            const iconSpan = document.createElement('span');
            iconSpan.className = "text-xl";
            iconSpan.textContent = icon;

            const titleHeader = document.createElement('h4');
            // (FIX) Corrected 'class.name' to 'className'
            titleHeader.className = "font-serif font-semibold text-brand-dark mt-2";
            titleHeader.textContent = item.judul;

            const sourcePara = document.createElement('p');
            sourcePara.className = "font-sans text-sm text-brand-secondary mt-1";
            sourcePara.textContent = item.sumber;

            cardLink.appendChild(iconSpan);
            cardLink.appendChild(titleHeader);
            cardLink.appendChild(sourcePara);

            grid.appendChild(cardLink);
        });

        sectionWrapper.appendChild(title);
        sectionWrapper.appendChild(grid);
        return sectionWrapper;
    }
}