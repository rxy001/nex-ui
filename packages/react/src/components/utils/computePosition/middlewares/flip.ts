import { getSide, getFallbackPlacements, getAlignmentSides } from '../utils'
import { detectOverflow } from '../detectOverflow'
import type { MiddlewareState, FlipOptions, Middleware } from '../types'

export const flip = (
  options: FlipOptions = {
    mainAxis: true,
    crossAxis: true,
  },
): Middleware => {
  return {
    name: 'flip',
    fn: (state: MiddlewareState) => {
      const { mainAxis = false, crossAxis = false } = options

      const { placement, middlewareData, initialPlacement, rects } = state

      const side = getSide(placement)

      const overflow = detectOverflow(state)

      const fallbackPlacements = getFallbackPlacements(
        initialPlacement,
        crossAxis,
      )

      const placements = [initialPlacement, ...fallbackPlacements]

      // The index represents the priority for determining the overflow direction.
      const overflowsToCheck = []

      if (mainAxis) {
        overflowsToCheck.push(overflow[side])
      }

      let overflows = middlewareData.flip?.overflows || []

      if (crossAxis) {
        const sides = getAlignmentSides(placement, rects)

        overflowsToCheck.push(overflow[sides[0]], overflow[sides[1]])
      }

      overflows = [...overflows, { placement: placement, overflowsToCheck }]

      if (!overflowsToCheck.every((side) => side <= 0)) {
        const nextIndex = (middlewareData.flip?.index || 0) + 1
        const nextPlacement = placements[nextIndex]

        if (nextPlacement) {
          return {
            overrides: {
              placement: nextPlacement,
            },
            data: {
              overflows,
              index: nextIndex,
            },
          }
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = overflows
          .filter((d) => d.overflowsToCheck[0] <= 0)
          .sort(
            (a, b) => a.overflowsToCheck[1] - b.overflowsToCheck[1],
          )[0]?.placement

        if (!resetPlacement) {
          resetPlacement = initialPlacement
        }

        if (resetPlacement !== placement) {
          return {
            overrides: {
              placement: resetPlacement,
            },
          }
        }
      }

      return {}
    },
  }
}
