'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

export const ArticleContent = ({
 mdxSource,
}: { mdxSource: MDXRemoteSerializeResult }) => {
 return <MDXRemote {...mdxSource} />;
};
