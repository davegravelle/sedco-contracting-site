import type { NavItem } from "./VerticalNav.astro";
// Helper function to determine if an item is active
const isActive = (activePath: string, slug: string) => {
  if (!slug || !activePath) return false;
  return activePath === slug || activePath.includes(`${slug}`);
};

// Helper function to determine if an item should be expanded
const shouldExpand = (
  expandible: boolean,
  activePath: string,
  item: NavItem,
) => {
  // If expandible is false, always show children
  if (!expandible) return true;

  // Otherwise follow normal expansion rules
  if (item.isExpanded) return true;
  if (!item.children) return false;

  // Auto-expand if a child is active
  return item.children.some(
    (child) => child.href && isActive(activePath, child.href),
  );
};

export { isActive, shouldExpand };

export function buildVertNav(items) {
  return items.map((servicesItem) => ({
    label: servicesItem.fields.name,
    slug: servicesItem.fields.slug,
    href: `/${servicesItem.fields.slug}`,
    children: servicesItem.fields?.servicesOffered?.map((s) => ({
      label: s.fields.name,
      href: `/${servicesItem.fields.slug}/portfolio/${s.fields.slug}`,
      slug: s.fields.slug,
    })),
  }));
}
