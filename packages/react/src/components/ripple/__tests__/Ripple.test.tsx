import { render, fireEvent, act } from '@testing-library/react'
import { MotionGlobalConfig } from 'motion/react'
import { Ripple } from '../Ripple'

MotionGlobalConfig.skipAnimations = false

describe('Ripple', () => {
  it('should return children as-is when children is not a valid React element', () => {
    const textChild = 'Not a valid element'
    const { container } = render(<Ripple>{textChild as any}</Ripple>)
    expect(container.textContent).toBe(textChild)
  })

  it('should clone valid React element children with combined onClick handlers', async () => {
    const childOnClick = jest.fn()
    const rippleOnClick = jest.fn()

    const { getByRole } = await act(async () =>
      render(
        <Ripple onClick={rippleOnClick}>
          <button onClick={childOnClick}>Click me</button>
        </Ripple>,
      ),
    )

    const button = getByRole('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(childOnClick).toHaveBeenCalled()
    expect(rippleOnClick).toHaveBeenCalled()
  })

  it('should trigger ripple effect on click', async () => {
    const { getByRole } = await act(async () =>
      render(
        <Ripple>
          <button>Click me</button>
        </Ripple>,
      ),
    )

    const button = getByRole('button')
    await act(async () => {
      fireEvent.click(button)
    })

    expect(button.childNodes).toHaveLength(2)
  })

  it('should not trigger ripple effect when disabled', async () => {
    const { getByRole } = await act(async () =>
      render(
        <Ripple disabled>
          <button>Click me</button>
        </Ripple>,
      ),
    )

    const button = getByRole('button')
    await act(async () => {
      fireEvent.click(button)
    })

    expect(button.childNodes).toHaveLength(1)
  })
})
