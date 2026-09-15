import menuJson from "./menu.json";
import type { MenuData } from "./types";

export const menuData = menuJson as MenuData;
export const brand = menuData.brand;
export const categories = menuData.categories;

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}

export function getFoodById(id: string) {
  for (const category of categories) {
    const food = category.items.find((item) => item.id === id);
    if (food) return { food, category };
  }
  return null;
}
