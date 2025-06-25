// Header loader function with debug logging
function loadHeader() {
    console.log('Loading header...');
    
    fetch('header.html')
        .then(response => {
            console.log('Fetch response:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            console.log('Header data loaded:', data.substring(0, 100) + '...');
            
            // Extract just the header content from the loaded HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const headerContent = doc.querySelector('header');
            
            console.log('Header content found:', headerContent);
            
            // Insert the header into the current page
            const headerPlaceholder = document.getElementById('header-placeholder');
            console.log('Header placeholder found:', headerPlaceholder);
            
            if (headerPlaceholder && headerContent) {
                headerPlaceholder.innerHTML = headerContent.outerHTML;
                console.log('Header inserted successfully');
                
                // Set active navigation based on current page
                setActiveNavigation();
            } else {
                console.error('Missing header placeholder or header content');
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
}

// Function to set active navigation item
function setActiveNavigation() {
    console.log('Setting active navigation...');
    const currentPage = document.body.getAttribute('data-page');
    console.log('Current page:', currentPage);
    
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Nav links found:', navLinks.length);
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
            console.log('Set active class on:', link);
        }
    });
}

// Load header when DOM is ready
console.log('Script loaded, waiting for DOM...');
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, calling loadHeader()');
    loadHeader();
});