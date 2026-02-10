import React, {type ReactNode} from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import type BlogPostPageType from '@theme/BlogPostPage';
import type {WrapperProps} from '@docusaurus/types';
import SubscriptionForm from '@site/src/components/SubscriptionForm';

type Props = WrapperProps<typeof BlogPostPageType>;

export default function BlogPostPageWrapper(props: Props): ReactNode {
  return (
    <>
      <BlogPostPage {...props} />
      <div className="blog-post-subscription">
        <SubscriptionForm />
      </div>
    </>
  );
}
