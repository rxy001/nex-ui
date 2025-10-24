import {
  testComponentStability,
  renderWithNexUIProvider,
  testVariantDataAttrs,
  testSizeDataAttrs,
  testRadiusDataAttrs,
  testRefForwarding,
  testClassNamesForwarding,
  testSlotPropsForwarding,
  testRootClassName,
} from '~/tests/shared'
import { Tooltip } from '../index'
import { tooltipSlotClasses } from './classes'

const slots = ['content'] as const

describe('Tooltip', () => {
  testComponentStability(<Tooltip open content='Content' />)

  testVariantDataAttrs(
    <Tooltip open content='Content' />,
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

  testSizeDataAttrs(<Tooltip open content='Content' />, {
    useAct: true,
  })

  testRadiusDataAttrs(<Tooltip open content='Content' />, {
    useAct: true,
  })

  testRefForwarding(<Tooltip open content='Content' />, {
    useAct: true,
  })

  testClassNamesForwarding(
    <Tooltip open content='Content' />,
    slots,
    { content: 'test-content' },
    tooltipSlotClasses,
    {
      useAct: true,
    },
  )

  testSlotPropsForwarding(
    <Tooltip open content='Content' />,
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

  testRootClassName(<Tooltip open content='Content' />, {
    useAct: true,
    container: document.body,
  })

  it('should render with default props', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <Tooltip open content='Content' data-testid='tooltip-root' />,
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
      <Tooltip open content='Content' data-testid='tooltip-root' />,
      {
        useAct: true,
      },
    )

    const tooltipRoot = getByTestId('tooltip-root')
    expect(tooltipRoot).toHaveClass(tooltipSlotClasses.root)

    expect(tooltipRoot.firstElementChild).toHaveClass(
      tooltipSlotClasses.content,
    )
  })

  it('should render null when content={null}', async () => {
    const { queryByTestId } = await renderWithNexUIProvider(
      <Tooltip open content={null} />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('tooltip-root')).toBeNull()
  })

  describe('Accessibility', () => {
    it('should have aria-describedby on the trigger element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <Tooltip open data-testid='popper-root' content='Content'>
          <button data-testid='popper-trigger'>Trigger</button>
        </Tooltip>,
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
        <Tooltip data-testid='popper-root' content='Content'>
          <button data-testid='popper-trigger'>Trigger</button>
        </Tooltip>,
        {
          useAct: true,
        },
      )
      const trigger = getByTestId('popper-trigger')

      expect(trigger).not.toHaveAttribute('aria-describedby')
    })

    it('should have role="tooltip" on the root element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <Tooltip open data-testid='popper-root' content='Content' />,
        {
          useAct: true,
        },
      )

      const root = getByTestId('popper-root')

      expect(root).toHaveAttribute('role', 'tooltip')
    })
  })
})
