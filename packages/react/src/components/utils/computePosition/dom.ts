import { ownerWindow, ownerDocument, __TEST__ } from '@nex-ui/utils'
import { isWebKit } from './utils'
import type { Rect } from './types'

export function isHTMLElement(
  element: Element | Window,
): element is HTMLElement {
  if (typeof window === 'undefined') {
    return false
  }

  return element instanceof HTMLElement
}

export function isSVGElement(element: Element): element is SVGElement {
  if (typeof window === 'undefined') {
    return false
  }

  return element instanceof SVGElement
}

export function isElement(node: unknown): node is Element {
  return node instanceof Element
}

export function getElementName(element: Element | Window): string {
  if (isElement(element)) {
    return element.nodeName.toLowerCase()
  }

  return '#document'
}

const rootElements = new Set(['html', 'body', '#document'])

export function isRootElement(element: Element): boolean {
  return rootElements.has(getElementName(element))
}

const transformProperties = [
  'transform',
  'translate',
  'scale',
  'rotate',
  'perspective',
]

const willChangeValues = [
  'transform',
  'translate',
  'scale',
  'rotate',
  'perspective',
  'filter',
]
const containValues = ['paint', 'layout', 'strict', 'content']

export function isContainingBlock(element: Element): boolean {
  const webkit = isWebKit()

  const win = ownerWindow(element)

  const css = win.getComputedStyle(element)

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  // https://drafts.csswg.org/css-transforms-2/#individual-transforms
  return (
    transformProperties.some((value) =>
      css[value as keyof CSSStyleDeclaration]
        ? css[value as keyof CSSStyleDeclaration] !== 'none'
        : false,
    ) ||
    (css.containerType ? css.containerType !== 'normal' : false) ||
    (!webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false)) ||
    (!webkit && (css.filter ? css.filter !== 'none' : false)) ||
    willChangeValues.some((value) => (css.willChange || '').includes(value)) ||
    containValues.some((value) => (css.contain || '').includes(value))
  )
}

const tableElements = new Set(['table', 'td', 'th'])

export function isTableElement(element: Element): boolean {
  return tableElements.has(getElementName(element))
}

export function isStaticPositioned(element: Element): boolean {
  const win = ownerWindow(element)

  return win.getComputedStyle(element).position === 'static'
}

function getElementScroll(element: Element | Window) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    }
  }

  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY,
  }
}

const invalidOverflowDisplayValues = new Set(['inline', 'contents'])
export function isOverflowElement(element: Element): boolean {
  const win = ownerWindow(element)
  const overflowRegex = /(auto|scroll|overlay|hidden|clip)/

  const styles = win.getComputedStyle(element)

  return (
    overflowRegex.test(styles.overflow + styles.overflowY + styles.overflowX) &&
    !invalidOverflowDisplayValues.has(styles.display)
  )
}

export function toClientRect(rect: {
  x: number
  y: number
  width: number
  height: number
}) {
  return {
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height,
    left: rect.x,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y,
  }
}

export function getDimensions(element: Element) {
  const css = ownerWindow(element).getComputedStyle(element)

  let width = parseFloat(css.width) || 0
  let height = parseFloat(css.height) || 0

  const hasOffset = isHTMLElement(element)
  const offsetWidth = hasOffset ? element.offsetWidth : width
  const offsetHeight = hasOffset ? element.offsetHeight : height

  const shouldFallback =
    Math.round(width) !== offsetWidth || Math.round(height) !== offsetHeight

  if (shouldFallback) {
    width = offsetWidth
    height = offsetHeight
  }

  return {
    width,
    height,
  }
}

// const getBoundingClientRect = (element: Element) => {
//   const clientRect = element.getBoundingClientRect()

//   return toClientRect({
//     width: clientRect.width,
//     height: clientRect.height,
//     x: clientRect.left,
//     y: clientRect.top,
//   })
// }

export function getRectRelativeToViewport(
  elementRect: Rect,
  offsetParent: Element | Window,
): Rect {
  let scroll = { scrollLeft: 0, scrollTop: 0 }
  let documentElement: HTMLElement

  if ((offsetParent as Window).document) {
    ;({ documentElement } = (offsetParent as Window).document)
  } else {
    ;({ documentElement } = ownerDocument(offsetParent as Element))
  }

  const offset = { x: 0, y: 0 }

  if (
    getElementName(offsetParent) !== 'body' ||
    isOverflowElement(documentElement)
  ) {
    scroll = getElementScroll(offsetParent)
  }

  if (isHTMLElement(offsetParent)) {
    ;({ x: offset.x, y: offset.y } = offsetParent.getBoundingClientRect())
  } else if (!isStaticPositioned(documentElement)) {
    // Handle element positioned within the html element.
    ;({ x: offset.x, y: offset.y } = documentElement.getBoundingClientRect())

    // The scrollbar should be on the viewport, not on the HTML element.
    scroll.scrollLeft -= scroll.scrollLeft
    scroll.scrollTop -= scroll.scrollTop
  }

  return {
    x: elementRect.x - scroll.scrollLeft + offset.x,
    y: elementRect.y - scroll.scrollTop + offset.y,
    width: elementRect.width,
    height: elementRect.height,
  }
}

export function getRectRelativeToOffsetParent(
  element: Element,
  offsetParent: Element | Window,
): Rect {
  const { documentElement } = ownerDocument(element)
  const elementRect = element.getBoundingClientRect()

  let scroll = { scrollLeft: 0, scrollTop: 0 }

  const offset = { x: 0, y: 0 }

  // https://drafts.csswg.org/css2/#overflow
  // Only when both <body> and <html> have their overflow set to auto will <body> have a scrollbar.
  if (
    getElementName(offsetParent) !== 'body' ||
    isOverflowElement(documentElement)
  ) {
    scroll = getElementScroll(offsetParent)
  }

  if (isHTMLElement(offsetParent)) {
    ;({ x: offset.x, y: offset.y } = offsetParent.getBoundingClientRect())
  } else if (!isStaticPositioned(documentElement)) {
    // Handle element positioned within the html element.
    ;({ x: offset.x, y: offset.y } = documentElement.getBoundingClientRect())

    // The scrollbar should be on the viewport, not on the HTML element.
    scroll.scrollLeft -= scroll.scrollLeft
    scroll.scrollTop -= scroll.scrollTop
  }

  return {
    x: elementRect.x + scroll.scrollLeft - offset.x,
    y: elementRect.y + scroll.scrollTop - offset.y,
    width: elementRect.width,
    height: elementRect.height,
  }
}
