// Footer loader function
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            // Extract just the footer content from the loaded HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const footerContent = doc.querySelector('footer');
            
            // Insert the footer into the current page
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder && footerContent) {
                footerPlaceholder.innerHTML = footerContent.outerHTML;
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Load footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadFooter);