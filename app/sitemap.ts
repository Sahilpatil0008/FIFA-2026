import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fabulous-daffodil-94aabb.netlify.app";
  const lastModified = new Date();

  return [
    { url: base, lastModified },
    { url: `${base}/schedule`, lastModified },
    { url: `${base}/groups`, lastModified },
    { url: `${base}/teams`, lastModified },
    { url: `${base}/players`, lastModified },
    { url: `${base}/stats`, lastModified },
    { url: `${base}/venues`, lastModified },
  ];
}
