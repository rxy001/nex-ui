import {
  testComponentStability,
  renderWithNexUIProvider,
  testVariantDataAttrs,
  testSizeDataAttrs,
  testRadiusDataAttrs,
  testRefForwarding,
  testClassNamesForwarding,
  testSlotPropsForwarding,
} from '~/tests/shared'
import { waitFor } from '@testing-library/react'
import { Tooltip } from '../index'
import { tooltipSlotClasses } from './classes'
import type { TooltipProps } from '../index'

const slots = ['content'] as const

const TestTooltip = (props: TooltipProps) => {
  return (
    <Tooltip content='content' data-testid='tooltip-root' {...props}>
      <button data-testid='tooltip-trigger'>Trigger</button>
    </Tooltip>
  )
}

describe('Tooltip', () => {
  testComponentStability(<TestTooltip open />)

  testVariantDataAttrs(
    <TestTooltip open />,
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

  testSizeDataAttrs(<TestTooltip open />, {
    useAct: true,
  })

  testRadiusDataAttrs(<TestTooltip open />, {
    useAct: true,
  })

  testRefForwarding(<TestTooltip open />, {
    useAct: true,
  })

  testClassNamesForwarding(
    <TestTooltip open />,
    slots,
    { content: 'test-content' },
    tooltipSlotClasses,
    {
      useAct: true,
    },
  )

  testSlotPropsForwarding(
    <TestTooltip open />,
    slots,
    {
      content: {
        className: 'test-content',
      },
    },
    tooltipSlotClasses,
    {
      useAct: true,
    },
  )

  it('should have the correct root class name', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <TestTooltip open />,
      {
        useAct: true,
      },
    )

    const tooltipRoot = getByTestId('tooltip-root')
    expect(tooltipRoot).toHaveClass(tooltipSlotClasses.root)
  })

  it('should render with default props', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <TestTooltip open />,
      {
        useAct: true,
      },
    )

    const tooltipRoot = getByTestId('tooltip-root')
    expect(tooltipRoot).toHaveAttribute('data-color', 'default')
    expect(tooltipRoot).toHaveAttribute('data-size', 'md')
    expect(tooltipRoot).toHaveAttribute('data-radius', 'md')
  })

  it('should render with root, content class', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <TestTooltip open />,
      {
        useAct: true,
      },
    )

    const tooltipRoot = getByTestId('tooltip-root')
    expect(tooltipRoot).toHaveClass(tooltipSlotClasses.root)

    expect(tooltipRoot.firstElementChild?.firstElementChild).toHaveClass(
      tooltipSlotClasses.content,
    )
  })

  it('should render null when content={null}', async () => {
    const { queryByTestId } = await renderWithNexUIProvider(
      <TestTooltip open content={null} />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('tooltip-root')).toBeNull()
  })

  it('should disable animations when disableAnimation=true', () => {
    const { queryByClassName } = renderWithNexUIProvider(
      <TestTooltip
        open
        disableAnimation
        motionProps={{
          className: 'test-motion',
        }}
      />,
    )
    expect(queryByClassName('test-motion')).not.toBeInTheDocument()
  })

  it('should keep the tooltip open when interacting with its content if interactive is true', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestTooltip interactive />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('tooltip-trigger')

    expect(queryByTestId('tooltip-root')).not.toBeInTheDocument()

    await user.hover(trigger)
    await waitFor(() =>
      expect(queryByTestId('tooltip-root')).toBeInTheDocument(),
    )

    const root = getByTestId('tooltip-root')

    await user.hover(root)
    await user.unhover(trigger)

    expect(root).toBeInTheDocument()

    await user.click(root)

    expect(root).toBeInTheDocument()

    await user.click(document.body)

    await expect(root).not.toBeInTheDocument()
  })

  it('should close the tooltip when interacting with its content if interactive is false', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestTooltip interactive={false} />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('tooltip-trigger')

    expect(queryByTestId('tooltip-root')).not.toBeInTheDocument()
    await user.hover(trigger)

    await waitFor(async () =>
      expect(queryByTestId('tooltip-root')).toBeInTheDocument(),
    )

    const root = getByTestId('tooltip-root')

    await user.hover(root)
    await user.unhover(trigger)

    await waitFor(async () => expect(root).not.toBeInTheDocument())
  })

  describe('Accessibility', () => {
    it('should have aria-describedby on the trigger element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestTooltip open />,

        {
          useAct: true,
        },
      )

      const trigger = getByTestId('tooltip-trigger')
      const root = getByTestId('tooltip-root')

      expect(trigger).toHaveAttribute('aria-describedby', root.id)
    })

    it('should not have aria-describedby on the trigger element when the tooltip is closed', async () => {
      const { getByTestId } = await renderWithNexUIProvider(<TestTooltip />, {
        useAct: true,
      })
      const trigger = getByTestId('tooltip-trigger')

      expect(trigger).not.toHaveAttribute('aria-describedby')
    })

    it('should have role="tooltip" on the root element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestTooltip open />,
        {
          useAct: true,
        },
      )

      const root = getByTestId('tooltip-root')

      expect(root).toHaveAttribute('role', 'tooltip')
    })
  })
})
