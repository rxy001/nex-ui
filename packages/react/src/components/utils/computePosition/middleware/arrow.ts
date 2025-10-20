import { clamp, ownerWindow } from '@nex-ui/utils'
import {
  getAlignmentAxis,
  getAlignment,
  getAxisLength,
  getSideAxis,
} from '../utils'
import type { ArrowOptions, MiddlewareState, Middleware } from '../types'

export const arrow = (options: ArrowOptions): Middleware => {
  const { element } = options

  return {
    name: 'arrow',
    fn: (state: MiddlewareState) => {
      if (!element) {
        return {}
      }

      const { placement, rects } = state
      const mainAxis = getSideAxis(placement)
      const crossAxis = getAlignmentAxis(placement)
      const crossAxisLength = getAxisLength(crossAxis)
      const mainAxisLength = getAxisLength(mainAxis)
      const alignment = getAlignment(placement)
      const arrowRect = element.getBoundingClientRect()
      const arrowHalfSize = arrowRect[mainAxisLength] / 2
      const min = 0
      const max = rects.popper[crossAxisLength] - arrowRect[crossAxisLength]
      const popperBorderWidth =
        parseFloat(
          ownerWindow(element).getComputedStyle(element).borderWidth,
        ) || 0

      // The position of the arrow is calculated relative to the popper.
      let mainAxisPosition = -arrowHalfSize - popperBorderWidth

      if (rects.popper[mainAxis] < rects.reference[mainAxis]) {
        mainAxisPosition += rects.popper[mainAxisLength]
      }

      let crossAxisPosition =
        rects.reference[crossAxis] - rects.popper[crossAxis] - arrowHalfSize

      if (!alignment) {
        crossAxisPosition += rects.reference[crossAxisLength] / 2
      } else if (alignment === 'start') {
        crossAxisPosition += rects.reference[crossAxisLength] / 4
      } else if (alignment === 'end') {
        crossAxisPosition += (rects.reference[crossAxisLength] / 4) * 3
      }

      return {
        data: {
          [mainAxis]: mainAxisPosition,
          [crossAxis]: clamp(crossAxisPosition, min, max),
          minOffset: arrowHalfSize,
        },
      }
    },
  }
}
