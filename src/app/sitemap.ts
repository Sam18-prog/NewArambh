import type { MetadataRoute } from 'next';
import destinationsData from '@/data/destinations.json';

const destinations = destinationsData as Array<{ id: string }>;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://newarambh.netlify.app';

  const destinationRoutes = destinations.map((dest) => ({
    url: `${baseUrl}/explore/${dest.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const experienceRoutes = destinations.map((dest) => ({
    url: `${baseUrl}/explore/${dest.id}/experience`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...destinationRoutes,
    ...experienceRoutes,
    {
      url: `${baseUrl}/licenses`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];
}
