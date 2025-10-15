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
import { tooltipSlotClasses } from './constants'

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
})
