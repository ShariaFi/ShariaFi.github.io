/*
 * ====================================================================
 * StrategiModule.js: View/Controller for the "Strategi" tab
 * ====================================================================
 * BUGFIX: The 'subscribe' call now uses an arrow function
 * to correctly bind the 'this' context for 'handleTabChange'.
 */
class StrategiModule {
    constructor(eventBus) {
        this.section = document.getElementById('strategi');
        this.hasRendered = false;
        // --- THE FIX ---
        eventBus.subscribe('tabChanged', (targetId) => this.handleTabChange(targetId));
    }

    // --- Controller Logic ---
    handleTabChange(targetId) {
        if (targetId !== 'strategi' || this.hasRendered) {
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
                <h2 class="font-serif text-3xl text-brand-dark mb-4">B & C. Strategi Investasi: Aktif vs. Pasif</h2>
                <p class="font-sans text-brand-dark/80 leading-relaxed mb-6">
                    Ini adalah konten statis untuk **Strategi**. Manajer Investasi (MI) dapat memilih dua pendekatan utama...
                </p>
                <div class="overflow-x-auto">
                    <table class="w-full min-w-lg border">
                        <thead class="bg-brand-dark/10">
                            <tr>
                                <th class="p-3 font-semibold text-left">Fitur</th>
                                <th class="p-3 font-semibold text-left">Strategi Aktif</th>
                                <th class="p-3 font-semibold text-left">Strategi Pasif</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-t">
                                <td class="p-3">Tujuan</td>
                                <td class="p-3">Mengalahkan kinerja pasar (indeks).</td>
                                <td class="p-3">Meniru kinerja pasar (indeks).</td>
                            </tr>
                            <tr class="border-t bg-brand-light">
                                <td class="p-3">Biaya</td>
                                <td class="p-3">Lebih tinggi (karena riset & transaksi).</td>
                                <td class="p-3">Lebih rendah.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        this.section.appendChild(content);
    }
}