import { useState } from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { FocusTrap } from '../index'
import type { UserEvent } from '@testing-library/user-event'

describe('FocusTrap', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('should render children as-is if children is not a valid React element', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    // @ts-expect-error
    const { container } = render(<FocusTrap active>{null}</FocusTrap>)
    expect(container.firstChild).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('should render children as-is and warn if children is a Fragment', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const { container } = render(
      <FocusTrap active>
        <></>
      </FocusTrap>,
    )
    expect(container.firstChild).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('should automatically focus children when focus is outside <FocusTrap> after the component mounts', () => {
    const { getByRole } = render(
      <FocusTrap active>
        <div role='dialog'>Dialog</div>
      </FocusTrap>,
    )

    const dialog = getByRole('dialog')
    expect(document.activeElement).toBe(dialog)
  })

  it('should restore focus to previously focused element on unmount when restoreFocus=true', async () => {
    const Children = () => {
      const [active, setActive] = useState(false)

      return (
        <>
          <button data-testid='open-button' onClick={() => setActive(true)}>
            Button
          </button>
          <FocusTrap active={active}>
            <div role='dialog'>
              <button
                data-testid='close-button'
                onClick={() => setActive(false)}
              >
                Button
              </button>
            </div>
          </FocusTrap>
        </>
      )
    }

    const { getByTestId, getByRole } = render(<Children />)

    const openButton = getByTestId('open-button')
    const closeButton = getByTestId('close-button')
    const dialog = getByRole('dialog')

    await user.tab()
    expect(document.activeElement).toBe(openButton)

    await user.click(openButton)
    expect(document.activeElement).toBe(dialog)

    await user.click(closeButton)
    expect(document.activeElement).toBe(openButton)
  })

  it('should not restore focus on unmount when restoreFocus=false', async () => {
    const Children = () => {
      const [active, setActive] = useState(false)

      return (
        <>
          <button data-testid='open-button' onClick={() => setActive(true)}>
            Button
          </button>
          <FocusTrap active={active} restoreFocus={false}>
            <div role='dialog'>
              <button
                data-testid='close-button'
                onClick={() => setActive(false)}
              >
                Button
              </button>
            </div>
          </FocusTrap>
        </>
      )
    }

    const { getByTestId, getByRole } = render(<Children />)

    const dialog = getByRole('dialog')
    const openButton = getByTestId('open-button')
    const closeButton = getByTestId('close-button')

    await user.tab()
    expect(document.activeElement).toBe(openButton)
    await user.click(openButton)
    expect(document.activeElement).toBe(dialog)

    await user.click(closeButton)
    expect(document.activeElement).not.toBe(openButton)
  })

  it('should trap focus within the component when active=true and loop=false', async () => {
    const { getByTestId } = render(
      <FocusTrap active loop={false}>
        <div>
          <button data-testid='first-button'>First</button>
          <button data-testid='second-button'>Second</button>
        </div>
      </FocusTrap>,
    )

    const firstButton = getByTestId('first-button')
    const secondButton = getByTestId('second-button')

    await user.tab()
    expect(document.activeElement).toBe(firstButton)

    await user.tab()
    await user.tab()
    await user.tab()
    expect(document.activeElement).toBe(secondButton)
  })

  it('should focus the last element in the trap on shift+tab from the first element in trap', async () => {
    const { getByTestId } = render(
      <FocusTrap active>
        <div>
          <button data-testid='first-button'>First</button>
          <button data-testid='second-button'>Second</button>
        </div>
      </FocusTrap>,
    )

    const firstButton = getByTestId('first-button')
    const secondButton = getByTestId('second-button')

    firstButton.focus()
    expect(document.activeElement).toBe(firstButton)

    await user.tab({ shift: true })
    expect(document.activeElement).toBe(secondButton)
  })

  it('should focus the first element in trap on tab from the last element in trap', async () => {
    const { getByTestId } = render(
      <FocusTrap active>
        <div>
          <button data-testid='first-button'>First</button>
          <button data-testid='second-button'>Second</button>
        </div>
      </FocusTrap>,
    )

    const firstButton = getByTestId('first-button')
    const secondButton = getByTestId('second-button')

    secondButton.focus()
    expect(document.activeElement).toBe(secondButton)

    await user.tab()
    expect(document.activeElement).toBe(firstButton)
  })

  it('should not trap focus when paused', async () => {
    const { getByTestId, getByRole } = render(
      <div>
        <button data-testid='outside-button'>Outside Button</button>
        <FocusTrap active paused>
          <div role='dialog'>
            <button data-testid='inside-button'>Inside</button>
          </div>
        </FocusTrap>
      </div>,
    )

    const outsideButton = getByTestId('outside-button')
    const insideButton = getByTestId('inside-button')
    const dialog = getByRole('dialog')

    expect(document.activeElement).toBe(dialog)

    await user.tab()
    expect(document.activeElement).toBe(insideButton)

    await user.tab()
    await user.tab()

    expect(document.activeElement).toBe(outsideButton)
  })

  it('should not be trapped when focus is outside elements', async () => {
    const { getByTestId } = render(
      <>
        <button data-testid='outside-button'>Outside Button</button>
        <FocusTrap active>
          <div>
            <button data-testid='inside-button'>Inside</button>
          </div>
        </FocusTrap>
      </>,
    )

    const outsideButton = getByTestId('outside-button')
    const insideButton = getByTestId('inside-button')

    insideButton.focus()
    expect(document.activeElement).toBe(insideButton)

    outsideButton.focus()
    expect(document.activeElement).toBe(outsideButton)
  })

  it('should handle focus when no tabbable elements exist', async () => {
    const { getByRole } = render(
      <FocusTrap active>
        <div role='dialog'>
          <span>No tabbable content</span>
        </div>
      </FocusTrap>,
    )

    const container = getByRole('dialog')
    expect(document.activeElement).toBe(container)

    await user.tab()
    expect(document.activeElement).toBe(container)

    await user.tab({ shift: true })
    expect(document.activeElement).toBe(container)
  })
})
