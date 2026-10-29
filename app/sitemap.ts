import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { works } from "@/content/works";

/** Динамический sitemap.xml: статические страницы + все проекты и работы */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://teremdomstroi.ru";

  const staticPages: MetadataRoute.Sitemap = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/projects/houses", priority: 0.9 },
    { path: "/projects/baths", priority: 0.9 },
    { path: "/works", priority: 0.8 },
    { path: "/reviews", priority: 0.7 },
    { path: "/contacts", priority: 0.8 },
  ].map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const workPages: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${base}/works/${w.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...workPages];
}
