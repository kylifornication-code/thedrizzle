/**
 * Global script to add FontAwesome icons to footer social links
 * This runs on all pages after the DOM is ready
 */
(function() {
  function addIconsToFooter() {
    const footerLinks = document.querySelectorAll('.footer__link-item');
    footerLinks.forEach(function(link) {
      // Skip if icon already exists
      if (link.querySelector('i.fa-brands')) {
        return;
      }
      
      const href = link.getAttribute('href') || '';
      let iconClass = '';
      
      // Match by href
      if (href.includes('github.com')) {
        iconClass = 'fa-brands fa-github';
      } else if (href.includes('gitlab.com')) {
        iconClass = 'fa-brands fa-gitlab';
      } else if (href.includes('linkedin.com')) {
        iconClass = 'fa-brands fa-linkedin';
      } else if (href.includes('instagram.com')) {
        iconClass = 'fa-brands fa-instagram';
      } else if (href.includes('youtube.com')) {
        iconClass = 'fa-brands fa-youtube';
      }
      
      // Add icon if we have a match
      if (iconClass) {
        const iconElement = document.createElement('i');
        iconElement.className = iconClass;
        iconElement.setAttribute('aria-hidden', 'true');
        link.insertBefore(iconElement, link.firstChild);
      }
    });
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(addIconsToFooter, 100);
      setTimeout(addIconsToFooter, 500);
      setTimeout(addIconsToFooter, 1000);
      setTimeout(addIconsToFooter, 2000);
    });
  } else {
    // DOM already ready
    setTimeout(addIconsToFooter, 100);
    setTimeout(addIconsToFooter, 500);
    setTimeout(addIconsToFooter, 1000);
    setTimeout(addIconsToFooter, 2000);
  }
  
  // Listen for Docusaurus route updates (SPA navigation)
  document.addEventListener('docusaurus:routeUpdate', function() {
    setTimeout(addIconsToFooter, 100);
    setTimeout(addIconsToFooter, 500);
  });
  
  // Also run on window load
  window.addEventListener('load', function() {
    setTimeout(addIconsToFooter, 100);
    setTimeout(addIconsToFooter, 1000);
  });
})();

