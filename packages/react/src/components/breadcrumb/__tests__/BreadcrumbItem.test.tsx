import {
  renderWithNexUIProvider,
  testClassNamesForwarding,
  testRefForwarding,
  testSizeDataAttrs,
  testSlotPropsForwarding,
  testVariantDataAttrs,
} from '~/tests/shared'
import { Breadcrumb, BreadcrumbItem } from '../index'
import { breadcrumbItemSlotClasses } from './classes'
import type { BreadcrumbItemProps } from '../index'

function TestBreadcrumb(props: BreadcrumbItemProps) {
  return (
    <Breadcrumb>
      <BreadcrumbItem {...props}>Home</BreadcrumbItem>
    </Breadcrumb>
  )
}

const slots = ['root'] as const

describe('BreadcrumbItem', () => {
  testVariantDataAttrs(<TestBreadcrumb />, [
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
  ])

  testSizeDataAttrs(<TestBreadcrumb />)

  testRefForwarding(<TestBreadcrumb />)

  testRefForwarding(<TestBreadcrumb />, HTMLAnchorElement)

  testClassNamesForwarding(
    <TestBreadcrumb />,
    slots,
    {
      root: 'test-root',
    },
    breadcrumbItemSlotClasses,
  )

  testSlotPropsForwarding(
    <TestBreadcrumb />,
    slots,
    {
      root: {
        className: 'test-root',
      },
    },
    breadcrumbItemSlotClasses,
  )

  it('should have the correct root class name', async () => {
    const className = 'test-class'
    const { queryByClassName } = await renderWithNexUIProvider(
      <TestBreadcrumb className={className} />,
    )

    const rootElement = queryByClassName(breadcrumbItemSlotClasses.root)
    expect(rootElement).toHaveClass(className)
  })

  it('should render with default props', () => {
    const { queryByClassName } = renderWithNexUIProvider(<TestBreadcrumb />)
    const root = queryByClassName(breadcrumbItemSlotClasses.root)

    expect(root).toHaveAttribute('data-size', 'md')
    expect(root).toHaveAttribute('data-color', 'default')
  })

  it('should not have href attribute on the last item', () => {
    const { getByText } = renderWithNexUIProvider(
      <Breadcrumb>
        <BreadcrumbItem href='https://example.com'>Dashboard</BreadcrumbItem>
        <BreadcrumbItem href='https://example.com/home'>Home</BreadcrumbItem>
      </Breadcrumb>,
    )

    const firstItem = getByText('Dashboard')
    expect(firstItem).toHaveAttribute('href', 'https://example.com')
    const lastItem = getByText('Home')
    expect(lastItem).not.toHaveAttribute('href')
  })

  describe('Accessibility', () => {
    it('should have correct aria-current on the last item', () => {
      const { getByText } = renderWithNexUIProvider(<TestBreadcrumb />)
      const lastItem = getByText('Home')

      expect(lastItem).toHaveAttribute('aria-current', 'page')
    })
  })
})
