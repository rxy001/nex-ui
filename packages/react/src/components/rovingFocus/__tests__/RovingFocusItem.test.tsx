import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RovingFocusGroup, RovingFocusItem } from '../index'
import type { UserEvent } from '@testing-library/user-event'

describe('RovingFocusItem', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })
  it("should return children as-is when RovingFocusItem's children is not a valid React element", () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const { container } = render(
      <RovingFocusGroup>
        <div>
          <RovingFocusItem>
            {
              // @ts-expect-error
            }
            Invalid Element
          </RovingFocusItem>
        </div>
      </RovingFocusGroup>,
    )
    expect(container.textContent).toBe('Invalid Element')
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('should render tabindex correctly on RovingFocusItem', async () => {
    const { getByTestId } = render(
      <RovingFocusGroup>
        <div data-testid='container'>
          <RovingFocusItem id='red'>
            <button data-testid='red'>red</button>
          </RovingFocusItem>
          <RovingFocusItem id='blue'>
            <button data-testid='blue'>blue</button>
          </RovingFocusItem>
        </div>
      </RovingFocusGroup>,
    )

    const redButton = getByTestId('red')
    const blueButton = getByTestId('blue')

    expect(redButton).toHaveAttribute('tabindex', '-1')
    expect(blueButton).toHaveAttribute('tabindex', '-1')

    await user.tab()
    expect(redButton).toHaveAttribute('tabindex', '0')
    expect(blueButton).toHaveAttribute('tabindex', '-1')

    await user.keyboard('{ArrowRight}')
    expect(redButton).toHaveAttribute('tabindex', '-1')
    expect(blueButton).toHaveAttribute('tabindex', '0')
  })

  it('should not focus RovingFocusItem when focusable=false', async () => {
    const { getByTestId } = render(
      <RovingFocusGroup>
        <div data-testid='container'>
          <RovingFocusItem id='red' focusable={false}>
            <button data-testid='red'>red</button>
          </RovingFocusItem>
          <RovingFocusItem id='blue'>
            <button data-testid='blue'>blue</button>
          </RovingFocusItem>
        </div>
      </RovingFocusGroup>,
    )

    const redButton = getByTestId('red')
    const blueButton = getByTestId('blue')

    expect(redButton).toHaveAttribute('tabindex', '-1')
    expect(blueButton).toHaveAttribute('tabindex', '-1')

    await user.tab()
    expect(redButton).toHaveAttribute('tabindex', '-1')
    expect(blueButton).toHaveAttribute('tabindex', '0')

    await user.click(redButton)

    expect(document.activeElement).toBe(blueButton)
  })
})
