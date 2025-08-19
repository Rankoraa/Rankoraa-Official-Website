/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    generateRobotsTxt: true, // (optional) Generate robots.txt
    generateIndexSitemap: true,
    sitemapSize: 5000,
    exclude: ['/admin/*', '/internal/*'], // Optional: exclude internal routes
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
        {
          userAgent: 'Googlebot',
          allow: '/',
        },
      ],
    },
  };
  