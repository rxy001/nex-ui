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

      // 沿交叉轴正方向移动时，偏移量由 最小值边界 决定
      // 沿交叉轴负方向移动时，偏移量由 最大值边界 决定
      const crossAxisCoord = clamp(
        rects.popper[crossAxis],
        rects.popper[crossAxis] +
          Math.min(overflow[minSide], positiveMaxOverflow),
        rects.popper[crossAxis] -
          Math.min(overflow[maxSide], negativeMaxOverflow),
      )

      // console.log(crossAxisCoord, rects.popper[crossAxis])

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
