import { act } from '@testing-library/react'
import {
  renderWithNexUIProvider,
  testComponentStability,
  testVariantDataAttrs,
} from '~/tests/shared'
import { Button } from '../../button'
import { Popper, PopperRoot, PopperContent, PopperTrigger } from '../index'
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
        <Button data-testid='popper-trigger'>Trigger</Button>
      </PopperTrigger>
      <PopperRoot data-testid='popper-root' {...props}>
        <PopperContent data-testid='popper-content'>
          Popper Content
        </PopperContent>
      </PopperRoot>
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

  it('should always keep the children in the DOM when keepMounted=true', async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestPopper keepMounted open={false} />,
      {
        useAct: true,
      },
    )

    let popperRoot = getByTestId('popper-root')
    expect(popperRoot).toHaveStyle({
      display: 'none',
      opacity: '0',
    })

    await act(async () => {
      rerender(<TestPopper keepMounted open />)
    })

    popperRoot = getByTestId('popper-root')

    expect(popperRoot).toHaveStyle({
      display: 'block',
      opacity: '1',
    })
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
      <Popper>
        <PopperTrigger>
          <Button data-testid='popper-trigger'>Trigger</Button>
        </PopperTrigger>
        <PopperRoot data-testid='popper-root'>
          <PopperContent data-testid='popper-content'>
            Popper Content
          </PopperContent>
        </PopperRoot>
      </Popper>,
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
    it('should have aria-describedby on the trigger element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopper open />,
        {
          useAct: true,
        },
      )

      const trigger = getByTestId('popper-trigger')
      const root = getByTestId('popper-root')

      expect(trigger).toHaveAttribute('aria-describedby', root.id)
    })

    it('should not have aria-describedby on the trigger element when the popper is closed', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopper open={false} />,
        {
          useAct: true,
        },
      )
      const trigger = getByTestId('popper-trigger')

      expect(trigger).not.toHaveAttribute('aria-describedby')
    })

    it('should have role="tooltip" on the root element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopper open />,
        {
          useAct: true,
        },
      )

      const root = getByTestId('popper-root')

      expect(root).toHaveAttribute('role', 'tooltip')
    })

    it('should be aria-hidden when the popper is closed and keepMounted is true', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopper open={false} keepMounted />,
        {
          useAct: true,
        },
      )

      const root = getByTestId('popper-root')

      expect(root).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
