import { ownerWindow } from '@nex-ui/utils'
import { isHTMLElement, isOverflowElement, getElementName } from './dom'

export function getOverflowAncestors(
  element: Element,
): (HTMLElement | Window)[] {
  const scrollableAncestors: (HTMLElement | Window)[] = []
  const win = ownerWindow(element)

  let ancestor = getNearestOverflowAncestor(element)
  let body: HTMLElement | null = null

  while (ancestor) {
    const elementName = getElementName(ancestor)
    if (elementName === 'body') {
      body = ancestor as HTMLElement
    } else if (elementName === 'html' && body) {
      scrollableAncestors.push(body)
    } else {
      scrollableAncestors.push(ancestor)
    }
    if (win === ancestor) break
    ancestor = getNearestOverflowAncestor(ancestor as HTMLElement)
  }

  return scrollableAncestors
}

function getNearestOverflowAncestor(element: Element): HTMLElement | Window {
  const { parentElement } = element

  if (!parentElement) {
    return ownerWindow(element)
  }

  if (isHTMLElement(parentElement) && isOverflowElement(parentElement)) {
    return parentElement
  }
  return getNearestOverflowAncestor(parentElement)
}
