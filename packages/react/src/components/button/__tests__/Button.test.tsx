import { useState } from 'react'
import { fireEvent, act } from '@testing-library/react'
import {
  testColorDataAttrs,
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
  testVariantDataAttrs,
  testRadiusDataAttrs,
  testClassNamesForwarding,
  testSlotPropsForwarding,
  testSizeDataAttrs,
  testRefForwarding,
} from '~/tests/shared'
import { Button } from '../index'
import { buttonSlotClasses } from './classes'
import type { ButtonProps } from '../index'

const slots = ['startIcon', 'endIcon'] as const

describe('Button', () => {
  testComponentStability(<Button />)

  testRootClassName(<Button />)

  testColorDataAttrs(<Button>Button</Button>)

  testVariantDataAttrs(<Button>Button</Button>, [
    'variant',
    ['solid', 'outlined', 'ghost', 'faded'],
  ])

  testVariantDataAttrs(<Button>Button</Button>, ['iconOnly', [true, false]])

  testVariantDataAttrs(<Button>Button</Button>, ['fullWidth', [true, false]])

  testVariantDataAttrs(<Button>Button</Button>, [
    'rippleDisabled',
    [true, false],
  ])

  testVariantDataAttrs(<Button>Button</Button>, ['loading', [true, false]])

  testSizeDataAttrs(<Button>Button</Button>)

  testRadiusDataAttrs(<Button>Button</Button>)

  testClassNamesForwarding(
    <Button startIcon={<span>start icon</span>} endIcon={<span>end icon</span>}>
      Button
    </Button>,
    slots,
    {
      startIcon: 'test-start-icon-class',
      endIcon: 'test-end-icon-class',
    },
    buttonSlotClasses,
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
    buttonSlotClasses,
  )

  testRefForwarding(<Button>Button</Button>)

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Button>Button</Button>)
    const button = container.firstElementChild

    expect(button).toHaveClass(buttonSlotClasses.root)
    expect(button).toHaveAttribute('data-loading', 'false')
    expect(button).toHaveAttribute('data-loading', 'false')
    expect(button).toHaveAttribute('data-variant', 'solid')
    expect(button).toHaveAttribute('data-size', 'md')
    expect(button).toHaveAttribute('data-radius', 'md')
    expect(button).toHaveAttribute('data-color', 'blue')
    expect(button).toHaveAttribute('data-icon-only', 'false')
    expect(button).toHaveAttribute('data-full-width', 'false')
    expect(button).toHaveAttribute('data-ripple-disabled', 'false')

    expect(button).toMatchSnapshot()
  })

  it('should trigger onClick function', async () => {
    const onClick = jest.fn()
    const { getByRole } = renderWithNexUIProvider(<Button onClick={onClick} />)
    await act(async () => {
      fireEvent.click(getByRole('button'))
    })
    expect(onClick).toHaveBeenCalled()
  })

  it('should disable the button when loading', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Button loading data-testid='loading-button'>
        Button
      </Button>,
    )

    const button = getByTestId('loading-button')
    expect(button).toHaveStyleRule('pointer-events', 'none')
  })

  it('should support link button', () => {
    const { container } = renderWithNexUIProvider(
      <Button target='_blank' href='https://example.com'>
        Link Button
      </Button>,
    )

    const button = container.firstElementChild
    expect(button?.tagName).toBe('A')
    expect(button).toHaveAttribute('href', 'https://example.com')
    expect(button).toHaveAttribute('target', '_blank')
  })

  it('should render with start icon', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Button startIcon={<span data-testid='start-icon'>Icon</span>}>
        Button
      </Button>,
    )

    const startIcon = getByTestId('start-icon')
    expect(startIcon.parentElement).toHaveClass(buttonSlotClasses['start-icon'])
  })

  it('should render with end icon', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Button endIcon={<span data-testid='end-icon'>Icon</span>}>
        Button
      </Button>,
    )
    const endIcon = getByTestId('end-icon')
    expect(endIcon.parentElement).toHaveClass(buttonSlotClasses['end-icon'])
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
    const { getByRole } = renderWithNexUIProvider(<DefaultButton />)
    const button = getByRole('button')
    expect(button).toHaveAttribute('data-loading', 'false')

    await act(async () => {
      fireEvent.click(button)
    })
    expect(button).toHaveAttribute('data-loading', 'true')
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

    const spinner = queryByClassName(buttonSlotClasses['start-icon'])

    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveTextContent('Custom Spinner')
  })

  it('should support spinner placement', () => {
    const { queryByClassName, rerender } = renderWithNexUIProvider(
      <Button loading spinnerPlacement='start'>
        Button
      </Button>,
    )

    const startSpinner = queryByClassName(buttonSlotClasses['start-icon'])

    expect(startSpinner).toBeInTheDocument()

    rerender(
      <Button loading spinnerPlacement='end'>
        Button
      </Button>,
    )

    const endSpinner = queryByClassName(buttonSlotClasses['end-icon'])
    expect(endSpinner).toBeInTheDocument()
  })
})
