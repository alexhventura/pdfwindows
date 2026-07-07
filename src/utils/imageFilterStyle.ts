/** Shared CSS filter string — matches `applyImageFilters` in converterEngine. */
export function buildImageFilterCss(filters: {
  brightness: number;
  contrast: number;
  grayscale: boolean;
}): string {
  const parts = [
    `brightness(${filters.brightness}%)`,
    `contrast(${filters.contrast}%)`,
  ];
  if (filters.grayscale) parts.push('grayscale(100%)');
  return parts.join(' ');
}
