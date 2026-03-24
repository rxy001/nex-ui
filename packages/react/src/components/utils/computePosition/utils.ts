import type { Placement, Side, Alignment, Axis, Length, Rect } from './types'

export function getSide(placement: Placement): Side {
  return placement.split('-')[0] as Side
}

export function getAlignment(placement: Placement): Alignment | undefined {
  return placement.split('-')[1] as Alignment | undefined
}

export function isWebKit(): boolean {
  if (typeof CSS === 'undefined' || !CSS.supports) return false
  return CSS.supports('-webkit-backdrop-filter', 'none')
}

const oppositeSide: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}

function getOppositeSide(side: Side): Side {
  return oppositeSide[side]
}

export function getOppositeAlignment(alignment: Alignment): Alignment {
  return alignment === 'start' ? 'end' : 'start'
}

export function getFallbackPlacements(
  placement: Placement,
  flipAlignment: boolean,
): Placement[] {
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

export function getOppositeAxis(axis: Axis): Axis {
  return axis === 'x' ? 'y' : 'x'
}

const yAxisSides = new Set(['top', 'bottom'])
export function getSideAxis(placement: Placement): Axis {
  return yAxisSides.has(getSide(placement)) ? 'y' : 'x'
}

export function getAlignmentAxis(placement: Placement): Axis {
  return getOppositeAxis(getSideAxis(placement))
}

export function getAxisLength(axis: Axis): Length {
  return axis === 'y' ? 'height' : 'width'
}

export function getAlignmentSides(
  placement: Placement,
  rects: { reference: Rect; popper: Rect },
): [Side, Side] {
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
