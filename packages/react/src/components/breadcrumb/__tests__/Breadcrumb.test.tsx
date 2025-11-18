import {
  renderWithNexUIProvider,
  testClassNamesForwarding,
  testComponentStability,
  testRefForwarding,
  testRootClassName,
  testSizeDataAttrs,
  testSlotPropsForwarding,
  testVariantDataAttrs,
} from '~/tests/shared'
import { Breadcrumb, BreadcrumbItem } from '../index'
import { breadcrumbSlotClasses } from './classes'
import type { BreadcrumbProps } from '../index'

function TestBreadcrumb(props: BreadcrumbProps) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Category</BreadcrumbItem>
      <BreadcrumbItem>Product</BreadcrumbItem>
    </Breadcrumb>
  )
}

const slots = ['list', 'separator', 'collapse'] as const

describe('Breadcrumb', () => {
  testComponentStability(<TestBreadcrumb />)

  testRootClassName(<TestBreadcrumb />)

  testRefForwarding(<TestBreadcrumb />)

  testSizeDataAttrs(<TestBreadcrumb />)

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

  testClassNamesForwarding(
    <TestBreadcrumb maxItems={3} />,
    slots,
    {
      list: 'test-list',
      separator: 'test-separator',
      collapse: 'test-collapse',
    },
    breadcrumbSlotClasses,
  )

  testSlotPropsForwarding(
    <TestBreadcrumb maxItems={3} />,
    slots,
    {
      list: {
        className: 'slot-props-list',
      },
      separator: {
        className: 'slot-props-separator',
      },
      collapse: {
        className: 'slot-props-collapse',
      },
    },
    breadcrumbSlotClasses,
  )

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<TestBreadcrumb />)

    const root = container.firstElementChild

    expect(root).toHaveAttribute('data-size', 'md')
    expect(root).toHaveAttribute('data-color', 'default')
    expect(root).toMatchSnapshot()
  })

  it('should render collapsed items when maxItems is less than the number of items', async () => {
    const { getByText, queryByText, queryByClassName, user } =
      renderWithNexUIProvider(
        <TestBreadcrumb
          maxItems={3}
          itemsBeforeCollapse={1}
          itemsAfterCollapse={1}
        />,
      )

    const collapseElement = queryByClassName(breadcrumbSlotClasses.collapse)

    expect(getByText('Home')).toBeInTheDocument()
    expect(getByText('Product')).toBeInTheDocument()
    expect(queryByText('Category')).not.toBeInTheDocument()
    expect(collapseElement).toBeInTheDocument()

    await user.click(collapseElement!)

    expect(getByText('Category')).toBeInTheDocument()
    expect(collapseElement).not.toBeInTheDocument()
  })

  it('should render custom separator', () => {
    const { getAllByText } = renderWithNexUIProvider(
      <TestBreadcrumb separator='>' />,
    )

    const separators = getAllByText('>')

    expect(separators.length).toBe(2)
  })

  it('should not render collapse element when pass to uncorrect props', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation()

    const { queryByClassName } = renderWithNexUIProvider(
      <TestBreadcrumb
        maxItems={3}
        itemsAfterCollapse={2}
        itemsBeforeCollapse={2}
      />,
    )

    expect(consoleError).toHaveBeenCalled()

    const collapseElement = queryByClassName(breadcrumbSlotClasses.collapse)

    expect(collapseElement).not.toBeInTheDocument()

    consoleError.mockRestore()
  })

  describe('Accessibility', () => {
    it('should have aria-label on the root element', () => {
      const { container, rerender } = renderWithNexUIProvider(
        <TestBreadcrumb />,
      )

      const root = container.firstElementChild

      expect(root).toHaveAttribute('aria-label', 'breadcrumb')

      rerender(<TestBreadcrumb aria-label='Custom Breadcrumb' />)

      expect(root).toHaveAttribute('aria-label', 'Custom Breadcrumb')
    })

    it('should have aria-hidden on the separator elements', () => {
      const { queryAllByClassName } = renderWithNexUIProvider(
        <TestBreadcrumb />,
      )

      const separators = queryAllByClassName(breadcrumbSlotClasses.separator)

      separators.forEach((separator) => {
        expect(separator).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })
})
