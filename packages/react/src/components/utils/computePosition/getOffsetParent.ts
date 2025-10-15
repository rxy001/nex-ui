import { ownerWindow } from '@nex-ui/utils'
import {
  isHTMLElement,
  isElement,
  isStaticPositioned,
  isTableElement,
  isRootElement,
  isContainingBlock,
  isSVGElement,
} from './dom'

function _getOffsetParent(element: Element): Element | null {
  // istanbul ignore if
  if (!isHTMLElement(element)) {
    return null
  }
  return element.offsetParent
}

/**
 * A positioned ancestor might be:
 *  - a containing block for absolutely-positioned elements
 *  - an element with a different effective zoom value (that is, the product of all zoom scales of its parents) from this element
 *  - td, th, table in case the element itself is static positioned.
 *
 * https://drafts.csswg.org/cssom-view/#dom-htmlelement-offsetparent
 */
export const getOffsetParent = (element: Element) => {
  const win = ownerWindow(element)

  if (isSVGElement(element)) {
    // SVG element hasn't offsetParent, find the nearest Element
    let svgOffsetParent = element.parentElement
    while (svgOffsetParent && !isRootElement(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent
      }
      svgOffsetParent = svgOffsetParent.parentElement
    }
    return win
  }

  let offsetParent = _getOffsetParent(element)

  while (
    offsetParent &&
    isTableElement(offsetParent) &&
    isStaticPositioned(offsetParent)
  ) {
    offsetParent = _getOffsetParent(offsetParent)
  }

  if (
    offsetParent &&
    isRootElement(offsetParent) &&
    isStaticPositioned(offsetParent) &&
    !isContainingBlock(offsetParent)
  ) {
    return win
  }

  return offsetParent || win
}
