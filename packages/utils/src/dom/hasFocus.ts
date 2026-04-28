import { ownerDocument } from './ownerDocument'

export function hasFocus(element: Element): boolean {
  const active = ownerDocument(element).activeElement
  if (!active) return false
  if (active === element) return true
  const activeDescendant = active.getAttribute('aria-activedescendant')
  if (!activeDescendant) return false
  return activeDescendant === element.id
}
