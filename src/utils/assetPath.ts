declare global {
  interface Window {
    __PAPIES_ASSET_PREFIX__?: string;
  }
}

/**
 * Resolves asset paths so they work seamlessly across:
 * 1. Vite Dev Server & Cloud Run root (`/`)
 * 2. Subpath deployments (`/repo-name/`)
 * 3. Raw static servers like VS Code Live Server where assets reside in `./public/assets/...`
 */
export function resolveAssetPath(src: string): string {
  if (!src) return src;
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  const clean = src.replace(/^\.?\//, '');
  const prefix =
    typeof window !== 'undefined' && window.__PAPIES_ASSET_PREFIX__
      ? window.__PAPIES_ASSET_PREFIX__
      : './';
  return `${prefix}${clean}`;
}
