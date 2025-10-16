import {
  testComponentStability,
  renderWithNexUIProvider,
  testRefForwarding,
  testVariantDataAttrs,
} from '~/tests/shared'
import { fireEvent } from '@testing-library/react'
import { ButtonBase } from '../index'
import type { ButtonHTMLAttributes } from 'react'

describe('ButtonBase', () => {
  testComponentStability(<ButtonBase />)

  testRefForwarding(<ButtonBase />)

  testVariantDataAttrs(<ButtonBase>Button</ButtonBase>, [
    'disabled',
    [true, false],
  ])

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(
      <ButtonBase>Button</ButtonBase>,
    )

    const root = container.firstElementChild

    expect(root).toMatchSnapshot()
  })

  it('should have type="button" by default', () => {
    const { getByRole } = renderWithNexUIProvider(
      <ButtonBase>Button</ButtonBase>,
    )
    expect(getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('should change type when type prop is provided', () => {
    const { getByRole } = renderWithNexUIProvider(
      <ButtonBase type='submit'>Submit</ButtonBase>,
    )
    expect(getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('should change component type and add accessibility attributes when as prop is provided', () => {
    const { getByRole } = renderWithNexUIProvider(
      <ButtonBase as='span'>Link</ButtonBase>,
    )
    const button = getByRole('button')
    expect(button.tagName).toBe('SPAN')
    expect(button).toHaveAttribute('tabIndex', '0')
    expect(button).not.toHaveAttribute('type')
  })

  it('should not apply role="button" when rendered as a button', () => {
    const { getByRole } = renderWithNexUIProvider(
      <ButtonBase as='button'>Button</ButtonBase>,
    )
    const button = getByRole('button')
    expect(button).not.toHaveAttribute('role', 'button')
  })

  it('should automatically change the button to an anchor element when href is provided', () => {
    const { getByRole } = renderWithNexUIProvider(
      <ButtonBase href='https://example.com'>Link</ButtonBase>,
    )
    const link = getByRole('link')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).not.toHaveAttribute('type')
    expect(link).not.toHaveAttribute('role')
  })

  it('should apply role="button" when anchor is used without href', () => {
    const { getByRole } = renderWithNexUIProvider(
      <ButtonBase as='a'>Anchor</ButtonBase>,
    )
    const anchor = getByRole('button')
    expect(anchor.tagName).toBe('A')
    expect(anchor).not.toHaveAttribute('type')
  })

  it('should not apply role="button" when as prop is custom component', () => {
    const Component = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>Custom</button>
    )

    const { getByRole } = renderWithNexUIProvider(
      <ButtonBase as={Component}>Button</ButtonBase>,
    )

    const button = getByRole('button')
    expect(button).not.toHaveAttribute('role', 'button')
  })

  it('should fire event callbacks', async () => {
    const onClick = jest.fn()
    const onBlur = jest.fn()
    const onFocus = jest.fn()
    const onKeyUp = jest.fn()
    const onKeyDown = jest.fn()
    const onMouseDown = jest.fn()
    const onMouseLeave = jest.fn()
    const onMouseUp = jest.fn()
    const onContextMenu = jest.fn()
    const onTouchStart = jest.fn()
    const onTouchEnd = jest.fn()

    const { getByText } = renderWithNexUIProvider(
      <ButtonBase
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onContextMenu={onContextMenu}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      >
        Hello
      </ButtonBase>,
    )

    const button = getByText('Hello')

    // only run in supported browsers
    if (typeof Touch !== 'undefined') {
      fireEvent.touchStart(button)
      expect(onTouchStart).toHaveBeenCalled()

      fireEvent.touchEnd(button)
      expect(onTouchEnd).toHaveBeenCalled()
    }

    fireEvent.mouseDown(button)
    expect(onMouseDown).toHaveBeenCalled()

    fireEvent.mouseUp(button)
    expect(onMouseUp).toHaveBeenCalled()

    fireEvent.contextMenu(button)
    expect(onContextMenu).toHaveBeenCalled()

    fireEvent.click(button)
    expect(onClick).toHaveBeenCalled()

    fireEvent.focus(button)
    expect(onFocus).toHaveBeenCalled()

    fireEvent.keyDown(button)
    expect(onKeyDown).toHaveBeenCalled()

    fireEvent.keyUp(button)
    expect(onKeyUp).toHaveBeenCalled()

    fireEvent.blur(button)
    expect(onBlur).toHaveBeenCalled()

    fireEvent.mouseLeave(button)
    expect(onMouseLeave).toHaveBeenCalled()
  })

  it('should apply data-focus-visible="true" when keyboard focused', async () => {
    const { getByRole, user } = renderWithNexUIProvider(
      <ButtonBase>Focusable Button</ButtonBase>,
    )

    const button = getByRole('button')

    expect(button).not.toHaveAttribute('data-focus-visible')

    await user.tab()
    expect(document.activeElement).toBe(button)
    expect(button).toHaveAttribute('data-focus-visible', 'true')
  })

  it('should activate button element when Space or Enter is pressed', async () => {
    const onClick = jest.fn()

    const { user, getByRole } = renderWithNexUIProvider(
      <ButtonBase onClick={onClick}>Focusable Button</ButtonBase>,
    )

    const button = getByRole('button')
    await user.tab()
    expect(document.activeElement).toBe(button)

    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(1)

    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('should activate non-interactive elements when Space or Enter is pressed', async () => {
    const onClick = jest.fn()

    const { user, getByRole } = renderWithNexUIProvider(
      <ButtonBase as='span' onClick={onClick}>
        Focusable Span
      </ButtonBase>,
    )

    const span = getByRole('button')
    await user.tab()
    expect(document.activeElement).toBe(span)

    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(1)

    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('should prevent repeated click event triggering when the Enter key is pressed', async () => {
    const onClick = jest.fn()

    const { getByRole, user } = renderWithNexUIProvider(
      <ButtonBase onClick={onClick}>Button</ButtonBase>,
    )

    const button = getByRole('button')

    await user.tab()
    expect(document.activeElement).toBe(button)

    await user.keyboard('{Enter>5/}')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  describe('disabled', () => {
    it('should apply disabled attribute with native button', () => {
      const { getByRole } = renderWithNexUIProvider(
        <ButtonBase disabled>Disabled Button</ButtonBase>,
      )

      const button = getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should apply tabIndex=-1', () => {
      const { getByRole } = renderWithNexUIProvider(
        <ButtonBase disabled>Disabled Button</ButtonBase>,
      )

      const button = getByRole('button')
      expect(button).toHaveAttribute('tabIndex', '-1')
    })

    it('should not use aria-disabled with native button', () => {
      const { getByRole } = renderWithNexUIProvider(
        <ButtonBase disabled>Disabled Button</ButtonBase>,
      )

      const button = getByRole('button')
      expect(button).not.toHaveAttribute('aria-disabled')
    })

    it('should use aria-disabled with non-button', () => {
      const { getByRole } = renderWithNexUIProvider(
        <ButtonBase as='span' disabled>
          Disabled Span
        </ButtonBase>,
      )

      const span = getByRole('button')
      expect(span).toHaveAttribute('aria-disabled', 'true')
    })

    it('should not fire event callbacks', () => {
      const onClick = jest.fn()
      const onKeyUp = jest.fn()
      const onKeyDown = jest.fn()

      const { getByRole } = renderWithNexUIProvider(
        <ButtonBase
          as='span'
          disabled
          onClick={onClick}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
        >
          Disabled Span
        </ButtonBase>,
      )
      const span = getByRole('button')

      fireEvent.click(span)
      expect(onClick).not.toHaveBeenCalled()

      fireEvent.keyUp(span)
      expect(onKeyUp).not.toHaveBeenCalled()

      fireEvent.keyDown(span)
      expect(onKeyDown).not.toHaveBeenCalled()
    })
  })
})
