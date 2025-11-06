import { getSideAxis, getSide, getAlignment, getAlignmentAxis } from '../utils'
import type { OffsetOptions, MiddlewareState, Middleware } from '../types'

export const offset = (options: OffsetOptions = 5): Middleware => {
  const offsetValue =
    typeof options === 'number'
      ? {
          mainAxis: options,
          crossAxis: 0,
        }
      : {
          mainAxis: options.mainAxis ?? 0,
          crossAxis: options.crossAxis ?? 0,
        }

  return {
    name: 'offset',
    fn: (state: MiddlewareState) => {
      const { placement, rects, middlewareData } = state

      const minOffset = middlewareData.arrow?.minOffset ?? 0

      const side = getSide(placement)
      const alignment = getAlignment(placement)
      const mainAxis = getSideAxis(placement)
      const crossAxis = getAlignmentAxis(placement)

      const mainAxisFactor = ['left', 'top'].includes(side) ? -1 : 1
      const crossAxisFactor = alignment === 'end' ? -1 : 1

      const mainAxisOffset = Math.max(offsetValue.mainAxis, minOffset)
      const crossAxisOffset = offsetValue.crossAxis

      const coordinates = {
        [mainAxis]: rects.popper[mainAxis] + mainAxisOffset * mainAxisFactor,
        [crossAxis]:
          rects.popper[crossAxis] + crossAxisOffset * crossAxisFactor,
      }

      return {
        ...coordinates,
        data: {
          x: coordinates.x - rects.popper.x,
          y: coordinates.y - rects.popper.y,
        },
      }
    },
  }
}
