import { isPlainObject } from '@nex-ui/utils'
import { getElementRects } from './getElementRects'
import { flip, arrow, offset, shift } from './middlewares'
import { computeCoordinatesByPlacement } from './computeCoordinatesByPlacement'
import type {
  Placement,
  ComputePositionOptions,
  Middleware,
  MiddlewareData,
  MiddlewareState,
} from './types'

export function computePosition(
  reference: Element,
  popper: Element,
  options?: ComputePositionOptions,
) {
  const {
    placement = 'bottom',
    shift: shiftOption = false,
    offset: offsetOption = false,
    flip: flipOption = false,
    arrow: arrowOption = false,
  } = options ?? {}

  const middlewareOptions: [unknown, (...rest: any[]) => Middleware][] = [
    [flipOption, flip],
    [shiftOption, shift],
    [arrowOption, arrow],
    [offsetOption, offset],
  ]

  const middlewares = middlewareOptions
    .filter(([option]) => option !== false)
    .map(([option, fn]) => fn(typeof option === 'boolean' ? undefined : option))

  const rects = getElementRects(reference, popper)

  const coordinates = computeCoordinatesByPlacement(rects, placement)

  let middlewareData: MiddlewareData = {}

  let state: MiddlewareState = {
    rects: {
      popper: {
        ...rects.popper,
        x: coordinates.x,
        y: coordinates.y,
      },
      reference: { ...rects.reference },
    },
    elements: {
      reference,
      popper,
    },
    placement,
    middlewareData,
    initialPlacement: placement,
  }

  for (let i = 0; i < middlewares.length; i++) {
    const middleware = middlewares[i]

    let nextX, nextY

    const { x, y, overrides, data } = middleware.fn(state)

    nextX = x
    nextY = y

    if (data) {
      middlewareData = {
        ...middlewareData,
        [middleware.name]: {
          ...middlewareData[middleware.name],
          ...data,
        },
      }
    }

    let placementOverride: Placement | undefined

    if (isPlainObject(overrides)) {
      if (overrides?.placement) {
        placementOverride = overrides?.placement
        ;({ x: nextX, y: nextY } = computeCoordinatesByPlacement(
          rects,
          placementOverride,
        ))
      }
      i--
    }

    state = {
      ...state,
      rects: {
        ...state.rects,
        popper: {
          ...state.rects.popper,
          x: nextX ?? state.rects.popper.x,
          y: nextY ?? state.rects.popper.y,
        },
      },
      middlewareData,
      placement: placementOverride ?? state.placement,
    }
  }

  return {
    x: state.rects.popper.x,
    y: state.rects.popper.y,
    placement: state.placement,
    middlewareData: state.middlewareData,
  }
}
