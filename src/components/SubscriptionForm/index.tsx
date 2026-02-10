import React from 'react';
import styles from './styles.module.css';

/**
 * Beehiiv subscription form component.
 * 
 * The Beehiiv attribution script (loaded in Root) will automatically detect
 * and enhance forms with the data-beehiiv-subscribe attribute.
 * 
 * Note: You may need to configure your newsletter ID or embed code from Beehiiv.
 * Check your Beehiiv dashboard for the specific embed code or data attributes needed.
 */
export default function SubscriptionForm(): JSX.Element {
  return (
    <div className={styles.subscriptionContainer}>
      <form
        className={styles.subscriptionForm}
        data-beehiiv-subscribe="true"
        data-newsletter="your-newsletter-id"
        data-text-prompt="Enter your email"
        data-button-text="Subscribe"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          aria-label="Email address"
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

