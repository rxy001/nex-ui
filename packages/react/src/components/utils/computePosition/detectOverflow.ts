import { ownerWindow } from '@nex-ui/utils'
import { isHTMLElement, getRectRelativeToViewport, toClientRect } from './dom'
import { getOffsetParent } from './getOffsetParent'
import { getOverflowAncestors } from './getOverflowAncestors'
import type { MiddlewareState } from './types'

export const detectOverflow = (state: MiddlewareState) => {
  const { elements, rects } = state
  const win = ownerWindow(elements.popper)

  const clippingAncestors = getOverflowAncestors(elements.popper).filter(
    isHTMLElement,
  )

  const clippingAncestorRects = clippingAncestors.map((el) =>
    toClientRect(el.getBoundingClientRect()),
  )

  const { visualViewport } = win

  if (visualViewport) {
    clippingAncestorRects.push(
      toClientRect({
        x: visualViewport.offsetLeft,
        y: visualViewport.offsetTop,
        width: visualViewport.width,
        height: visualViewport.height,
      }),
    )
  }

  // Compute the actually visible clipping region of the element under the combined effect
  // of all clipping ancestors by taking intersections sequentially.
  const clippingRect = clippingAncestorRects.reduce(
    (accRect, rect) => {
      accRect.top = Math.max(rect.top, accRect.top)
      accRect.right = Math.min(rect.right, accRect.right)
      accRect.bottom = Math.min(rect.bottom, accRect.bottom)
      accRect.left = Math.max(rect.left, accRect.left)
      return accRect
    },
    { top: -Infinity, right: Infinity, bottom: Infinity, left: -Infinity },
  )

  const clippingClientRect = toClientRect({
    x: clippingRect.left,
    y: clippingRect.top,
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
  })

  const elementClientRect = toClientRect(
    getRectRelativeToViewport(rects.popper, getOffsetParent(elements.popper)),
  )

  // The overflow situation of the element in the four directions (top, bottom, left, right)
  // relative to the clipping boundary.
  return {
    top: clippingClientRect.top - elementClientRect.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom,
    left: clippingClientRect.left - elementClientRect.left,
    right: elementClientRect.right - clippingClientRect.right,
  }
}
