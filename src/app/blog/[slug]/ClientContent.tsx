'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

export const ArticleContent = ({
 mdxSource,
}: { mdxSource: MDXRemoteSerializeResult }) => {
 return <MDXRemote {...mdxSource} />;
};
