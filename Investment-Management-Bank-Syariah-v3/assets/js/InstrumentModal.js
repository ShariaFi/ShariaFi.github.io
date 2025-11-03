/**
 * @fileoverview InstrumentModal.js: A dedicated class for the instrument details modal.
 * This class adheres to SRP by encapsulating all modal logic, including
 * DOM creation, event listeners (click-off, Escape key), and content population.
 */
class InstrumentModal {
    constructor() {
        this.modal = document.createElement('div');
        this.modal.id = "instrumen-modal";
        this.modal.className = "hidden fixed inset-0 bg-brand-dark/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm";
        document.body.appendChild(this.modal);

        this._addEventListeners();
    }

    /**
     * PUBLIC: Opens the modal and populates it with item data.
     * @param {Object} item - The instrument data object to display.
     */
    open(item) {
        if (!item) return;

        // Populate the modal's inner HTML with the item's data
        this.modal.innerHTML = `
            <div class="bg-brand-light max-w-2xl w-full rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div class="p-6 border-b border-brand-secondary/20">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="inline-block bg-brand-accent/20 text-brand-dark text-xs font-semibold px-3 py-1 rounded-full mb-2">${item.kategori}</span>
                            <h2 class="font-serif text-3xl text-brand-dark">${item.nama}</h2>
                        </div>
                        <button id="modal-close-btn" class="text-brand-secondary text-3xl font-bold leading-none hover:text-brand-dark">&times;</button>
                    </div>
                </div>
                <div class="p-6 overflow-y-auto space-y-4">
                    <p class="font-sans text-brand-dark leading-relaxed">${item.deskripsi_lengkap}</p>
                    <div><h4 class="font-sans font-semibold text-brand-dark">Akad Utama:</h4><p class="font-sans text-brand-secondary">${item.akad_utama.join(', ')}</p></div>
                    <div><h4 class="font-sans font-semibold text-brand-dark">Dasar Hukum:</h4><p class="font-sans text-brand-secondary">${item.dasar_hukum}</p></div>
                </div>
            </div>
        `;

        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    /**
     * PUBLIC: Closes the modal.
     */
    close() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    // --- Internal (Private) Methods ---

    /**
     * Binds all necessary event listeners for the modal.
     */
    _addEventListeners() {
        // Use arrow functions to ensure 'this' refers to the class instance
        this.modal.addEventListener('click', (e) => {
            // Close if backdrop or close button is clicked
            if (e.target.id === 'instrumen-modal' || e.target.closest('#modal-close-btn')) {
                this.close();
            }
        });

        // Use a single, named handler for the keydown event
        this._handleKeyDown = (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.close();
            }
        };

        // Listen on the document, not the modal, for the Escape key
        document.addEventListener('keydown', this._handleKeyDown);
    }

    // We could add a 'destroy()' method to remove the keydown listener
    // if this modal were ever to be removed from the page,
    // but for this app, it lives forever.
}
