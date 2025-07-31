/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState } from 'react'
import userEvent from '@testing-library/user-event'
import { act, fireEvent, render } from '@testing-library/react'
import { FocusTrap } from '../index'
import type { UserEvent } from '@testing-library/user-event'

describe('FocusTrap', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('should render null if children is not a valid React element', () => {
    // @ts-expect-error
    const { container } = render(<FocusTrap active>{null}</FocusTrap>)
    expect(container.firstChild).toBeNull()
  })

  it('should render null and warn if children is a Fragment', () => {
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
        {
          // it's not focusable if not have tabIndex
          <div role='dialog' tabIndex={0}>
            Dialog
          </div>
        }
      </FocusTrap>,
    )

    const dialog = getByRole('dialog')
    expect(document.activeElement).toBe(dialog)
  })

  it('should not focus children when inactive', () => {
    const { getByRole } = render(
      <FocusTrap>
        <div role='dialog'>Dialog</div>
      </FocusTrap>,
    )

    const dialog = getByRole('dialog')
    expect(document.activeElement).not.toBe(dialog)
  })

  it('should restore focus to previously focused element on unmount when restoreFocus=true', async () => {
    const Children = () => {
      const [active, setActive] = useState(false)

      return (
        <>
          <button data-testid='toggle-button' onClick={() => setActive(true)}>
            Button
          </button>
          <FocusTrap active={active}>
            <button
              data-testid='focus-trap-button'
              onClick={() => setActive(false)}
            >
              Button
            </button>
          </FocusTrap>
        </>
      )
    }

    const { getByTestId } = render(<Children />)

    const toggleButton = getByTestId('toggle-button')
    const focusTrapButton = getByTestId('focus-trap-button')

    await user.tab()
    expect(document.activeElement).toBe(toggleButton)

    await user.click(toggleButton)
    expect(document.activeElement).toBe(focusTrapButton)

    await user.click(focusTrapButton)
    expect(document.activeElement).toBe(toggleButton)
  })

  it('should not restore focus on unmount when restoreFocus=false', async () => {
    const Children = () => {
      const [active, setActive] = useState(false)

      return (
        <>
          <button data-testid='toggle-button' onClick={() => setActive(true)}>
            Button
          </button>
          <FocusTrap active={active} restoreFocus={false}>
            <button
              data-testid='focus-trap-button'
              onClick={() => setActive(false)}
            >
              Button
            </button>
          </FocusTrap>
        </>
      )
    }

    const { getByTestId } = render(<Children />)

    const toggleButton = getByTestId('toggle-button')
    const focusTrapButton = getByTestId('focus-trap-button')

    await user.tab()
    expect(document.activeElement).toBe(toggleButton)

    await user.click(toggleButton)
    expect(document.activeElement).toBe(focusTrapButton)

    await user.click(focusTrapButton)
    expect(document.activeElement).not.toBe(toggleButton)
  })

  it('should trap focus within the component when active', async () => {
    const { getByTestId } = render(
      <div>
        <button data-testid='outside-button'>Outside Button</button>
        <FocusTrap active>
          <div data-testid='focus-trap-container' tabIndex={0}>
            <button data-testid='first-button'>First</button>
            <button data-testid='second-button'>Second</button>
          </div>
        </FocusTrap>
      </div>,
    )

    const firstButton = getByTestId('first-button')
    const secondButton = getByTestId('second-button')

    await user.tab()
    expect(document.activeElement).toBe(firstButton)

    await user.tab()
    expect(document.activeElement).toBe(secondButton)

    await user.tab()
    expect(document.activeElement).toBe(firstButton)

    await user.tab()
    expect(document.activeElement).toBe(secondButton)
  })

  it('should handle shift+tab to move focus backwards within trap', async () => {
    const { getByTestId } = render(
      <FocusTrap active>
        <div data-testid='focus-trap-container' tabIndex={-1}>
          <button data-testid='first-button'>First</button>
          <button data-testid='second-button'>Second</button>
        </div>
      </FocusTrap>,
    )

    const firstButton = getByTestId('first-button')
    const secondButton = getByTestId('second-button')

    secondButton.focus()
    expect(document.activeElement).toBe(secondButton)

    await user.tab({ shift: true })
    expect(document.activeElement).toBe(firstButton)

    await user.tab({ shift: true })
    await user.tab({ shift: true })
    expect(document.activeElement).toBe(firstButton)
  })

  it('should not trap focus when paused', async () => {
    const { getByTestId } = render(
      <div>
        <button data-testid='outside-button'>Outside Button</button>
        <FocusTrap active paused>
          <div data-testid='focus-trap-container' tabIndex={0}>
            <button data-testid='inside-button'>Inside</button>
          </div>
        </FocusTrap>
      </div>,
    )

    const outsideButton = getByTestId('outside-button')
    const insideButton = getByTestId('inside-button')

    outsideButton.focus()
    expect(document.activeElement).toBe(outsideButton)

    // move to focus-trap-container
    await user.tab()
    await user.tab()

    expect(document.activeElement).toBe(insideButton)

    // move to body
    await user.tab()
    await user.tab()
    expect(document.activeElement).toBe(outsideButton)
  })

  it('should not be trapped when focus is outside elements', async () => {
    const { getByTestId } = render(
      <>
        <button data-testid='outside-button'>Outside Button</button>
        <FocusTrap active>
          <div data-testid='focus-trap-container' tabIndex={-1}>
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

  it('should call children onFocus handler when provided', async () => {
    const onFocusMock = jest.fn()

    const { getByTestId } = render(
      <FocusTrap active>
        <div
          data-testid='focus-trap-container'
          tabIndex={0}
          onFocus={onFocusMock}
        >
          Content
        </div>
      </FocusTrap>,
    )

    const container = getByTestId('focus-trap-container')

    await act(() => {
      fireEvent.focus(container)
    })

    expect(onFocusMock).toHaveBeenCalled()
  })

  it('should handle focus when no tabbable elements exist', async () => {
    const { getByTestId } = render(
      <FocusTrap active>
        <div data-testid='focus-trap-container' tabIndex={0}>
          <span>No tabbable content</span>
        </div>
      </FocusTrap>,
    )

    const container = getByTestId('focus-trap-container')
    expect(document.activeElement).toBe(container)

    await user.tab()
    expect(document.activeElement).toBe(container)

    await user.tab({ shift: true })
    expect(document.activeElement).toBe(container)
  })
})
