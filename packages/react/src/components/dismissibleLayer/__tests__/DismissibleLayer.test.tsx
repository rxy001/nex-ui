import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DismissibleLayer } from '../DismissibleLayer'

describe('DismissibleLayer', () => {
  it('returns children when not a valid React element', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const { container } = render(
      // @ts-expect-error testing non-element child passthrough
      <DismissibleLayer>{'plain text'}</DismissibleLayer>,
    )
    expect(consoleSpy).toHaveBeenCalled()
    expect(container).toHaveTextContent('plain text')
    consoleSpy.mockRestore()
  })

  it('calls pointer down outside callbacks and dismisses', () => {
    const onPointerDownOutside = jest.fn()
    const onInteractOutside = jest.fn()
    const onDismiss = jest.fn()

    render(
      <DismissibleLayer
        onPointerDownOutside={onPointerDownOutside}
        onInteractOutside={onInteractOutside}
        onDismiss={onDismiss}
      >
        <button>inside</button>
      </DismissibleLayer>,
    )

    fireEvent.pointerDown(document.body)

    expect(onPointerDownOutside).toHaveBeenCalledTimes(1)
    expect(onInteractOutside).toHaveBeenCalledTimes(1)
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not dismiss when pointer down outside handler prevents default', () => {
    const onPointerDownOutside = jest.fn((event) => {
      event.preventDefault()
    })
    const onInteractOutside = jest.fn()
    const onDismiss = jest.fn()

    render(
      <DismissibleLayer
        onPointerDownOutside={onPointerDownOutside}
        onInteractOutside={onInteractOutside}
        onDismiss={onDismiss}
      >
        <button>inside</button>
      </DismissibleLayer>,
    )

    fireEvent.pointerDown(document.body)

    expect(onPointerDownOutside).toHaveBeenCalledTimes(1)
    expect(onInteractOutside).toHaveBeenCalledTimes(1)
    expect(onDismiss).not.toHaveBeenCalled()
  })

  it('calls focus outside callbacks and dismisses when focus moves outside', () => {
    const onFocusOutside = jest.fn()
    const onInteractOutside = jest.fn()
    const onDismiss = jest.fn()

    render(
      <>
        <button data-testid='outside'>outside</button>
        <DismissibleLayer
          onFocusOutside={onFocusOutside}
          onInteractOutside={onInteractOutside}
          onDismiss={onDismiss}
        >
          <button data-testid='inside'>inside</button>
        </DismissibleLayer>
      </>,
    )

    const inside = screen.getByTestId('inside')
    const outside = screen.getByTestId('outside')

    fireEvent.focus(inside)
    expect(onFocusOutside).not.toHaveBeenCalled()

    fireEvent.blur(inside)
    fireEvent.focus(outside)

    expect(onFocusOutside).toHaveBeenCalledTimes(1)
    expect(onInteractOutside).toHaveBeenCalledTimes(1)
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not dismiss when focus outside handler prevents default', () => {
    const onFocusOutside = jest.fn((event) => {
      event.preventDefault()
    })
    const onInteractOutside = jest.fn()
    const onDismiss = jest.fn()

    render(
      <>
        <button data-testid='outside'>outside</button>
        <DismissibleLayer
          onFocusOutside={onFocusOutside}
          onInteractOutside={onInteractOutside}
          onDismiss={onDismiss}
        >
          <button data-testid='inside'>inside</button>
        </DismissibleLayer>
      </>,
    )

    const outside = screen.getByTestId('outside')

    fireEvent.focus(outside)

    expect(onFocusOutside).toHaveBeenCalledTimes(1)
    expect(onInteractOutside).toHaveBeenCalledTimes(1)
    expect(onDismiss).not.toHaveBeenCalled()
  })

  it('handles Escape key and dismisses by default', () => {
    const onEscapeKeyDown = jest.fn()
    const onDismiss = jest.fn()

    render(
      <DismissibleLayer onEscapeKeyDown={onEscapeKeyDown} onDismiss={onDismiss}>
        <button>inside</button>
      </DismissibleLayer>,
    )

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(onEscapeKeyDown).toHaveBeenCalledTimes(1)
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not dismiss when Escape handler prevents default', () => {
    const onEscapeKeyDown = jest.fn((event) => {
      event.preventDefault()
    })
    const onDismiss = jest.fn()

    render(
      <DismissibleLayer onEscapeKeyDown={onEscapeKeyDown} onDismiss={onDismiss}>
        <button>inside</button>
      </DismissibleLayer>,
    )

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(onEscapeKeyDown).toHaveBeenCalledTimes(1)
    expect(onDismiss).not.toHaveBeenCalled()
  })

  it('handles multiple DismissibleLayers independently', () => {
    const onDismissFirst = jest.fn()
    const onDismissSecond = jest.fn()

    render(
      <>
        <DismissibleLayer onDismiss={onDismissFirst}>
          <div>
            <DismissibleLayer
              onDismiss={onDismissSecond}
              onEscapeKeyDown={(event) => {
                event.preventDefault()
              }}
            >
              <button>inside</button>
            </DismissibleLayer>
          </div>
        </DismissibleLayer>
      </>,
    )

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(onDismissFirst).toHaveBeenCalledTimes(1)
    expect(onDismissSecond).toHaveBeenCalledTimes(0)
  })
})
