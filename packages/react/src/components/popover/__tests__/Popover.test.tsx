import { waitForElementToBeRemoved } from '@testing-library/react'
import {
  renderWithNexUIProvider,
  testComponentStability,
  testRefForwarding,
  testRootClassName,
} from '~/tests/shared'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '../index'
import { popoverSlotClasses } from './classes'
import type { PopoverProps } from '../index'

function TestPopover(props: PopoverProps) {
  return (
    <Popover data-testid='popover-root' openDelay={0} {...props}>
      <PopoverTrigger>
        <button data-testid='popover-trigger'>Open Popover</button>
      </PopoverTrigger>
      <PopoverContent data-testid='popover-content'>
        This is the popover content.
        <PopoverClose>
          <button data-testid='close-button'>Close</button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}

describe('Popover', () => {
  testComponentStability(<TestPopover open />, {
    useAct: true,
  })

  testRootClassName(<TestPopover open />, {
    useAct: true,
    container: document.body,
  })

  testRefForwarding(<TestPopover open />, {
    useAct: true,
  })

  it('should render with root class', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <TestPopover open />,
      {
        useAct: true,
      },
    )

    const root = getByTestId('popover-root')
    expect(root).toHaveClass(popoverSlotClasses.root)
  })

  it('should render with default props', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <TestPopover open />,
      {
        useAct: true,
      },
    )

    const root = getByTestId('popover-root')
    expect(root).toHaveAttribute('data-placement', 'top')
    expect(root).toHaveAttribute('data-keep-mounted', 'false')
    expect(root).toHaveAttribute('data-close-on-escape', 'true')
    expect(root).toHaveAttribute('data-state', 'open')
  })

  it('should close when PopoverClose is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopover defaultOpen />,
      {
        useAct: true,
      },
    )

    const closeButton = getByTestId('close-button')
    expect(closeButton).toBeInTheDocument()

    await user.click(closeButton)

    await waitForElementToBeRemoved(() => queryByTestId('popover-content'))

    expect(queryByTestId('popover-content')).not.toBeInTheDocument()
  })

  describe('Accessibility', () => {
    it('should have role="dialog" on the root element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopover open />,
        {
          useAct: true,
        },
      )

      const root = getByTestId('popover-root')
      expect(root).toHaveRole('dialog')
    })

    it('should have tableIndex="-1" on the content element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopover open />,
        {
          useAct: true,
        },
      )

      const content = getByTestId('popover-content')
      expect(content).toHaveAttribute('tabindex', '-1')
    })

    it('should have aria-haspopup="dialog" on the trigger element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(<TestPopover />, {
        useAct: true,
      })

      const trigger = getByTestId('popover-trigger')
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
    })

    it('should have aria-expanded="true" on the trigger element when popover is open', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopover open />,
        {
          useAct: true,
        },
      )

      const trigger = getByTestId('popover-trigger')
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })

    it('should have aria-controls on the trigger element when popover is open', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopover open />,
        {
          useAct: true,
        },
      )

      const root = getByTestId('popover-root')
      const trigger = getByTestId('popover-trigger')

      expect(trigger).toHaveAttribute('aria-controls', root.id)
    })

    it('should not have aria-controls on the trigger element when popover is closed', async () => {
      const { getByTestId } = await renderWithNexUIProvider(<TestPopover />, {
        useAct: true,
      })

      const trigger = getByTestId('popover-trigger')

      expect(trigger).not.toHaveAttribute('aria-controls')
    })
  })
})
