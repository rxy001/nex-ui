import type { Placement, Side, Alignment, Axis, Length, Rect } from './types'

export const getSide = (placement: Placement): Side => {
  return placement.split('-')[0] as Side
}

export const getAlignment = (placement: Placement): Alignment | undefined => {
  return placement.split('-')[1] as Alignment | undefined
}

export const isWebKit = (): boolean => {
  if (typeof CSS === 'undefined' || !CSS.supports) return false
  /* istanbul ignore next */
  return CSS.supports('-webkit-backdrop-filter', 'none')
}

const oppositeSide: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}

const getOppositeSide = (side: Side): Side => {
  return oppositeSide[side]
}

const getOppositeAlignment = (alignment: Alignment): Alignment => {
  return alignment === 'start' ? 'end' : 'start'
}

export const getFallbackPlacements = (
  placement: Placement,
  flipAlignment: boolean,
): Placement[] => {
  const side = getSide(placement)
  const alignment = getAlignment(placement)
  const oppositeSide = getOppositeSide(side)
  if (!alignment) {
    return [oppositeSide]
  }

  if (!flipAlignment) {
    return [`${oppositeSide}-${alignment}`]
  }

  const oppositeAlignment = getOppositeAlignment(alignment)
  return [
    `${side}-${oppositeAlignment}`,
    `${oppositeSide}-${alignment}`,
    `${oppositeSide}-${oppositeAlignment}`,
  ]
}

export const getOppositeAxis = (axis: Axis): Axis => {
  return axis === 'x' ? 'y' : 'x'
}

const yAxisSides = new Set(['top', 'bottom'])
export const getSideAxis = (placement: Placement): Axis => {
  return yAxisSides.has(getSide(placement)) ? 'y' : 'x'
}

export const getAlignmentAxis = (placement: Placement): Axis => {
  return getOppositeAxis(getSideAxis(placement))
}

export const getAxisLength = (axis: Axis): Length => {
  return axis === 'y' ? 'height' : 'width'
}

export const getAlignmentSides = (
  placement: Placement,
  rects: { reference: Rect; popper: Rect },
): [Side, Side] => {
  const alignment = getAlignment(placement)
  const alignmentAxis = getAlignmentAxis(placement)
  const length = getAxisLength(alignmentAxis)

  let mainAlignmentSide: Side =
    alignmentAxis === 'x'
      ? alignment === 'start'
        ? 'right'
        : 'left'
      : alignment === 'start'
        ? 'bottom'
        : 'top'

  if (rects.reference[length] > rects.popper[length]) {
    mainAlignmentSide = getOppositeSide(mainAlignmentSide)
  }

  return [mainAlignmentSide, getOppositeSide(mainAlignmentSide)]
}
