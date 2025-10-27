/*
 * ====================================================================
 * BatasanModule.js: View/Controller for the "Batasan" tab
 * ====================================================================
 * BUGFIX: The 'subscribe' call now uses an arrow function
 * to correctly bind the 'this' context for 'handleTabChange'.
 */
class BatasanModule {
    constructor(eventBus) {
        this.section = document.getElementById('batasan');
        this.hasRendered = false;
        // --- THE FIX ---
        eventBus.subscribe('tabChanged', (targetId) => this.handleTabChange(targetId));
    }

    // --- Controller Logic ---
    handleTabChange(targetId) {
        if (targetId !== 'batasan' || this.hasRendered) {
            return;
        }

        this.render();
        this.hasRendered = true;
    }

    // --- View Logic ---
    render() {
        const content = document.createElement('div');
        content.innerHTML = `
            <div class="p-8 bg-white rounded-lg shadow-md mb-6">
                <h2 class="font-serif text-3xl text-brand-dark mb-4">E & F. Batasan Investasi</h2>
                <p class="font-sans text-brand-dark/80 leading-relaxed">
                    Ini adalah konten statis untuk **Batasan**.
                    <br><br>
                    Investasi syariah tidak hanya mencari keuntungan, tetapi juga harus mematuhi batasan-batasan syariah...
                </p>
            </div>
        `;
        this.section.appendChild(content);
    }
}