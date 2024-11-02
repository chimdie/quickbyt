export const serializeString = (str: string): string => {
  if (!str) return '';
  return str.replace(/"/g, '').replace(/\s+/g, '');
};
