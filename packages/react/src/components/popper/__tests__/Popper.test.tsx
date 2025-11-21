import { act } from '@testing-library/react'
import {
  renderWithNexUIProvider,
  testComponentStability,
  testVariantDataAttrs,
} from '~/tests/shared'
import {
  Popper,
  PopperRoot,
  PopperContent,
  PopperTrigger,
  PopperPortal,
  PopperMotion,
} from '../index'
import type { PopperProps, PopperRootProps } from '../index'

type TestPopperProps = PopperProps &
  PopperRootProps & {
    keepMounted?: boolean
  }

function TestPopper({
  open,
  defaultOpen,
  openDelay = 0,
  closeDelay = 0,
  onOpenChange,
  keepMounted,
  ...props
}: TestPopperProps) {
  return (
    <Popper
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      <PopperTrigger>
        <button data-testid='popper-trigger'>Trigger</button>
      </PopperTrigger>
      <PopperPortal keepMounted={keepMounted}>
        <PopperRoot data-testid='popper-root' {...props}>
          <PopperMotion>
            <PopperContent data-testid='popper-content'>
              Popper Content
            </PopperContent>
          </PopperMotion>
        </PopperRoot>
      </PopperPortal>
    </Popper>
  )
}

describe('Popper', () => {
  testComponentStability(<TestPopper open />, {
    useAct: true,
  })

  testVariantDataAttrs(<TestPopper open />, ['closeOnEscape', [true, false]], {
    useAct: true,
  })

  testVariantDataAttrs(<TestPopper open />, ['keepMounted', [true, false]], {
    useAct: true,
  })

  testVariantDataAttrs(
    <TestPopper open />,
    [
      'placement',
      [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
      ],
    ],
    {
      useAct: true,
    },
  )

  it('should render with default props', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestPopper open />, {
      useAct: true,
    })

    const root = getByTestId('popper-root')
    expect(root).toHaveAttribute('data-placement', 'top')
    expect(root).toHaveAttribute('data-keep-mounted', 'false')
    expect(root).toHaveAttribute('data-close-on-escape', 'true')
    expect(root).toHaveAttribute('data-state', 'open')

    expect(root).toMatchSnapshot()
  })

  it('should not render children by default', async () => {
    const { queryByTestId } = await renderWithNexUIProvider(<TestPopper />, {
      useAct: true,
    })
    expect(queryByTestId('popper-root')).toBeNull()
  })

  it('should render into document.body via Portal when open', async () => {
    const { container, getByTestId } = await renderWithNexUIProvider(
      <TestPopper open />,
      {
        useAct: true,
      },
    )

    expect(container.children).toHaveLength(1)
    expect(container.firstChild).toHaveTextContent('Trigger')

    const popperRoot = getByTestId('popper-root')

    expect(popperRoot.parentElement).toBe(document.body)
    const popperContent = getByTestId('popper-content')
    expect(popperRoot).toContainElement(popperContent)
  })

  it('should render into document.body via Portal when defaultOpen', async () => {
    const { container, getByTestId } = await renderWithNexUIProvider(
      <TestPopper defaultOpen />,
      {
        useAct: true,
      },
    )
    expect(container.children).toHaveLength(1)
    const popperRoot = getByTestId('popper-root')
    expect(popperRoot.parentElement).toBe(document.body)
    const popperContent = getByTestId('popper-content')
    expect(popperRoot).toContainElement(popperContent)
  })

  it('should be controlled by open prop', async () => {
    const { rerender, queryByTestId } = await renderWithNexUIProvider(
      <TestPopper open={false} />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-root')).toBeNull()

    await act(async () => {
      rerender(<TestPopper open />)
    })

    expect(queryByTestId('popper-root')).toBeInTheDocument()
  })

  it('should close when pressing Escape key if closeOnEscape=true', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper defaultOpen />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(queryByTestId('popper-root')).toBeNull()
  })

  it('should not close when pressing Escape key if closeOnEscape=false', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper closeOnEscape={false} defaultOpen />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(queryByTestId('popper-root')).toBeInTheDocument()
  })

  it('should always keep the children in the DOM when keepMounted=true', async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestPopper keepMounted open={false} />,
      {
        useAct: true,
      },
    )

    const popperRoot = getByTestId('popper-root')
    expect(popperRoot).toBeInTheDocument()

    await act(async () => {
      rerender(<TestPopper keepMounted open />)
    })

    expect(popperRoot).toBeInTheDocument()
  })

  it('should delay opening and closing by default', async () => {
    jest.useFakeTimers()

    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper openDelay={100} closeDelay={100} />,
      {
        useAct: true,
        userEventOptions: { advanceTimers: jest.advanceTimersByTime },
      },
    )

    const trigger = getByTestId('popper-trigger')

    await user.hover(trigger)

    jest.advanceTimersByTime(30)

    expect(queryByTestId('popper-root')).toBeNull()

    await act(async () => {
      jest.advanceTimersByTime(80)
    })

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await user.unhover(trigger)

    jest.advanceTimersByTime(30)

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await act(async () => {
      jest.advanceTimersByTime(80)
    })

    expect(queryByTestId('popper-root')).toBeNull()

    jest.useRealTimers()
  })

  describe('Accessibility', () => {
    it('should be aria-hidden when the popper is closed and keepMounted is true', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopper open={false} keepMounted />,
        {
          useAct: true,
        },
      )
      const popperRoot = getByTestId('popper-root')
      expect(popperRoot).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
