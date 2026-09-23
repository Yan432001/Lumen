export function normalizeColor(value) {
  if (typeof value !== 'string') {
    throw new Error('Color must be a string');
  }

  const color = value.trim();

  if (/^#[0-9a-fA-F]{3}$/.test(color)) {
    const [, r, g, b] = color;
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }

  if (/^#[0-9a-fA-F]{6}$/.test(color)) {
    return color.toUpperCase();
  }

  throw new Error('Invalid HEX color');
}
