/**
 * Client module to add FontAwesome icons to footer social links
 * This runs on all pages after the DOM is ready and on route updates
 */

export default function footerIconsClientModule() {
  // Function to add icons to footer links
  const addIconsToFooter = () => {
    const footerLinks = document.querySelectorAll('.footer__link-item');
    footerLinks.forEach((link) => {
      const linkElement = link as HTMLElement;
      
      // Skip if icon already exists
      if (linkElement.querySelector('i.fa-brands')) {
        return;
      }
      
      // Get href for reliable matching
      const href = linkElement.getAttribute('href') || '';
      
      // Match by href
      let iconClass = '';
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
        // Insert before the first child (text node or SVG)
        linkElement.insertBefore(iconElement, linkElement.firstChild);
      }
    });
  };

  // Run when DOM is ready
  const runAddIcons = () => {
    // Try multiple times to ensure FontAwesome is loaded
    setTimeout(addIconsToFooter, 100);
    setTimeout(addIconsToFooter, 500);
    setTimeout(addIconsToFooter, 1000);
    setTimeout(addIconsToFooter, 2000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAddIcons);
  } else {
    // DOM already ready
    runAddIcons();
  }

  // Also listen for navigation events (for SPA navigation)
  window.addEventListener('load', runAddIcons);
  
  // Listen for Docusaurus route updates
  if (typeof window !== 'undefined') {
    document.addEventListener('docusaurus:routeUpdate', () => {
      setTimeout(addIconsToFooter, 100);
      setTimeout(addIconsToFooter, 500);
    });
  }
}

