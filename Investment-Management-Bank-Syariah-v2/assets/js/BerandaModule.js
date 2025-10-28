/*
 * ====================================================================
 * BerandaModule.js: View/Controller for the "Beranda" tab
 * ====================================================================
 * BUGFIX: The 'subscribe' call now uses an arrow function
 * to correctly bind the 'this' context for 'handleTabChange'.
 */
class BerandaModule {
    constructor(eventBus) {
        this.section = document.getElementById('beranda');
        this.hasRendered = false;
        // --- THE FIX ---
        eventBus.subscribe('tabChanged', (targetId) => this.handleTabChange(targetId));
    }

    // --- Controller Logic ---
    handleTabChange(targetId) {
        if (targetId !== 'beranda' || this.hasRendered) {
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
                <h2 class="font-serif text-3xl text-brand-dark mb-4">A. Pengertian Manajemen Investasi</h2>
                <p class="font-sans text-brand-dark/80 leading-relaxed">
                    Ini adalah konten statis untuk **Beranda / Pengertian**.
                    <br><br>
                    Manajemen investasi syariah adalah proses pengelolaan dana investor oleh Manajer Investasi (MI) ke dalam portofolio efek (seperti saham, sukuk, dan pasar uang) yang sesuai dengan prinsip-prinsip syariah...
                </p>
            </div>
        `;
        this.section.appendChild(content);
    }
}