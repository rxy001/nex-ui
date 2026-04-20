import { act, useState } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RovingFocusGroup, RovingFocusItem } from '../index'
import type { UserEvent } from '@testing-library/user-event'
import type { RovingFocusGroupProps } from '../index'

function TestRovingFocus(props: RovingFocusGroupProps<string>) {
  const [focusItemId, setFocusItemId] = useState<string>('red')

  return (
    <RovingFocusGroup
      focusItemId={focusItemId}
      onFocusItemIdChange={setFocusItemId}
      {...props}
    >
      <div data-testid='container'>
        <RovingFocusItem id='red'>
          <button data-testid='red'>red</button>
        </RovingFocusItem>
        <RovingFocusItem id='blue'>
          <button data-testid='blue'>blue</button>
        </RovingFocusItem>
        <RovingFocusItem id='orange'>
          <button data-testid='orange'>orange</button>
        </RovingFocusItem>
        <div data-testid='content'>{focusItemId}</div>
      </div>
    </RovingFocusGroup>
  )
}

describe('RovingFocus', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('should focus the first focusable item when container is focused', async () => {
    const { getByTestId } = render(
      <RovingFocusGroup>
        <div data-testid='container'>
          <RovingFocusItem id='non-focusable' focusable={false}>
            <button data-testid='non-focusable'>non-focusable</button>
          </RovingFocusItem>
          <RovingFocusItem id='red'>
            <button data-testid='red'>red</button>
          </RovingFocusItem>
        </div>
      </RovingFocusGroup>,
    )

    await user.tab()

    const redButton = getByTestId('red')
    expect(redButton).toHaveFocus()
  })

  it('should handle keyboard navigation (no orientation (both) + no looping)', async () => {
    const { getByTestId } = render(<TestRovingFocus loop={false} />)

    const content = getByTestId('content')
    expect(content.textContent).toBe('red')

    await user.tab()
    await user.keyboard('{ArrowRight}')
    expect(content.textContent).toBe('blue')

    await user.keyboard('{ArrowDown}')
    expect(content.textContent).toBe('orange')

    await user.keyboard('{ArrowDown}')
    expect(content.textContent).toBe('orange')

    await user.keyboard('{ArrowLeft}')
    expect(content.textContent).toBe('blue')

    await user.keyboard('{ArrowUp}')
    expect(content.textContent).toBe('red')

    await user.keyboard('{ArrowLeft}')
    expect(content.textContent).toBe('red')
  })

  it('should handle keyboard navigation (no orientation (both) + looping)', async () => {
    const { getByTestId } = render(<TestRovingFocus loop />)

    const content = getByTestId('content')
    expect(content.textContent).toBe('red')

    await user.tab()
    await user.keyboard('{ArrowLeft}')
    expect(content.textContent).toBe('orange')

    await user.keyboard('{ArrowUp}')
    expect(content.textContent).toBe('blue')

    await user.keyboard('{ArrowRight}')
    expect(content.textContent).toBe('orange')

    await user.keyboard('{ArrowDown}')
    expect(content.textContent).toBe('red')
  })

  it('should handle keyboard navigation (horizontal + no looping)', async () => {
    const { getByTestId } = render(
      <TestRovingFocus orientation='horizontal' loop={false} />,
    )

    const content = getByTestId('content')
    expect(content.textContent).toBe('red')

    await user.tab()
    await user.keyboard('{ArrowRight}')
    expect(content.textContent).toBe('blue')

    await user.keyboard('{ArrowDown}')
    expect(content.textContent).toBe('blue')

    await user.keyboard('{ArrowUp}')
    expect(content.textContent).toBe('blue')

    await user.keyboard('{ArrowRight}')
    expect(content.textContent).toBe('orange')

    await user.keyboard('{ArrowRight}')
    expect(content.textContent).toBe('orange')

    await user.keyboard('{ArrowLeft}')
    expect(content.textContent).toBe('blue')
  })

  it('should handle keyboard navigation (vertical + no looping)', async () => {
    const { getByTestId } = render(
      <TestRovingFocus orientation='vertical' loop={false} />,
    )

    const content = getByTestId('content')
    expect(content.textContent).toBe('red')

    await user.tab()
    await user.keyboard('{ArrowDown}')
    expect(content.textContent).toBe('blue')

    await user.keyboard('{ArrowRight}')
    expect(content.textContent).toBe('blue')

    await user.keyboard('{ArrowLeft}')
    expect(content.textContent).toBe('blue')

    await user.keyboard('{ArrowDown}')
    expect(content.textContent).toBe('orange')

    await user.keyboard('{ArrowDown}')
    expect(content.textContent).toBe('orange')

    await user.keyboard('{ArrowUp}')
    expect(content.textContent).toBe('blue')
  })

  it('should handle keyboard navigation (horizontal + looping)', async () => {
    const { getByTestId } = render(
      <TestRovingFocus orientation='horizontal' loop />,
    )

    const content = getByTestId('content')
    expect(content.textContent).toBe('red')

    await user.tab()
    await user.keyboard('{ArrowLeft}')
    expect(content.textContent).toBe('orange')

    await user.keyboard('{ArrowLeft}')
    expect(content.textContent).toBe('blue')

    await user.keyboard('{ArrowRight}')
    expect(content.textContent).toBe('orange')

    await user.keyboard('{ArrowRight}')
    expect(content.textContent).toBe('red')
  })

  it('should handle keyboard navigation (vertical + looping)', async () => {
    const { getByTestId } = render(
      <TestRovingFocus orientation='vertical' loop />,
    )

    const content = getByTestId('content')
    expect(content.textContent).toBe('red')

    await user.tab()
    await user.keyboard('{ArrowUp}')
    expect(content.textContent).toBe('orange')

    await user.keyboard('{ArrowUp}')
    expect(content.textContent).toBe('blue')

    await user.keyboard('{ArrowDown}')
    expect(content.textContent).toBe('orange')

    await user.keyboard('{ArrowDown}')
    expect(content.textContent).toBe('red')
  })

  it('should handle Home and End key navigation correctly', async () => {
    const { getByTestId } = render(<TestRovingFocus />)

    const content = getByTestId('content')
    expect(content.textContent).toBe('red')

    await user.tab()
    await user.keyboard('{End}')
    expect(content.textContent).toBe('orange')
    await user.keyboard('{Home}')
    expect(content.textContent).toBe('red')
  })

  it('should backward tab to previous focusable element from container inner', async () => {
    const { getByTestId } = render(
      <>
        <button data-testid='before'>before</button>
        <TestRovingFocus />
      </>,
    )

    const beforeButton = getByTestId('before')
    const container = getByTestId('container')
    const redButton = getByTestId('red')

    expect(beforeButton).not.toHaveFocus()
    expect(container).not.toHaveFocus()
    expect(redButton).not.toHaveFocus()

    await user.tab()
    expect(beforeButton).toHaveFocus()

    await user.tab()
    expect(redButton).toHaveFocus()

    await user.tab({
      shift: true,
    })
    expect(beforeButton).toHaveFocus()
  })

  it('should ignore specific keys for processing during keyboard navigation', async () => {
    const { getByTestId } = render(<TestRovingFocus />)

    const content = getByTestId('content')
    expect(content.textContent).toBe('red')

    await user.tab()
    await user.keyboard('{Meta>}{ArrowRight}{/Meta}')
    expect(content.textContent).toBe('red')

    await user.keyboard('{Control>}{ArrowRight}{/Control}')
    expect(content.textContent).toBe('red')

    await user.keyboard('{Alt>}{ArrowRight}{/Alt}')
    expect(content.textContent).toBe('red')

    await user.keyboard('{Shift>}{ArrowRight}{/Shift}')
    expect(content.textContent).toBe('red')
  })

  it("should return children as-is when RovingFocusGroup's children is not a valid React element", () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const { container } = render(
      // @ts-expect-error
      <RovingFocusGroup>Invalid Element</RovingFocusGroup>,
    )
    expect(container.textContent).toBe('Invalid Element')
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  describe('No focusable items', () => {
    function NoFocusableItems() {
      const [focusItemId, setFocusItemId] = useState<string>('')

      return (
        <RovingFocusGroup
          focusItemId={focusItemId}
          onFocusItemIdChange={setFocusItemId}
        >
          <div data-testid='container'>
            <RovingFocusItem id='red' focusable={false}>
              <button data-testid='red'>red</button>
            </RovingFocusItem>
            <RovingFocusItem id='blue' focusable={false}>
              <button data-testid='blue'>blue</button>
            </RovingFocusItem>
            <div data-testid='content'>{focusItemId}</div>
          </div>
        </RovingFocusGroup>
      )
    }

    it('should ignore keyboard navigation', async () => {
      const { getByTestId } = render(<NoFocusableItems />)

      const container = getByTestId('container')
      const content = getByTestId('content')

      await act(async () => {
        container.focus()
      })
      await user.keyboard('{ArrowRight}')
      expect(content.textContent).toBe('')
    })
  })
})
