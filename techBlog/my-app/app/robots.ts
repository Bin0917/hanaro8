import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/sign/', '/Regist/', '/api/', '/userList/', '/write/edit/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/terms/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
