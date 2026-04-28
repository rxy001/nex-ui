export function isVisible(element: Element): boolean {
  if (typeof element.checkVisibility === 'function') {
    return element.checkVisibility()
  }
  const el = element as HTMLElement
  return (
    el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0
  )
}
