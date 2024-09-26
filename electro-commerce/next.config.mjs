// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
    NEXT_URL_BACKEND: process.env.NEXT_URL_BACKEND,
  },

  async rewrites() {
    const backendUrl = process.env.NEXT_URL_BACKEND;

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`, // URL del backend para la API
      },
      {
        source: "/images/:path*", // Específica para las imágenes o archivos estáticos
        destination: `${backendUrl}/:path*`, // URL del backend para imágenes
      },
    ];
  },
};

export default nextConfig;
