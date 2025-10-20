import { computePosition } from '../index'
import type { Rect } from '../types'

type CustomHTMLElement = HTMLElement & {
  set: (property: keyof Rect, value: number) => void
}

const createElement = ({ width, height, x, y }: Rect): CustomHTMLElement => {
  const element = document.createElement('div')

  const rect: Rect = { width, height, x, y }

  element.getBoundingClientRect = () => ({
    width,
    height,
    x: rect.x,
    y: rect.y,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height,
    toJSON: () => {},
  })

  const set = (property: keyof Rect, value: number) => {
    rect[property] = value
  }

  // @ts-expect-error
  element.set = set

  return element as unknown as CustomHTMLElement
}

const defineWindowScroll = (x: number, y: number) => {
  Object.defineProperty(window, 'scrollX', {
    get() {
      return x
    },
  })
  Object.defineProperty(window, 'scrollY', {
    get() {
      return y
    },
  })
}

const defineVisualViewport = (
  width: number,
  height: number,
  offsetLeft: number = 0,
  offsetTop: number = 0,
) => {
  Object.defineProperty(window, 'visualViewport', {
    get() {
      return {
        offsetLeft,
        offsetTop,
        width,
        height,
      }
    },
    configurable: true,
  })
}

const appendToBody = (...elements: HTMLElement[]) => {
  elements.forEach((el) => document.body.appendChild(el))
}

const removeFromBody = (...elements: HTMLElement[]) => {
  elements.forEach((el) => document.body.removeChild(el))
}

describe('computePosition', () => {
  let reference: CustomHTMLElement
  let popper: CustomHTMLElement

  beforeEach(() => {
    defineVisualViewport(790, 858)
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      get() {
        return this.parentElement
      },
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'visualViewport', {
      get: undefined,
    })

    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      get: undefined,
    })
  })

  beforeEach(() => {
    // Make sure the body and html elements are statically positioned
    document.body.style.position = 'static'
    document.documentElement.style.position = 'static'
  })

  afterEach(() => {
    document.body.style.position = ''
    document.documentElement.style.position = ''
  })

  beforeEach(() => {
    reference = createElement({ width: 100, height: 100, x: 0, y: 0 })
    popper = createElement({ width: 200, height: 50, x: 0, y: 0 })
  })

  afterEach(() => {
    reference = null!
    popper = null!
  })

  afterEach(() => {
    defineWindowScroll(0, 0)
  })

  it('Should return the correct coordinates when not using middleware', () => {
    const { x, y, placement, middlewareData } = computePosition(
      reference,
      popper,
      {
        arrow: false,
        flip: false,
        offset: false,
        shift: false,
        placement: 'bottom',
      },
    )

    appendToBody(reference, popper)

    expect(x).toBe(-50)
    expect(y).toBe(100)
    expect(placement).toBe('bottom')
    expect(middlewareData).toEqual({})

    removeFromBody(reference, popper)
  })

  it('should return correct coordinates relative to the offset parent', () => {
    const container = createElement({
      width: 200,
      height: 200,
      x: 100,
      y: 100,
    })
    container.style.marginLeft = '100px'
    container.style.marginTop = '100px'
    container.style.position = 'relative'

    reference.set('x', 100)
    reference.set('y', 100)

    container.appendChild(reference)
    container.appendChild(popper)

    appendToBody(container)

    const { x, y, placement, middlewareData } = computePosition(
      reference,
      popper,
      {
        placement: 'top',
        arrow: false,
        flip: false,
        offset: false,
        shift: false,
      },
    )

    expect(x).toBe(-50)
    expect(y).toBe(-50)
    expect(placement).toBe('top')
    expect(middlewareData).toEqual({})

    removeFromBody(container)
  })

  describe('middleware-flip', () => {
    it('should flip mainAxis when mainAxis is true', () => {
      appendToBody(reference, popper)
      let { x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'top-start',
          flip: {
            mainAxis: true,
          },
          arrow: false,
          offset: false,
          shift: false,
        },
      )
      expect(x).toBe(0)
      expect(y).toBe(100)
      expect(placement).toBe('bottom-start')
      expect(middlewareData).toEqual({
        flip: {
          index: 1,
          overflows: [
            {
              placement: 'top-start',
              overflowsToCheck: [50],
            },
          ],
        },
      })
      ;({ x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'top',
          flip: {
            mainAxis: true,
          },
          arrow: false,
          offset: false,
          shift: false,
        },
      ))
      expect(x).toBe(-50)
      expect(y).toBe(100)
      expect(placement).toBe('bottom')
      expect(middlewareData).toEqual({
        flip: {
          index: 1,
          overflows: [
            {
              placement: 'top',
              overflowsToCheck: [50],
            },
          ],
        },
      })

      removeFromBody(reference, popper)
    })

    it('should flip crossAxis when crossAxis is true', () => {
      appendToBody(reference, popper)
      const { x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'top-end',
          flip: {
            crossAxis: true,
          },
          arrow: false,
          offset: false,
          shift: false,
        },
      )
      expect(x).toBe(0)
      expect(y).toBe(-50)
      expect(placement).toBe('top-start')
      expect(middlewareData).toEqual({
        flip: {
          index: 1,
          overflows: [
            {
              placement: 'top-end',
              overflowsToCheck: [100, -690],
            },
          ],
        },
      })

      removeFromBody(reference, popper)
    })

    it('should flip mainAxis and crossAxis when both are true', () => {
      appendToBody(reference, popper)
      const { x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'top-end',
          flip: {
            crossAxis: true,
            mainAxis: true,
          },
          arrow: false,
          offset: false,
          shift: false,
        },
      )
      expect(x).toBe(0)
      expect(y).toBe(100)
      expect(placement).toBe('bottom-start')
      expect(middlewareData).toEqual({
        flip: {
          index: 3,
          overflows: [
            {
              placement: 'top-end',
              overflowsToCheck: [50, 100, -690],
            },
            {
              placement: 'top-start',
              overflowsToCheck: [50, -590, 0],
            },
            {
              placement: 'bottom-end',
              overflowsToCheck: [-708, 100, -690],
            },
          ],
        },
      })
      removeFromBody(reference, popper)
    })

    it('should flip the popper when its parentElement scrolls', () => {
      const container = createElement({
        width: 500,
        height: 600,
        x: 0,
        y: -70,
      })
      reference.set('y', 30)
      container.style.position = 'relative'
      container.style.paddingTop = '100px'
      container.appendChild(reference)
      container.appendChild(popper)

      const overflowing = createElement({
        height: 200,
        width: 200,
        x: 0,
        y: 0,
      })
      overflowing.style.overflow = 'auto'

      overflowing.appendChild(container)
      appendToBody(overflowing)

      overflowing.scrollTop = 70

      const { x, y, placement } = computePosition(reference, popper, {
        placement: 'top',
        arrow: false,
        offset: false,
        shift: false,
      })

      expect(x).toBe(-50)
      expect(y).toBe(200)
      expect(placement).toBe('bottom')

      removeFromBody(overflowing)
    })

    it('should return the initial placement when there is no available space', () => {
      const div = createElement({ width: 100, height: 100, x: 0, y: 0 })
      div.style.overflow = 'hidden'

      div.appendChild(reference)
      div.appendChild(popper)

      appendToBody(div)

      const { x, y, placement } = computePosition(reference, popper, {
        placement: 'top',
        arrow: false,
        offset: false,
        shift: false,
      })

      expect(x).toBe(-50)
      expect(y).toBe(-50)
      expect(placement).toBe('top')

      removeFromBody(div)
    })

    it('should return fit on the mainAxis side of overflow', () => {
      const div = createElement({
        width: 100,
        height: 200,
        x: 0,
        y: 0,
      })
      div.style.overflow = 'hidden'

      div.appendChild(reference)
      div.appendChild(popper)

      appendToBody(div)

      const { x, y, placement } = computePosition(reference, popper, {
        placement: 'top-start',
        arrow: false,
        offset: false,
        shift: false,
      })

      expect(x).toBe(0)
      expect(y).toBe(100)
      expect(placement).toBe('bottom-start')

      removeFromBody(div)
    })

    it('should handle edge cases', () => {
      // Case 1: The popper is positioned relative to the HTML element, and the HTML element has an offset.
      document.documentElement.style.position = 'relative'
      reference = createElement({ width: 100, height: 100, x: 200, y: 200 })
      popper = createElement({ width: 50, height: 50, x: 0, y: 0 })
      defineWindowScroll(200, 200)

      Object.defineProperty(document.documentElement, 'getBoundingClientRect', {
        value: () => ({
          width: 790,
          height: 858,
          x: 200,
          y: 200,
          top: 200,
          left: 200,
          right: 990,
          bottom: 1058,
          toJSON: () => {},
        }),
        writable: true,
      })

      appendToBody(reference, popper)

      const { x, y, placement } = computePosition(reference, popper, {
        placement: 'left-start',
        arrow: false,
        offset: false,
        shift: false,
      })

      expect(x).toBe(-50)
      expect(y).toBe(0)
      expect(placement).toBe('left-start')

      removeFromBody(reference, popper)
      Object.defineProperty(document.documentElement, 'getBoundingClientRect', {
        value: () => ({
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          toJSON: () => {},
        }),
      })
    })
  })

  describe('middleware-shift', () => {
    it('should shift to keep the popper in view (horizontal)', () => {
      defineWindowScroll(70, 0)
      reference.set('x', -70)
      appendToBody(reference, popper)

      const { x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'bottom-start',
          shift: true,
          arrow: false,
          offset: false,
          flip: false,
        },
      )

      expect(x).toBe(70)
      expect(y).toBe(100)
      expect(placement).toBe('bottom-start')
      expect(middlewareData).toEqual({
        shift: {
          x: 70,
          y: 0,
        },
      })

      removeFromBody(reference, popper)
    })

    it('should shift to keep the popper in view (vertical)', () => {
      appendToBody(reference, popper)
      defineWindowScroll(0, 70)
      reference.set('y', -70)

      const { x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'right-start',
          shift: true,
          arrow: false,
          offset: false,
          flip: false,
        },
      )

      expect(x).toBe(100)
      expect(y).toBe(70)
      expect(placement).toBe('right-start')
      expect(middlewareData).toEqual({
        shift: {
          x: 0,
          y: 70,
        },
      })

      removeFromBody(reference, popper)
    })

    it("should restrict the popper's offset to the edges of the reference element", () => {
      defineVisualViewport(200, 858)

      defineWindowScroll(0, 0)
      reference.set('x', 250)
      appendToBody(reference, popper)

      let { x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'bottom-start',
          shift: true,
          arrow: false,
          offset: false,
          flip: false,
        },
      )

      expect(x).toBe(50)
      expect(y).toBe(100)
      expect(placement).toBe('bottom-start')
      expect(middlewareData).toEqual({
        shift: {
          x: -200,
          y: 0,
        },
      })
      ;({ x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'bottom',
          shift: true,
          arrow: false,
          offset: false,
          flip: false,
        },
      ))
      expect(x).toBe(50)
      expect(y).toBe(100)
      expect(placement).toBe('bottom')
      expect(middlewareData).toEqual({
        shift: {
          x: -150,
          y: 0,
        },
      })
      ;({ x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'bottom-end',
          shift: true,
          arrow: false,
          offset: false,
          flip: false,
        },
      ))
      expect(x).toBe(50)
      expect(y).toBe(100)
      expect(placement).toBe('bottom-end')
      expect(middlewareData).toEqual({
        shift: {
          x: -100,
          y: 0,
        },
      })

      defineWindowScroll(500, 0)
      reference.set('x', -250)
      ;({ x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'bottom-start',
          shift: true,
          arrow: false,
          offset: false,
          flip: false,
        },
      ))

      expect(x).toBe(350)
      expect(y).toBe(100)
      expect(placement).toBe('bottom-start')
      expect(middlewareData).toEqual({
        shift: {
          x: 100,
          y: 0,
        },
      })
      ;({ x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'bottom',
          shift: true,
          arrow: false,
          offset: false,
          flip: false,
        },
      ))
      expect(x).toBe(350)
      expect(y).toBe(100)
      expect(placement).toBe('bottom')
      expect(middlewareData).toEqual({
        shift: {
          x: 150,
          y: 0,
        },
      })
      ;({ x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'bottom-end',
          shift: true,
          arrow: false,
          offset: false,
          flip: false,
        },
      ))
      expect(x).toBe(350)
      expect(y).toBe(100)
      expect(placement).toBe('bottom-end')
      expect(middlewareData).toEqual({
        shift: {
          x: 200,
          y: 0,
        },
      })
      removeFromBody(reference, popper)
    })
  })

  describe('middleware-offset', () => {
    it('should have a default mainAxis offset of 5', () => {
      appendToBody(reference, popper)
      const { x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'top',
          arrow: false,
          flip: false,
          shift: false,
        },
      )

      expect(x).toBe(-50)
      expect(y).toBe(-55)
      expect(placement).toBe('top')
      expect(middlewareData).toEqual({
        offset: {
          x: 0,
          y: -5,
        },
      })
    })

    it('should offset the popper along the mainAxis', () => {
      appendToBody(reference, popper)

      let { x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'top',
          offset: 10,
          arrow: false,
          flip: false,
          shift: false,
        },
      )

      expect(x).toBe(-50)
      expect(y).toBe(-60)
      expect(placement).toBe('top')
      expect(middlewareData).toEqual({
        offset: {
          x: 0,
          y: -10,
        },
      })
      ;({ x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'bottom',
          offset: {
            mainAxis: 20,
          },
          arrow: false,
          flip: false,
          shift: false,
        },
      ))

      expect(x).toBe(-50)
      expect(y).toBe(120)
      expect(placement).toBe('bottom')
      expect(middlewareData).toEqual({
        offset: {
          x: 0,
          y: 20,
        },
      })
    })

    it('should offset the popper along the crossAxis', () => {
      appendToBody(reference, popper)

      let { x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'top-start',
          offset: {
            crossAxis: 10,
          },
          arrow: false,
          flip: false,
          shift: false,
        },
      )
      expect(x).toBe(10)
      expect(y).toBe(-50)
      expect(placement).toBe('top-start')
      expect(middlewareData).toEqual({
        offset: {
          x: 10,
          y: 0,
        },
      })
      ;({ x, y, placement, middlewareData } = computePosition(
        reference,
        popper,
        {
          placement: 'top-end',
          offset: {
            crossAxis: 10,
          },
          arrow: false,
          flip: false,
          shift: false,
        },
      ))
      expect(x).toBe(-110)
      expect(y).toBe(-50)
      expect(placement).toBe('top-end')
      expect(middlewareData).toEqual({
        offset: {
          x: -10,
          y: 0,
        },
      })
    })
  })

  describe('middleware-arrow', () => {
    let arrow: CustomHTMLElement
    beforeEach(() => {
      arrow = createElement({
        width: 10,
        height: 10,
        x: 0,
        y: 0,
      })
      popper.appendChild(arrow)
    })

    it('should return the correct arrow position based on the placement', () => {
      appendToBody(reference, popper)
      let { middlewareData } = computePosition(reference, popper, {
        placement: 'bottom-start',
        arrow: {
          element: arrow,
        },
        flip: false,
        shift: false,
        offset: false,
      })
      expect(middlewareData.arrow).toEqual({
        x: 20,
        y: -5,
        minOffset: 5,
      })
      ;({ middlewareData } = computePosition(reference, popper, {
        placement: 'bottom',
        arrow: {
          element: arrow,
        },
        flip: false,
        shift: false,
        offset: false,
      }))
      expect(middlewareData.arrow).toEqual({
        x: 95,
        y: -5,
        minOffset: 5,
      })
      ;({ middlewareData } = computePosition(reference, popper, {
        placement: 'bottom-end',
        arrow: {
          element: arrow,
        },
        flip: false,
        shift: false,
        offset: false,
      }))
      expect(middlewareData.arrow).toEqual({
        x: 170,
        y: -5,
        minOffset: 5,
      })
      ;({ middlewareData } = computePosition(reference, popper, {
        placement: 'left-start',
        arrow: {
          element: arrow,
        },
        flip: false,
        shift: false,
        offset: false,
      }))
      expect(middlewareData.arrow).toEqual({
        x: 195,
        y: 20,
        minOffset: 5,
      })
      ;({ middlewareData } = computePosition(reference, popper, {
        placement: 'left',
        arrow: {
          element: arrow,
        },
        flip: false,
        shift: false,
        offset: false,
      }))
      expect(middlewareData.arrow).toEqual({
        x: 195,
        y: 20,
        minOffset: 5,
      })
      ;({ middlewareData } = computePosition(reference, popper, {
        placement: 'left-end',
        arrow: {
          element: arrow,
        },
        flip: false,
        shift: false,
        offset: false,
      }))
      expect(middlewareData.arrow).toEqual({
        x: 195,
        y: 20,
        minOffset: 5,
      })
    })

    it('should break if the arrow element is not provided', () => {
      appendToBody(reference, popper)
      const { middlewareData } = computePosition(reference, popper, {
        placement: 'bottom-start',
        arrow: {},
        flip: false,
        shift: false,
        offset: false,
      })
      expect(middlewareData).toEqual({})
    })
  })
})
