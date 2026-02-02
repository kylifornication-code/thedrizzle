import React, {useEffect} from 'react';
import Footer from '@theme-original/Footer';
import type FooterType from '@theme/Footer';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof FooterType>;

// Map social platform names to FontAwesome icon classes
const getSocialIcon = (label: string): string => {
  const iconMap: Record<string, string> = {
    'GitHub': 'fa-brands fa-github',
    'GitLab': 'fa-brands fa-gitlab',
    'LinkedIn': 'fa-brands fa-linkedin',
    'Instagram': 'fa-brands fa-instagram',
    'YouTube': 'fa-brands fa-youtube',
  };
  return iconMap[label] || '';
};

export default function FooterWrapper(props: Props): JSX.Element {
  useEffect(() => {
    // Function to add icons to footer links
    const addIconsToFooter = () => {
      const footerLinks = document.querySelectorAll('.footer__link-item');
      let iconsAdded = 0;
      
      footerLinks.forEach((link) => {
        const linkElement = link as HTMLElement;
        
        // Skip if icon already exists
        if (linkElement.querySelector('i.fa-brands')) {
          return;
        }
        
        // Get href first for more reliable matching
        const href = linkElement.getAttribute('href') || '';
        
        // Match by href (more reliable than text)
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
        
        // Fallback: try to match by link text if href didn't match
        if (!iconClass) {
          // Get text content, removing SVG icons that Docusaurus adds
          const textNodes = Array.from(linkElement.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent?.trim())
            .join(' ')
            .trim();
          iconClass = getSocialIcon(textNodes);
        }
        
        // Add icon if we have a match
        if (iconClass) {
          const iconElement = document.createElement('i');
          iconElement.className = iconClass;
          iconElement.setAttribute('aria-hidden', 'true');
          // Insert before the first child (text node or SVG)
          linkElement.insertBefore(iconElement, linkElement.firstChild);
          iconsAdded++;
        }
      });
      
      return iconsAdded;
    };

    // Try multiple times to ensure it works
    const timeouts: NodeJS.Timeout[] = [];
    
    // Immediate attempt
    timeouts.push(setTimeout(() => {
      const added = addIconsToFooter();
      if (added === 0) {
        // If no icons added, try again after delays
        timeouts.push(setTimeout(addIconsToFooter, 500));
        timeouts.push(setTimeout(addIconsToFooter, 1000));
        timeouts.push(setTimeout(addIconsToFooter, 2000));
      }
    }, 50));
    
    // Also listen for Docusaurus route updates
    const handleRouteUpdate = () => {
      setTimeout(addIconsToFooter, 100);
      setTimeout(addIconsToFooter, 500);
    };
    
    document.addEventListener('docusaurus:routeUpdate', handleRouteUpdate);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      document.removeEventListener('docusaurus:routeUpdate', handleRouteUpdate);
    };
  }, []);

  return (
    <>
      <Footer {...props} />
    </>
  );
}

