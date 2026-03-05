import { renderWithNexUIProvider, testComponentStability } from '~/tests/shared'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '../index'
import type { PopoverProps } from '../index'

function TestPopover(props: PopoverProps) {
  return (
    <Popover {...props}>
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

  it('should pointer outside to close the popover', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopover defaultOpen />,
      {
        useAct: true,
      },
    )

    await user.pointer({ keys: '[MouseLeft]', target: document.body })
    expect(queryByTestId('popover-content')).not.toBeInTheDocument()
  })
})
