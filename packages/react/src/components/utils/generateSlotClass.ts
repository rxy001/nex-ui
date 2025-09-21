export function generateSlotClass(
  componentName: string,
  slotClass: string,
): string {
  return `${componentName}-${slotClass}`
}
