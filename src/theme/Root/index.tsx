import React, {useEffect} from 'react';
import Root from '@theme-original/Root';
import type RootType from '@theme/Root';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof RootType>;

export default function RootWrapper(props: Props): JSX.Element {
  useEffect(() => {
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
          linkElement.insertBefore(iconElement, linkElement.firstChild);
        }
      });
    };

    // Run immediately and on various events
    const runAddIcons = () => {
      setTimeout(addIconsToFooter, 100);
      setTimeout(addIconsToFooter, 500);
      setTimeout(addIconsToFooter, 1000);
      setTimeout(addIconsToFooter, 2000);
    };

    // Run when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runAddIcons);
    } else {
      runAddIcons();
    }

    // Listen for Docusaurus route updates
    const handleRouteUpdate = () => {
      setTimeout(addIconsToFooter, 100);
      setTimeout(addIconsToFooter, 500);
    };
    
    document.addEventListener('docusaurus:routeUpdate', handleRouteUpdate);

    return () => {
      document.removeEventListener('docusaurus:routeUpdate', handleRouteUpdate);
    };
  }, []);

  return (
    <>
      <Root {...props} />
    </>
  );
}

