/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  // GitHub Pagesでデプロイする場合のみbasePathを設定
  ...(isGitHubPages
    ? {
        basePath: '/baselink-mbti',
        assetPrefix: '/baselink-mbti/',
      }
    : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;

