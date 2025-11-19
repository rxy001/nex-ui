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

type TestPopperProps = PopperProps & PopperRootProps

function TestPopper({
  open,
  defaultOpen,
  openDelay = 0,
  closeDelay = 0,
  onOpenChange,
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
      <PopperPortal>
        <PopperMotion>
          <PopperRoot data-testid='popper-root' {...props}>
            <PopperContent data-testid='popper-content'>
              Popper Content
            </PopperContent>
          </PopperRoot>
        </PopperMotion>
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

    expect(popperRoot.parentElement?.parentElement).toBe(document.body)
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
    expect(popperRoot.parentElement?.parentElement).toBe(document.body)
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
})
