/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/', // Caminho inicial
        destination: '/cadastro', // Caminho para onde deseja redirecionar
        permanent: false, // Use `true` para redirecionamento 301 permanente
      },
    ];
  },
  images: {
    domains: ['upload.wikimedia.org'], // Domínios permitidos para imagens
  },
};

export default nextConfig;
