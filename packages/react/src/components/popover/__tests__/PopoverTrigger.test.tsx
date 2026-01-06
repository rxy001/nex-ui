import { renderWithNexUIProvider } from '~/tests/shared'
import { waitFor } from '@testing-library/react'
import { Popover, PopoverContent, PopoverTrigger } from '../index'
import type { PopoverTriggerProps } from '../index'

function TestPopover(props: PopoverTriggerProps) {
  return (
    <Popover data-testid='popover-root'>
      <PopoverTrigger {...props} />
      <PopoverContent data-testid='popover-content'>
        This is the popover content.
      </PopoverContent>
    </Popover>
  )
}

describe('PopoverTrigger', () => {
  it('should open when the PopoverTrigger is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopover>
        <button data-testid='popover-trigger'>Trigger</button>
      </TestPopover>,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popover-trigger')

    expect(queryByTestId('popover-root')).not.toBeInTheDocument()

    await user.click(trigger)

    await waitFor(() =>
      expect(queryByTestId('popover-root')).toBeInTheDocument(),
    )

    await user.click(trigger)

    await waitFor(() =>
      expect(queryByTestId('popover-root')).not.toBeInTheDocument(),
    )
  })

  it("should return children as-is when PopoverTrigger's children is not a valid React element", async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const { container } = await renderWithNexUIProvider(
      <TestPopover>Invalid Element</TestPopover>,
      {
        useAct: true,
      },
    )

    expect(container.textContent).toBe('Invalid Element')
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('should not close when the PopoverTrigger is clicked and closeOnClick is false', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopover closeOnClick={false}>
        <button data-testid='popover-trigger'>Trigger</button>
      </TestPopover>,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popover-trigger')

    expect(queryByTestId('popover-root')).not.toBeInTheDocument()

    await user.click(trigger)

    expect(queryByTestId('popover-root')).toBeInTheDocument()

    await user.click(trigger)

    expect(queryByTestId('popover-root')).toBeInTheDocument()
  })

  describe('Accessibility', () => {
    it('should have aria-haspopup attribute', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopover>
          <button data-testid='popover-trigger'>Trigger</button>
        </TestPopover>,
        {
          useAct: true,
        },
      )

      const trigger = getByTestId('popover-trigger')
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
    })

    it('should have aria-expanded attribute', async () => {
      const { getByTestId, user } = await renderWithNexUIProvider(
        <TestPopover>
          <button data-testid='popover-trigger'>Trigger</button>
        </TestPopover>,
        {
          useAct: true,
        },
      )

      const trigger = getByTestId('popover-trigger')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      await user.click(trigger)

      expect(trigger).toHaveAttribute('aria-expanded', 'true')

      await user.click(trigger)

      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('should have aria-controls attribute when popover is open', async () => {
      const { getByTestId, user } = await renderWithNexUIProvider(
        <TestPopover>
          <button data-testid='popover-trigger'>Trigger</button>
        </TestPopover>,
        {
          useAct: true,
        },
      )

      const trigger = getByTestId('popover-trigger')
      expect(trigger).not.toHaveAttribute('aria-controls')

      await user.click(trigger)

      const popover = getByTestId('popover-root')
      expect(trigger).toHaveAttribute(
        'aria-controls',
        popover.getAttribute('id') || '',
      )
    })
  })
})
