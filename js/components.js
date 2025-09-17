// Component loader utility for shared header and footer
class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${response.status}`);
            }
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    static async loadHeader() {
        await this.loadComponent('header-placeholder', 'pages/components/header.html');
    }

    static async loadFooter() {
        await this.loadComponent('footer-placeholder', 'pages/components/footer.html');
    }

    static async loadAll() {
        await Promise.all([
            this.loadHeader(),
            this.loadFooter()
        ]);
        
        // Add a small delay to ensure DOM is fully updated
        setTimeout(() => {
            // Dispatch custom event when components are loaded
            document.dispatchEvent(new CustomEvent('componentsLoaded'));
        }, 50);
    }
}

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    ComponentLoader.loadAll();
});

// Export for use in other scripts
window.ComponentLoader = ComponentLoader;
