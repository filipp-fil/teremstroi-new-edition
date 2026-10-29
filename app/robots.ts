import type { MetadataRoute } from "next";

/** robots.txt: закрываем админку от индексации */
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://teremdomstroi.ru";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
