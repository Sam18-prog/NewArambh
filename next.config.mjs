/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/explore/heritage-courtyard',
        destination: '/explore/taj-mahal',
        permanent: true,
      },
      {
        source: '/explore/heritage-courtyard/experience',
        destination: '/explore/taj-mahal/experience',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
