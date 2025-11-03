/*
 * ====================================================================
 * SimulasiModule.js: View/Controller for the "Simulasi" tab
 * ====================================================================
 * This module's ONLY job is to listen for the 'simulasi' tab event
 * and render an iframe pointing to 'simulator.html'.
 */
class SimulasiModule {
    constructor(eventBus) {
        this.section = document.getElementById('simulasi');
        this.hasRendered = false;
        // Subscribe using an arrow function to bind 'this'
        eventBus.subscribe('tabChanged', (targetId) => this.handleTabChange(targetId));
    }

    // --- Controller Logic ---
    handleTabChange(targetId) {
        // Not our tab? Do nothing. Already rendered? Do nothing.
        if (targetId !== 'simulasi' || this.hasRendered) {
            return;
        }

        // --- View Logic ---
        this.render();
        this.hasRendered = true; // Mark as done
    }

    // --- View Logic ---
    render() {
        // Create the iframe element
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', './simulator.html'); // Points to the file in the same directory as index.html
        iframe.setAttribute('title', 'Simulator Investasi Syariah');

        // Style the iframe (Tailwind classes can be applied if needed, or use CSS)
        // Make it take up space and have a border
        iframe.className = "w-full h-[600px] border border-brand-secondary/30 rounded-lg shadow-md";
        // Adjust height (h-[600px]) as needed

        // Add a loading message (optional)
        const loadingMessage = document.createElement('p');
        loadingMessage.className = "text-brand-secondary text-center";
        loadingMessage.textContent = "Memuat simulator...";

        // Clear any previous content and add the elements
        this.section.innerHTML = '';
        this.section.appendChild(loadingMessage);

        // Only show the iframe once it's loaded to avoid showing a blank box
        iframe.onload = () => {
            loadingMessage.style.display = 'none'; // Hide loading message
            iframe.style.display = 'block'; // Show iframe
        };
        iframe.style.display = 'none'; // Hide iframe initially

        this.section.appendChild(iframe);
    }
}
