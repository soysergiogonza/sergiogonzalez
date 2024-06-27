'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import React from 'react';

const ClientContent = ({
 mdxSource,
}: { mdxSource: MDXRemoteSerializeResult }) => {
 return <MDXRemote {...mdxSource} />;
};

export default ClientContent;
