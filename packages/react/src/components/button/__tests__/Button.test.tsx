import { useState, createRef } from 'react'
import { fireEvent, act } from '@testing-library/react'
import {
  testColorClasses,
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
  testVariantClasses,
  testRadiusClasses,
  testClassesForwarding,
  testSlotPropsForwarding,
} from '~/tests/shared'
import { Button } from '../index'
import { buttonClasses } from '../buttonClasses'
import type { ButtonProps } from '../index'

const slots = ['startIcon', 'endIcon'] as const

describe('Button', () => {
  testComponentStability(<Button />)

  testRootClassName(<Button />)

  testColorClasses(<Button>Button</Button>, buttonClasses)

  testVariantClasses(
    <Button>Button</Button>,
    ['variant', ['solid', 'outlined', 'ghost', 'faded']],
    buttonClasses,
  )

  testVariantClasses(
    <Button iconOnly>Button</Button>,
    ['iconOnly', [true, false]],
    buttonClasses,
  )

  testVariantClasses(
    <Button fullWidth>Button</Button>,
    ['fullWidth', [true]],
    buttonClasses,
  )

  testVariantClasses(
    <Button disableRipple>Button</Button>,
    ['disableRipple', [true]],
    buttonClasses,
  )

  testRadiusClasses(<Button>Button</Button>, buttonClasses)

  testClassesForwarding(
    <Button startIcon={<span>start icon</span>} endIcon={<span>end icon</span>}>
      Button
    </Button>,
    slots,
    {
      startIcon: 'test-start-icon-class',
      endIcon: 'test-end-icon-class',
    },
    buttonClasses,
  )

  testSlotPropsForwarding(
    <Button
      startIcon={<span data-testid='start-icon'>Start Icon</span>}
      endIcon={<span data-testid='end-icon'>End Icon</span>}
    >
      Button
    </Button>,
    slots,
    {
      startIcon: { className: 'test-start-icon' },
      endIcon: { className: 'test-end-icon' },
    },
    buttonClasses,
  )

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Button>Button</Button>)
    const button = container.firstElementChild

    expect(button).toHaveClass(buttonClasses.root)
    expect(button).toHaveClass(buttonClasses['variant-solid'])
    expect(button).toHaveClass(buttonClasses['size-md'])
    expect(button).toHaveClass(buttonClasses['radius-md'])
    expect(button).toHaveClass(buttonClasses['color-blue'])

    expect(button).not.toHaveClass(buttonClasses['variant-outlined'])
    expect(button).not.toHaveClass(buttonClasses['variant-ghost'])
    expect(button).not.toHaveClass(buttonClasses['color-green'])
    expect(button).not.toHaveClass(buttonClasses['color-cyan'])
    expect(button).not.toHaveClass(buttonClasses['color-orange'])
    expect(button).not.toHaveClass(buttonClasses['color-pink'])
    expect(button).not.toHaveClass(buttonClasses['color-purple'])
    expect(button).not.toHaveClass(buttonClasses['color-yellow'])
    expect(button).not.toHaveClass(buttonClasses['color-red'])
    expect(button).not.toHaveClass(buttonClasses['color-gray'])
    expect(button).not.toHaveClass(buttonClasses['size-sm'])
    expect(button).not.toHaveClass(buttonClasses['size-lg'])
    expect(button).not.toHaveClass(buttonClasses['radius-sm'])
    expect(button).not.toHaveClass(buttonClasses['radius-lg'])
    expect(button).not.toHaveClass(buttonClasses['icon-only'])
    expect(button).not.toHaveClass(buttonClasses.loading)
    expect(button).not.toHaveClass(buttonClasses.disabled)
    expect(button).not.toHaveClass(buttonClasses['full-width'])
    expect(button).not.toHaveClass(buttonClasses['disable-ripple'])

    expect(button).toMatchSnapshot()
  })

  it("should forward ref to Button's root element", () => {
    const ref = createRef<HTMLButtonElement>()
    const { container } = renderWithNexUIProvider(
      <Button ref={ref}>Button</Button>,
    )
    const button = container.firstElementChild as HTMLButtonElement
    expect(ref.current).toBe(button)
  })

  it('should trigger onClick function', async () => {
    const onClick = jest.fn()
    const { getByRole } = renderWithNexUIProvider(<Button onClick={onClick} />)
    await act(async () => {
      fireEvent.click(getByRole('button'))
    })
    expect(onClick).toHaveBeenCalled()
  })

  it('should apply disabled class when disabled', async () => {
    const onClick = jest.fn()
    const { getByText } = renderWithNexUIProvider(
      <Button disabled onClick={onClick}>
        Button
      </Button>,
    )

    const button = getByText('Button')
    expect(button).toHaveClass(buttonClasses.disabled)
  })

  it('should disable the button when loading', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Button loading data-testid='loading-button'>
        Button
      </Button>,
    )

    const button = getByTestId('loading-button')
    expect(button).toHaveClass(buttonClasses.loading)
    expect(button).toHaveStyleRule('pointer-events', 'none')
  })

  it('should support link button', () => {
    const { container } = renderWithNexUIProvider(
      <Button target='_blank' href='https://'>
        Link Button
      </Button>,
    )

    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should render with start icon', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Button startIcon={<span data-testid='start-icon'>Icon</span>}>
        Button
      </Button>,
    )

    const startIcon = getByTestId('start-icon')
    expect(startIcon.parentElement).toHaveClass(buttonClasses.icon)
    expect(startIcon.parentElement).toHaveClass(buttonClasses['start-icon'])
  })

  it('should render with end icon', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Button endIcon={<span data-testid='end-icon'>Icon</span>}>
        Button
      </Button>,
    )
    const endIcon = getByTestId('end-icon')
    expect(endIcon.parentElement).toHaveClass(buttonClasses.icon)
    expect(endIcon.parentElement).toHaveClass(buttonClasses['end-icon'])
  })

  it('should support to change loading', async () => {
    const DefaultButton: React.FC = () => {
      const [loading, setLoading] = useState<ButtonProps['loading']>(false)
      return (
        <Button loading={loading} onClick={() => setLoading(true)}>
          Button
        </Button>
      )
    }
    const { getByRole, queryByClassName } = renderWithNexUIProvider(
      <DefaultButton />,
    )
    const button = getByRole('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(button).toHaveClass(buttonClasses.loading)
    expect(queryByClassName(buttonClasses['icon-loading'])).toBeInTheDocument()
  })

  it('should support customized spinner', () => {
    const { queryByClassName } = renderWithNexUIProvider(
      <Button
        loading
        spinner={<span data-testid='custom-spinner'>Custom Spinner</span>}
      >
        Button
      </Button>,
    )

    const spinner = queryByClassName(buttonClasses['icon-loading'])

    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveTextContent('Custom Spinner')
  })

  it('should support spinner placement', () => {
    const { queryByClassName, rerender } = renderWithNexUIProvider(
      <Button loading spinnerPlacement='start'>
        Button
      </Button>,
    )

    const startSpinner = queryByClassName(buttonClasses['start-icon'])

    expect(startSpinner).toBeInTheDocument()

    rerender(
      <Button loading spinnerPlacement='end'>
        Button
      </Button>,
    )

    const endSpinner = queryByClassName(buttonClasses['end-icon'])
    expect(endSpinner).toBeInTheDocument()
  })
})
