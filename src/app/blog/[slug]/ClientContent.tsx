"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

export const ArticleContent = ({
	mdxSource,
}: { mdxSource: MDXRemoteSerializeResult }) => {
	return <MDXRemote {...mdxSource} />;
};
