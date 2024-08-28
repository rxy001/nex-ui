export function generateUtilityClass(
  componentName: string,
  slot: string,
): string {
  return slot === 'root' ? componentName : `${componentName}-${slot}`
}
