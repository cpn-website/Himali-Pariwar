import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://himalipariwar.org"; // Production URL
  const locales = ["en", "ne"];
  const paths = [
    "",
    "/about",
    "/about/governance",
    "/heritage",
    "/programs",
    "/programs/culture",
    "/programs/health",
    "/programs/athletics",
    "/events",
    "/news",
    "/gallery",
    "/volunteer",
    "/contact",
  ];

  const sitemaps: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    for (const locale of locales) {
      sitemaps.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1.0 : path.startsWith("/programs") || path === "/heritage" ? 0.8 : 0.5,
      });
    }
  }

  return sitemaps;
}
