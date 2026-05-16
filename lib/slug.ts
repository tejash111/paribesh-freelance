export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function createPostSlug(title: string) {
  return `${slugify(title)}-${Date.now()}`;
}
