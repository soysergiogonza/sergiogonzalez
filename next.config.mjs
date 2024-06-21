/** @type {import('next').NextConfig} */
// biome-ignore lint/style/useNamingConvention: <explanation>
import withMDX from '@next/mdx';

const nextConfig = {
 pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withMDX({
 extension: /\.mdx?$/,
})(nextConfig);
