import { getRectRelativeToOffsetParent, getDimensions } from './dom'
import { getOffsetParent } from './getOffsetParent'
import type { Rect } from './types'

export const getElementRects = (
  reference: Element,
  popper: Element,
): { popper: Rect; reference: Rect } => {
  const popperRect = getDimensions(popper)
  const offsetParent = getOffsetParent(popper)

  const referenceRect = getRectRelativeToOffsetParent(reference, offsetParent)

  return {
    popper: {
      width: popperRect.width,
      height: popperRect.height,
      x: 0,
      y: 0,
    },
    reference: {
      ...referenceRect,
    },
  }
}
