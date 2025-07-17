import { useState, createRef } from 'react'
import { fireEvent } from '@testing-library/react'
import {
  testColorClasses,
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
  testSizeClasses,
  testRadiusClasses,
  testVariantClasses,
} from '~/tests/shared'
import { Input } from '../index'
import { inputClasses } from '../inputClasses'

describe('Input', () => {
  testComponentStability(<Input />)

  testRootClassName(<Input className='test-class' />, 'test-class')

  testColorClasses(<Input />, inputClasses)

  testSizeClasses(<Input />, inputClasses)

  testRadiusClasses(<Input />, inputClasses)

  testVariantClasses(
    <Input />,
    ['variant', ['outlined', 'filled', 'underlined']],
    inputClasses,
  )

  it('should render with default props', () => {
    const { container, getByTestId } = renderWithNexUIProvider(
      <Input data-testid='test-input' />,
    )

    const root = container.firstElementChild

    expect(root).toHaveClass(inputClasses.root)
    expect(root).toHaveClass(inputClasses['variant-outlined'])
    expect(root).toHaveClass(inputClasses['size-md'])
    expect(root).toHaveClass(inputClasses['radius-md'])
    expect(root).toHaveClass(inputClasses['color-blue'])
    expect(getByTestId('test-input')).toHaveClass(inputClasses.input)

    expect(root).not.toHaveClass(inputClasses['size-lg'])
    expect(root).not.toHaveClass(inputClasses['size-sm'])
    expect(root).not.toHaveClass(inputClasses['radius-full'])
    expect(root).not.toHaveClass(inputClasses['radius-lg'])
    expect(root).not.toHaveClass(inputClasses['radius-sm'])
    expect(root).not.toHaveClass(inputClasses['radius-none'])
    expect(root).not.toHaveClass(inputClasses['color-yellow'])
    expect(root).not.toHaveClass(inputClasses['color-cyan'])
    expect(root).not.toHaveClass(inputClasses['color-red'])
    expect(root).not.toHaveClass(inputClasses['color-gray'])
    expect(root).not.toHaveClass(inputClasses['color-green'])
    expect(root).not.toHaveClass(inputClasses['color-orange'])
    expect(root).not.toHaveClass(inputClasses['color-purple'])
    expect(root).not.toHaveClass(inputClasses['color-pink'])
    expect(root).not.toHaveClass(inputClasses.invalid)
    expect(root).not.toHaveClass(inputClasses.disabled)
    expect(root).not.toHaveClass(inputClasses['full-width'])
    expect(root).not.toHaveClass(inputClasses['variant-filled'])
    expect(root).not.toHaveClass(inputClasses['variant-underlined'])
    expect(root).not.toHaveClass(inputClasses['label-placement-inside'])
    expect(root).not.toHaveClass(inputClasses['label-placement-outside'])
    expect(root).not.toHaveClass(inputClasses['label-placement-float-outside'])
    expect(root).not.toHaveClass(inputClasses['label-placement-float-inside'])

    expect(root).toMatchSnapshot()
  })

  it("should forward ref to Input's input element", () => {
    const ref = createRef<HTMLInputElement>()
    renderWithNexUIProvider(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('should add the appropriate label placement class to root element based on labelPlacement and value prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <Input
          labelPlacement='inside'
          data-testid='label-inside'
          label='Label Inside'
        />
        <Input
          labelPlacement='outside'
          data-testid='label-outside'
          label='Label Outside'
        />
        <Input
          labelPlacement='float-inside'
          data-testid='label-float-inside'
          label='Label Float Inside'
        />
        <Input
          labelPlacement='float-outside'
          data-testid='label-float-outside'
          label='Label Float Outside'
        />
        <Input
          labelPlacement='float-outside'
          data-testid='label-float-outside-with-value'
          label='Label Float Outside'
          value='Test Value'
        />
        <Input
          labelPlacement='float-inside'
          data-testid='label-float-inside-with-value'
          label='Label Float Inside'
          value='Test Value'
        />
      </>,
    )

    expect(getByTestId('label-inside').parentElement).toHaveClass(
      inputClasses['label-placement-inside'],
    )
    expect(getByTestId('label-outside').parentElement).toHaveClass(
      inputClasses['label-placement-outside'],
    )
    expect(getByTestId('label-float-inside').parentElement).toHaveClass(
      inputClasses['label-placement-float-inside'],
    )
    expect(getByTestId('label-float-outside').parentElement).toHaveClass(
      inputClasses['label-placement-float-outside'],
    )
    expect(
      getByTestId('label-float-outside-with-value').parentElement,
    ).toHaveClass(inputClasses['label-placement-outside'])
    expect(
      getByTestId('label-float-inside-with-value').parentElement,
    ).toHaveClass(inputClasses['label-placement-inside'])
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

  it('should add the appropriate radius class to root element based on fullWidth prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Input fullWidth data-testid='full-width' />,
    )

    expect(getByTestId('full-width').parentElement).toHaveClass(
      inputClasses['full-width'],
    )
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
    const { getByTestId, container } = renderWithNexUIProvider(
      <ClearableInput />,
    )
    const input = getByTestId('clearable-input')
    const clearButton = container.querySelector(`.${inputClasses['clear-btn']}`)

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
    const { container, getByTestId } = renderWithNexUIProvider(
      <Input data-testid='input' clearable defaultValue='test' disabled />,
    )

    const clearButton = container.querySelector(`.${inputClasses['clear-btn']}`)
    const input = getByTestId('input')

    expect(clearButton).toBeInTheDocument()
    expect(clearButton).toBeDisabled()
    expect(input).toHaveAttribute('value', 'test')

    fireEvent.click(clearButton!)
    expect(input).toHaveAttribute('value', 'test')
  })

  it('should forward classes to root, label, prefix, suffix, input, clearButton slots', () => {
    const classes = {
      root: 'test-root-class',
      label: 'test-label-class',
      prefix: 'test-prefix-class',
      suffix: 'test-suffix-class',
      clearButton: 'test-clear-btn-class',
      input: 'test-input-class',
    }

    const { container } = renderWithNexUIProvider(
      <Input
        classes={classes}
        prefix={<span>Prefix</span>}
        suffix={<span>Suffix</span>}
        clearable
        label='Test Label'
      />,
    )

    const root = container.firstChild
    const label = container.querySelector(`.${inputClasses['label']}`)
    const prefix = container.querySelector(`.${inputClasses['prefix']}`)
    const suffix = container.querySelector(`.${inputClasses['suffix']}`)
    const clearButton = container.querySelector(`.${inputClasses['clear-btn']}`)
    const input = container.querySelector(`.${inputClasses['input']}`)

    expect(root).toHaveClass(classes.root)
    expect(label).toHaveClass(classes.label)
    expect(prefix).toHaveClass(classes.prefix)
    expect(suffix).toHaveClass(classes.suffix)
    expect(clearButton).toHaveClass(classes.clearButton)
    expect(input).toHaveClass(classes.input)
  })

  it('should forward slotProps to root, label, prefix, suffix, clearButton slots', () => {
    const { container } = renderWithNexUIProvider(
      <Input
        slotProps={{
          root: {
            className: 'test-root-class',
          },
          clearButton: {
            className: 'test-clear-btn-class',
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
        }}
        defaultValue='default'
        label='Test Label'
        prefix={<span>Prefix</span>}
        suffix={<span>Suffix</span>}
        clearable
      />,
    )

    const root = container.firstChild
    const label = container.querySelector(`.${inputClasses['label']}`)
    const prefix = container.querySelector(`.${inputClasses['prefix']}`)
    const suffix = container.querySelector(`.${inputClasses['suffix']}`)
    const clearButton = container.querySelector(`.${inputClasses['clear-btn']}`)

    expect(root).toHaveClass('test-root-class')
    expect(label).toHaveClass('test-label-class')
    expect(prefix).toHaveClass('test-prefix-class')
    expect(suffix).toHaveClass('test-suffix-class')
    expect(clearButton).toHaveClass('test-clear-btn-class')
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

  it('should focus on input when clicking label', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Input data-testid='input-with-label' label='Click me' />,
    )
    const input = getByTestId('input-with-label')
    const label = input.parentElement

    expect(document.activeElement).not.toBe(input)

    fireEvent.click(label!)

    expect(document.activeElement).toBe(input)
  })
})
