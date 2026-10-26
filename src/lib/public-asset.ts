/** Match public image paths to the Next static export subpath. */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
export function publicAsset(path: string): string {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}
