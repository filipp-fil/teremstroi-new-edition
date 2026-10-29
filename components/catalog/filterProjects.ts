import type { Project, ProjectType } from "@/content/projects";

export type CatalogSearchParams = {
  priceMin?: string;
  priceMax?: string;
  areaMin?: string;
  areaMax?: string;
  material?: string;
  sort?: string;
};

/** Серверная фильтрация и сортировка каталога по параметрам URL */
export function filterProjects(
  items: Project[],
  type: ProjectType,
  params: CatalogSearchParams
): Project[] {
  const num = (v?: string) => (v ? Number(v) : undefined);

  let result = items.filter((p) => p.type === type);

  const priceMin = num(params.priceMin);
  const priceMax = num(params.priceMax);
  const areaMin = num(params.areaMin);
  const areaMax = num(params.areaMax);

  if (priceMin !== undefined) result = result.filter((p) => p.price >= priceMin);
  if (priceMax !== undefined) result = result.filter((p) => p.price <= priceMax);
  if (areaMin !== undefined) result = result.filter((p) => p.area >= areaMin);
  if (areaMax !== undefined) result = result.filter((p) => p.area <= areaMax);
  if (params.material === "karkas" || params.material === "brus")
    result = result.filter((p) => p.material === params.material);

  // Сортировка: без параметра sort — исходный порядок каталога (как на старом сайте)
  switch (params.sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "area-asc":
      result = [...result].sort((a, b) => a.area - b.area);
      break;
    case "area-desc":
      result = [...result].sort((a, b) => b.area - a.area);
      break;
    default:
      break;
  }

  return result;
}
