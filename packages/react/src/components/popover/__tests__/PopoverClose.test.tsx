import { renderWithNexUIProvider } from '~/tests/shared'
import { Popover, PopoverClose, PopoverContent } from '../index'
import type { PopoverCloseProps } from '../index'

function TestPopover(props: PopoverCloseProps) {
  return (
    <Popover data-testid='popover-root' defaultOpen>
      <PopoverContent data-testid='popover-content'>
        This is the popover content.
        <PopoverClose {...props} />
      </PopoverContent>
    </Popover>
  )
}

describe('PopoverClose', () => {
  it('should close when the PopoverClose is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopover>
        <button data-testid='close-button'>Close Popover</button>
      </TestPopover>,
      {
        useAct: true,
      },
    )

    const popoverRoot = queryByTestId('popover-root')
    expect(popoverRoot).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await user.click(closeButton)
    expect(popoverRoot).not.toBeInTheDocument()
  })

  it("should return children as-is when PopoverClose's children is not a valid React element", async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const { container } = await renderWithNexUIProvider(
      <TestPopover>Close Popover</TestPopover>,
      {
        container: document.body,
        useAct: true,
      },
    )

    expect(container.textContent).toContain('Close Popover')
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  describe('Accessibility', () => {
    it('should have aria-label="Close" by default', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopover>
          <button data-testid='close-button'>Close Popover</button>
        </TestPopover>,
        {
          useAct: true,
        },
      )

      const closeButton = getByTestId('close-button')

      expect(closeButton).toHaveAttribute('aria-label', 'Close')
    })
  })
})
