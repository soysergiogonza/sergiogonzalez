/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    domains: [
      // Agrega aquí los dominios de tus imágenes si las tienes en CDN
    ],
  },
};

export default nextConfig;
