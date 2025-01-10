export function generateUtilityClass(
  componentName: string,
  slotClass: string,
): string {
  return `${componentName}-${slotClass}`
}
