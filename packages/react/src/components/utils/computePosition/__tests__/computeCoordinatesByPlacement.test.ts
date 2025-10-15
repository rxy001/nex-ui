import { computeCoordinatesByPlacement } from '../computeCoordinatesByPlacement'

const reference = { x: 0, y: 0, width: 100, height: 100 }
const popper = { x: 0, y: 0, width: 50, height: 50 }

describe('computeCoordinatesByPlacement', () => {
  it('should compute correct coordinates for bottom placement', () => {
    expect(
      computeCoordinatesByPlacement({ reference, popper }, 'bottom'),
    ).toEqual({
      x: 25,
      y: 100,
    })
  })

  it('should compute correct coordinates for bottom-start placement', () => {
    expect(
      computeCoordinatesByPlacement({ reference, popper }, 'bottom-start'),
    ).toEqual({ x: 0, y: 100 })
  })

  it('should compute correct coordinates for bottom-end placement', () => {
    expect(
      computeCoordinatesByPlacement({ reference, popper }, 'bottom-end'),
    ).toEqual({ x: 50, y: 100 })
  })

  it('should compute correct coordinates for top placement', () => {
    expect(computeCoordinatesByPlacement({ reference, popper }, 'top')).toEqual(
      {
        x: 25,
        y: -50,
      },
    )
  })

  it('should compute correct coordinates for top-start placement', () => {
    expect(
      computeCoordinatesByPlacement({ reference, popper }, 'top-start'),
    ).toEqual({ x: 0, y: -50 })
  })

  it('should compute correct coordinates for top-end placement', () => {
    expect(
      computeCoordinatesByPlacement({ reference, popper }, 'top-end'),
    ).toEqual({
      x: 50,
      y: -50,
    })
  })

  it('should compute correct coordinates for right placement', () => {
    expect(
      computeCoordinatesByPlacement({ reference, popper }, 'right'),
    ).toEqual({
      x: 100,
      y: 25,
    })
  })

  it('should compute correct coordinates for right-start placement', () => {
    expect(
      computeCoordinatesByPlacement({ reference, popper }, 'right-start'),
    ).toEqual({ x: 100, y: 0 })
  })

  it('should compute correct coordinates for right-end placement', () => {
    expect(
      computeCoordinatesByPlacement({ reference, popper }, 'right-end'),
    ).toEqual({ x: 100, y: 50 })
  })

  it('should compute correct coordinates for left placement', () => {
    expect(
      computeCoordinatesByPlacement({ reference, popper }, 'left'),
    ).toEqual({
      x: -50,
      y: 25,
    })
  })

  it('should compute correct coordinates for left-start placement', () => {
    expect(
      computeCoordinatesByPlacement({ reference, popper }, 'left-start'),
    ).toEqual({ x: -50, y: 0 })
  })

  it('should compute correct coordinates for left-end placement', () => {
    expect(
      computeCoordinatesByPlacement({ reference, popper }, 'left-end'),
    ).toEqual({ x: -50, y: 50 })
  })

  it('should use default bottom placement instead of invalid placement', () => {
    expect(
      // @ts-expect-error
      computeCoordinatesByPlacement({ reference, popper }, 'invalid-placement'),
    ).toEqual({ x: 25, y: 100 })
  })
})
