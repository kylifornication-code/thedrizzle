import React from 'react';
import Root from '@theme-original/Root';
import Head from '@docusaurus/Head';
import type RootType from '@theme/Root';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof RootType>;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://thedrizzle.dev/#website',
      url: 'https://thedrizzle.dev',
      name: 'The Drizzle',
      description: 'Personal Stories from the PNW',
      publisher: {'@id': 'https://thedrizzle.dev/#person'},
    },
    {
      '@type': 'Person',
      '@id': 'https://thedrizzle.dev/#person',
      name: 'KJ',
      url: 'https://thedrizzle.dev',
      jobTitle: 'Sr Manager, Security Engineering Partnerships',
      worksFor: {
        '@type': 'Organization',
        name: 'Disney',
      },
      sameAs: [
        'https://github.com/kylifornication-code',
        'https://gitlab.com/kylifornication',
        'https://www.linkedin.com/in/kylejamescwu/',
        'https://www.instagram.com/kylifornication/',
        'https://www.youtube.com/@kylifornication11',
      ],
    },
  ],
};

export default function RootWrapper(props: Props): JSX.Element {
  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="text/javascript" async src="https://subscribe-forms.beehiiv.com/attribution.js"></script>
      </Head>
      <Root {...props} />
    </>
  );
}
