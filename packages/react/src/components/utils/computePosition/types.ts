export type Alignment = 'start' | 'end'
export type Side = 'top' | 'right' | 'bottom' | 'left'
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export type FlipOptions = {
  mainAxis?: boolean
  crossAxis?: boolean
}

export type ArrowOptions = {
  element?: HTMLElement | null
}

export type Coordinates = {
  x: number
  y: number
}

export type OffsetOptions = number | { mainAxis?: number; crossAxis?: number }

export type Middleware = {
  name: string
  fn: (state: MiddlewareState) => {
    x?: number
    y?: number
    data?: {}
    overrides?: {
      placement?: Placement
    }
  }
}

export type MiddlewareData = {
  flip?: {
    overflows: Array<{
      placement: Placement
      overflowsToCheck: number[]
    }>
    index: number
  }
  shift?: Coordinates
  arrow?: Coordinates & {
    minOffset: number
  }
  offset?: Coordinates
  [key: string]: any
}

export type ComputePositionOptions = {
  placement?: Placement
  offset?: OffsetOptions | boolean
  flip?: FlipOptions | boolean
  shift?: boolean
  arrow?: ArrowOptions | false
}

export type MiddlewareState = {
  placement: Placement
  middlewareData: MiddlewareData
  initialPlacement: Placement
  elements: {
    reference: Element
    popper: Element
  }
  rects: {
    reference: Rect
    popper: Rect
  }
}

export type Rect = {
  width: number
  height: number
  x: number
  y: number
}

export type Axis = 'x' | 'y'

export type Length = 'width' | 'height'
