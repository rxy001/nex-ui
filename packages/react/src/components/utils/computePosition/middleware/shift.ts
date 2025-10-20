import { clamp } from '@nex-ui/utils'
import { detectOverflow } from '../detectOverflow'
import {
  getSideAxis,
  getOppositeAxis,
  getAxisLength,
  getAlignment,
} from '../utils'
import type { MiddlewareState, Middleware } from '../types'

export const shift = (): Middleware => {
  return {
    name: 'shift',
    fn: (state: MiddlewareState) => {
      const { placement, rects } = state

      const overflow = detectOverflow(state)
      const mainAxis = getSideAxis(placement)
      const alignment = getAlignment(placement)
      const crossAxis = getOppositeAxis(mainAxis)
      const crossAxisLength = getAxisLength(crossAxis)
      const minSide = mainAxis === 'y' ? 'left' : 'top'
      const maxSide = mainAxis === 'y' ? 'right' : 'bottom'
      const mainAxisCoord = rects.popper[mainAxis]

      let positiveMaxOverflow: number
      let negativeMaxOverflow: number

      switch (alignment) {
        case 'start':
          positiveMaxOverflow = rects.reference[crossAxisLength]
          negativeMaxOverflow = rects.popper[crossAxisLength]
          break
        case 'end':
          positiveMaxOverflow = rects.popper[crossAxisLength]
          negativeMaxOverflow = rects.reference[crossAxisLength]
          break
        default:
          positiveMaxOverflow =
            rects.reference[crossAxisLength] +
            rects.reference[crossAxis] -
            rects.popper[crossAxis]
          negativeMaxOverflow = positiveMaxOverflow
      }

      // When moving in the positive cross-axis direction, offset is determined by the minimum boundary
      // When moving in the negative cross-axis direction, offset is determined by the maximum boundary
      const crossAxisCoord = clamp(
        rects.popper[crossAxis],
        rects.popper[crossAxis] +
          Math.min(overflow[minSide], positiveMaxOverflow),
        rects.popper[crossAxis] -
          Math.min(overflow[maxSide], negativeMaxOverflow),
      )

      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord,
        data: {
          [mainAxis]: mainAxisCoord - rects.popper[mainAxis],
          [crossAxis]: crossAxisCoord - rects.popper[crossAxis],
        },
      }
    },
  }
}
