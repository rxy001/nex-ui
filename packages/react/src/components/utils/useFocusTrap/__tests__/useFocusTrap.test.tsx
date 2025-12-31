import { createRef, useRef, useState } from 'react'
import userEvent from '@testing-library/user-event'
import { render, renderHook } from '@testing-library/react'
import { useFocusTrap } from '../index'
import type { ReactNode } from 'react'
import type { UserEvent } from '@testing-library/user-event'
import type { UseFocusTrapProps } from '../index'

type TestFocusTrap = Omit<UseFocusTrapProps, 'ref'> & {
  children?: ReactNode
}

function TestFocusTrap(props: TestFocusTrap) {
  const ref = useRef<HTMLDivElement>(null)
  const focusTrapProps = useFocusTrap({ ...props, ref })

  return (
    <div role='dialog' ref={ref} {...focusTrapProps}>
      {props.children ?? 'content'}
    </div>
  )
}

describe('useFocusTrap', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('should return correct props', () => {
    const ref = createRef<null>()
    const { result } = renderHook(() => useFocusTrap({ active: true, ref }))

    expect(result.current).toEqual({
      tabIndex: -1,
      onFocus: expect.any(Function),
      onKeyDown: expect.any(Function),
    })
  })

  it('should automatically focus children when focus is outside <FocusTrap> after the component mounts', () => {
    const { getByRole } = render(<TestFocusTrap active />)

    const dialog = getByRole('dialog')
    expect(document.activeElement).toBe(dialog)
  })

  it('should not focus children when inactive', () => {
    const { getByRole } = render(<TestFocusTrap />)

    const dialog = getByRole('dialog')
    expect(document.activeElement).not.toBe(dialog)
  })

  it('should restore focus to previously focused element on unmount when restoreFocus=true', async () => {
    const Children = () => {
      const [active, setActive] = useState(false)

      return (
        <>
          <button data-testid='open-button' onClick={() => setActive(true)}>
            Button
          </button>
          <TestFocusTrap active={active}>
            <button data-testid='close-button' onClick={() => setActive(false)}>
              Button
            </button>
          </TestFocusTrap>
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
          <TestFocusTrap active={active} restoreFocus={false}>
            <button data-testid='close-button' onClick={() => setActive(false)}>
              Button
            </button>
          </TestFocusTrap>
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
      <TestFocusTrap active loop={false}>
        <button data-testid='first-button'>First</button>
        <button data-testid='second-button'>Second</button>
      </TestFocusTrap>,
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
      <TestFocusTrap active>
        <button data-testid='first-button'>First</button>
        <button data-testid='second-button'>Second</button>
      </TestFocusTrap>,
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
      <TestFocusTrap active>
        <button data-testid='first-button'>First</button>
        <button data-testid='second-button'>Second</button>
      </TestFocusTrap>,
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
        <TestFocusTrap active paused>
          <button data-testid='inside-button'>Inside</button>
        </TestFocusTrap>
        <button data-testid='outside-button'>Outside Button</button>
      </div>,
    )

    const outsideButton = getByTestId('outside-button')
    const insideButton = getByTestId('inside-button')
    const dialog = getByRole('dialog')

    expect(document.activeElement).toBe(dialog)

    await user.tab()
    expect(document.activeElement).toBe(insideButton)

    await user.tab()
    expect(document.activeElement).toBe(outsideButton)
  })

  it('should not be trapped when focus is outside elements', async () => {
    const { getByTestId } = render(
      <>
        <button data-testid='outside-button'>Outside Button</button>
        <TestFocusTrap active>
          <button data-testid='inside-button'>Inside</button>
        </TestFocusTrap>
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
      <TestFocusTrap active>
        <span>No tabbable content</span>
      </TestFocusTrap>,
    )

    const container = getByRole('dialog')
    expect(document.activeElement).toBe(container)

    await user.tab()
    expect(document.activeElement).toBe(container)

    await user.tab({ shift: true })
    expect(document.activeElement).toBe(container)
  })
})
