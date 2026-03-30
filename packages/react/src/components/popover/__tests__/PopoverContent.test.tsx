import {
  testRefForwarding,
  testVariantDataAttrs,
  renderWithNexUIProvider,
  testSizeDataAttrs,
} from '~/tests/shared'
import { Popover, PopoverTrigger, PopoverContent } from '../index'
import { Button } from '../../button'
import { popoverContentSlotClasses } from './classes'
import type { PopoverContentProps } from '../index'

function TestPopover(props: PopoverContentProps) {
  return (
    <Popover open>
      <PopoverTrigger>
        <Button data-testid='popover-trigger'>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent data-testid='popover-content' {...props}>
        This is the popover content.
      </PopoverContent>
    </Popover>
  )
}

describe('PopoverContent', () => {
  testRefForwarding(<TestPopover />, { useAct: true })

  testVariantDataAttrs(
    <TestPopover />,
    [
      'color',
      [
        'default',
        'blue',
        'orange',
        'cyan',
        'gray',
        'red',
        'green',
        'pink',
        'purple',
        'yellow',
      ],
    ],
    {
      useAct: true,
    },
  )

  testSizeDataAttrs(<TestPopover />, {
    useAct: true,
  })

  testVariantDataAttrs(
    <TestPopover />,
    ['radius', ['none', 'sm', 'md', 'lg']],
    {
      useAct: true,
    },
  )

  it('should render with content class', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestPopover />, {
      useAct: true,
    })

    const content = getByTestId('popover-content')
    expect(content).toHaveClass(popoverContentSlotClasses.root)
  })

  it('should render with default props', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestPopover />, {
      useAct: true,
    })

    const content = getByTestId('popover-content')
    expect(content).toHaveAttribute('data-color', 'default')
    expect(content).toHaveAttribute('data-radius', 'md')
  })

  describe('Accessibility', () => {
    it('should have role="dialog" on the root element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(<TestPopover />, {
        useAct: true,
      })

      const root = getByTestId('popover-content')
      expect(root).toHaveRole('dialog')
    })
  })
})
