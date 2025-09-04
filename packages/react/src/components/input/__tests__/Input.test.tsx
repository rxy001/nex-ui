import { useState } from 'react'
import { fireEvent } from '@testing-library/react'
import {
  testColorClasses,
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
  testSizeClasses,
  testRadiusClasses,
  testVariantClasses,
  testRefForwarding,
  testClassesForwarding,
  testSlotPropsForwarding,
} from '~/tests/shared'
import { Input } from '../index'
import { inputClasses } from '../inputClasses'

const slots = ['root', 'label', 'prefix', 'suffix', 'clearButton'] as const

describe('Input', () => {
  testComponentStability(<Input />)

  testRootClassName(<Input />)

  testColorClasses(<Input />, inputClasses)

  testSizeClasses(<Input />, inputClasses)

  testRadiusClasses(<Input />, inputClasses)

  testRefForwarding(<Input />, HTMLInputElement)

  testVariantClasses(
    <Input />,
    ['variant', ['outlined', 'faded', 'underlined']],
    inputClasses,
  )

  testVariantClasses(
    <Input label='Label' />,
    ['labelPlacement', ['inside', 'outside', 'float-inside', 'float-outside']],
    inputClasses,
  )

  testVariantClasses(<Input />, ['fullWidth', [true, false]], inputClasses)

  testClassesForwarding(
    <Input
      prefix={<span>Prefix</span>}
      suffix={<span>Suffix</span>}
      clearable
      label='Test Label'
    />,
    slots,
    {
      root: 'test-root-class',
      label: 'test-label-class',
      prefix: 'test-prefix-class',
      suffix: 'test-suffix-class',
      clearButton: 'test-clear-button-class',
    },
    inputClasses,
  )

  testSlotPropsForwarding(
    <Input
      defaultValue='default'
      label='Test Label'
      prefix={<span>Prefix</span>}
      suffix={<span>Suffix</span>}
      clearable
    />,
    slots,
    {
      root: {
        className: 'test-root-class',
      },
      clearButton: {
        className: 'test-clear-button-class',
      },
      label: {
        className: 'test-label-class',
      },
      prefix: {
        className: 'test-prefix-class',
      },
      suffix: {
        className: 'test-suffix-class',
      },
    },
    inputClasses,
  )

  it('should render with default props', () => {
    const { container, getByTestId } = renderWithNexUIProvider(
      <Input data-testid='test-input' />,
    )

    const inputRoot = container.firstElementChild

    expect(inputRoot).toHaveClass(inputClasses.root)
    expect(inputRoot).toHaveClass(inputClasses['variant-outlined'])
    expect(inputRoot).toHaveClass(inputClasses['size-md'])
    expect(inputRoot).toHaveClass(inputClasses['radius-md'])
    expect(inputRoot).toHaveClass(inputClasses['color-blue'])
    expect(getByTestId('test-input')).toHaveClass(inputClasses.input)

    expect(inputRoot).not.toHaveClass(inputClasses['size-lg'])
    expect(inputRoot).not.toHaveClass(inputClasses['size-sm'])
    expect(inputRoot).not.toHaveClass(inputClasses['radius-full'])
    expect(inputRoot).not.toHaveClass(inputClasses['radius-lg'])
    expect(inputRoot).not.toHaveClass(inputClasses['radius-sm'])
    expect(inputRoot).not.toHaveClass(inputClasses['radius-none'])
    expect(inputRoot).not.toHaveClass(inputClasses['color-yellow'])
    expect(inputRoot).not.toHaveClass(inputClasses['color-cyan'])
    expect(inputRoot).not.toHaveClass(inputClasses['color-red'])
    expect(inputRoot).not.toHaveClass(inputClasses['color-gray'])
    expect(inputRoot).not.toHaveClass(inputClasses['color-green'])
    expect(inputRoot).not.toHaveClass(inputClasses['color-orange'])
    expect(inputRoot).not.toHaveClass(inputClasses['color-purple'])
    expect(inputRoot).not.toHaveClass(inputClasses['color-pink'])
    expect(inputRoot).not.toHaveClass(inputClasses.invalid)
    expect(inputRoot).not.toHaveClass(inputClasses.disabled)
    expect(inputRoot).not.toHaveClass(inputClasses['full-width'])
    expect(inputRoot).not.toHaveClass(inputClasses['variant-faded'])
    expect(inputRoot).not.toHaveClass(inputClasses['variant-underlined'])
    expect(inputRoot).not.toHaveClass(inputClasses['label-placement-inside'])
    expect(inputRoot).not.toHaveClass(inputClasses['label-placement-outside'])
    expect(inputRoot).not.toHaveClass(
      inputClasses['label-placement-float-outside'],
    )
    expect(inputRoot).not.toHaveClass(
      inputClasses['label-placement-float-inside'],
    )
    expect(inputRoot).toMatchSnapshot()
  })

  it('should mark input as invalid when invalid prop is true', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Input invalid data-testid='input' />,
    )

    const input = getByTestId('input')

    expect(input).toBeInvalid()
    expect(input.parentElement).toHaveClass(inputClasses.invalid)
  })

  it('should disable input when disabled prop is true', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Input disabled data-testid='input' />,
    )

    const input = getByTestId('input')

    expect(input).toBeDisabled()
    expect(input.parentElement).toHaveClass(inputClasses.disabled)
  })

  it('should support prefix and suffix props', () => {
    const { getByText } = renderWithNexUIProvider(
      <Input prefix={<span>Prefix</span>} suffix={<span>Suffix</span>} />,
    )
    expect(getByText('Prefix')).toBeInTheDocument()
    expect(getByText('Suffix')).toBeInTheDocument()
  })

  it('should support clearable props', () => {
    const ClearableInput: React.FC = () => {
      const [value, setValue] = useState('defalt')

      return (
        <Input
          clearable
          data-testid='clearable-input'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onClear={() => setValue('')}
        />
      )
    }
    const { getByTestId, queryByClassName } = renderWithNexUIProvider(
      <ClearableInput />,
    )
    const input = getByTestId('clearable-input')
    const clearButton = queryByClassName(inputClasses['clear-button'])

    expect(input).toHaveAttribute('value', 'defalt')
    expect(clearButton).toBeInTheDocument()

    fireEvent.change(input, {
      target: {
        value: 'changed',
      },
    })

    expect(input).toHaveAttribute('value', 'changed')

    fireEvent.click(clearButton!)
    expect(input).toHaveAttribute('value', '')
    expect(document.activeElement).toBe(input)
  })

  it(`should not allow clear value when disabled`, () => {
    const { getByTestId, queryByClassName } = renderWithNexUIProvider(
      <Input data-testid='input' clearable defaultValue='test' disabled />,
    )

    const clearButton = queryByClassName(inputClasses['clear-button'])
    const input = getByTestId('input')

    expect(clearButton).toBeInTheDocument()
    expect(clearButton).toBeDisabled()
    expect(input).toHaveAttribute('value', 'test')

    fireEvent.click(clearButton!)
    expect(input).toHaveAttribute('value', 'test')
  })

  it('should be controlled by value prop', () => {
    const ControlledInput: React.FC = () => {
      const [value, setValue] = useState('controlled')

      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          data-testid='controlled-input'
        />
      )
    }

    const { getByTestId } = renderWithNexUIProvider(<ControlledInput />)
    const input = getByTestId('controlled-input')

    expect(input).toHaveAttribute('value', 'controlled')

    fireEvent.change(input, {
      target: {
        value: 'new value',
      },
    })

    expect(input).toHaveAttribute('value', 'new value')
  })

  it('should support defaultValue prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Input defaultValue='uncontrolled' data-testid='uncontrolled-input' />,
    )
    const input = getByTestId('uncontrolled-input')

    expect(input).toHaveAttribute('value', 'uncontrolled')
  })

  it('should focus on input when clicking root', async () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Input data-testid='input-with-label' label='Click me' />,
    )
    const input = getByTestId('input-with-label')
    const label = input.parentElement

    expect(document.activeElement).not.toBe(input)

    fireEvent.mouseDown(label!)

    expect(document.activeElement).toBe(input)
  })

  describe('Accessibility', () => {
    it('should have type="text" by default', () => {
      const { getByTestId } = renderWithNexUIProvider(
        <Input data-testid='input' />,
      )
      const input = getByTestId('input')
      expect(input).toHaveAttribute('type', 'text')
    })

    it('should have tabIndex=0 by default', () => {
      const { getByTestId } = renderWithNexUIProvider(
        <Input data-testid='input' />,
      )
      const input = getByTestId('input')
      expect(input).toHaveAttribute('tabIndex', '0')
    })

    it('should apply type attribute with native input', () => {
      const { getByTestId, rerender } = renderWithNexUIProvider(
        <Input data-testid='input' />,
      )

      const input = getByTestId('input')
      expect(input).toHaveAttribute('type', 'text')

      rerender(<Input data-testid='input' type='email' />)

      expect(input).toHaveAttribute('type', 'email')
    })

    it('should apply disabled attribute to native input when disabled', () => {
      const { getByTestId } = renderWithNexUIProvider(
        <Input data-testid='input' disabled />,
      )

      const input = getByTestId('input')
      expect(input).toBeDisabled()
    })

    it('should apply tabIndex=-1', () => {
      const { getByTestId } = renderWithNexUIProvider(
        <Input data-testid='input' disabled />,
      )

      const input = getByTestId('input')
      expect(input).toHaveAttribute('tabIndex', '-1')
    })

    it('should have aria-invalid attribute', () => {
      const { getByTestId, rerender } = renderWithNexUIProvider(
        <Input data-testid='input' />,
      )

      const input = getByTestId('input')
      expect(input).not.toBeInvalid()

      rerender(<Input data-testid='input' invalid />)
      expect(input).toBeInvalid()
    })

    it("should the for of label refer to input's id when label is provided", () => {
      const { getByTestId, queryByClassName } = renderWithNexUIProvider(
        <Input data-testid='input' label='Test Label' />,
      )

      const input = getByTestId('input')

      expect(input).toHaveAttribute('id', input.id)

      const label = queryByClassName(inputClasses['label'])
      expect(label).toHaveAttribute('for', input.id)
    })

    it('should apply aria-label when label is provided', () => {
      const { getByTestId, rerender } = renderWithNexUIProvider(
        <Input data-testid='input' />,
      )

      const input = getByTestId('input')

      expect(input).not.toHaveAttribute('aria-label')

      rerender(<Input data-testid='input' label='Test Label' />)
      expect(input).toHaveAttribute('aria-label', 'Test Label')
    })

    it('should apply aria-label when aria-label prop is provided', () => {
      const { getByTestId } = renderWithNexUIProvider(
        <Input data-testid='input' aria-label='Custom Label' label='Input' />,
      )

      const input = getByTestId('input')
      expect(input).toHaveAttribute('aria-label', 'Custom Label')
    })

    it('should apply aria-labelledby when label is provided', () => {
      const { getByTestId, rerender, queryByClassName } =
        renderWithNexUIProvider(<Input data-testid='input' />)

      const input = getByTestId('input')

      expect(input).not.toHaveAttribute('aria-labelledby')

      rerender(<Input data-testid='input' label='Test Label' />)
      const label = queryByClassName(inputClasses['label'])
      expect(input).toHaveAttribute('aria-labelledby', label!.id)
      expect(label).toHaveAttribute('id', label!.id)
    })

    it('should apply aria-labelledby when aria-labelledby prop is provided', () => {
      const { getByTestId } = renderWithNexUIProvider(
        <Input data-testid='input' aria-labelledby='label-id' label='Input' />,
      )

      const input = getByTestId('input')
      expect(input).toHaveAttribute('aria-labelledby', 'label-id')
    })

    it('should apply aria-labelledby=label.id when id of label is provided', () => {
      const { getByTestId, queryByClassName } = renderWithNexUIProvider(
        <Input
          data-testid='input'
          label='Test Label'
          slotProps={{ label: { id: 'custom-id' } }}
        />,
      )

      const input = getByTestId('input')
      const label = queryByClassName(inputClasses['label'])

      expect(label).toHaveAttribute('id', 'custom-id')
      expect(input).toHaveAttribute('aria-labelledby', label!.id)
    })

    it('should use aria-disabled and role with non-input elements', () => {
      const { getByTestId } = renderWithNexUIProvider(
        <Input data-testid='input' as='div' disabled />,
      )

      const input = getByTestId('input')

      expect(input).toHaveAttribute('role', 'textbox')
      expect(input).toHaveAttribute('aria-disabled', 'true')
    })

    it('should have aria-label on clear button', () => {
      const { queryByClassName } = renderWithNexUIProvider(
        <Input clearable data-testid='input' />,
      )

      const clearButton = queryByClassName(inputClasses['clear-button'])

      expect(clearButton).toHaveAttribute('aria-label', 'Clear input')
    })
  })
})
