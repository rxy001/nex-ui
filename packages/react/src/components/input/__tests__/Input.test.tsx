import { useState, createRef } from 'react'
import { fireEvent } from '@testing-library/react'
import {
  mountTest,
  renderWithNexUIProvider,
  rootClassNameTest,
} from '~/tests/shared'
import { Input } from '../index'
import { inputClasses } from '../inputClasses'

describe('Input', () => {
  mountTest(<Input />)

  rootClassNameTest(<Input className='test-class' />, 'test-class')

  it('renders correctly', () => {
    const { container } = renderWithNexUIProvider(<Input />)
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should forward ref to input element', () => {
    const ref = createRef<HTMLInputElement>()
    renderWithNexUIProvider(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('should render with the root, variant-outlined, radius-md, size-md, color-blue, classes but no others', () => {
    const { container } = renderWithNexUIProvider(<Input />)

    const root = container.firstElementChild

    expect(root).toHaveClass(inputClasses.root)
    expect(root).toHaveClass(inputClasses['variant-outlined'])
    expect(root).toHaveClass(inputClasses['size-md'])
    expect(root).toHaveClass(inputClasses['radius-md'])
    expect(root).toHaveClass(inputClasses['color-blue'])

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
  })

  it('input should have proper class', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Input data-testid='test-input' />,
    )

    expect(getByTestId('test-input')).toHaveClass(inputClasses.input)
  })

  it('should add the appropriate color class to root element based on color prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <Input color='red' data-testid='color-red' />
        <Input color='blue' data-testid='color-blue' />
        <Input color='cyan' data-testid='color-cyan' />
        <Input color='orange' data-testid='color-orange' />
        <Input color='pink' data-testid='color-pink' />
        <Input color='purple' data-testid='color-purple' />
        <Input color='gray' data-testid='color-gray' />
        <Input color='yellow' data-testid='color-yellow' />
        <Input color='green' data-testid='color-green' />
      </>,
    )

    expect(getByTestId('color-red').parentElement).toHaveClass(
      inputClasses['color-red'],
    )
    expect(getByTestId('color-blue').parentElement).toHaveClass(
      inputClasses['color-blue'],
    )
    expect(getByTestId('color-cyan').parentElement).toHaveClass(
      inputClasses['color-cyan'],
    )
    expect(getByTestId('color-orange').parentElement).toHaveClass(
      inputClasses['color-orange'],
    )
    expect(getByTestId('color-pink').parentElement).toHaveClass(
      inputClasses['color-pink'],
    )
    expect(getByTestId('color-purple').parentElement).toHaveClass(
      inputClasses['color-purple'],
    )
    expect(getByTestId('color-green').parentElement).toHaveClass(
      inputClasses['color-green'],
    )
    expect(getByTestId('color-yellow').parentElement).toHaveClass(
      inputClasses['color-yellow'],
    )
    expect(getByTestId('color-green').parentElement).toHaveClass(
      inputClasses['color-green'],
    )
  })

  it('should add the appropriate variant class to root element based on variant prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <Input variant='outlined' data-testid='variant-outlined' />
        <Input variant='filled' data-testid='variant-filled' />
        <Input variant='underlined' data-testid='variant-underlined' />
      </>,
    )

    expect(getByTestId('variant-outlined').parentElement).toHaveClass(
      inputClasses['variant-outlined'],
    )
    expect(getByTestId('variant-filled').parentElement).toHaveClass(
      inputClasses['variant-filled'],
    )
    expect(getByTestId('variant-underlined').parentElement).toHaveClass(
      inputClasses['variant-underlined'],
    )
  })

  it('should add the appropriate size class to root element based on size prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <Input size='sm' data-testid='size-sm' />
        <Input size='md' data-testid='size-md' />
        <Input size='lg' data-testid='size-lg' />
      </>,
    )
    expect(getByTestId('size-sm').parentElement).toHaveClass(
      inputClasses['size-sm'],
    )
    expect(getByTestId('size-md').parentElement).toHaveClass(
      inputClasses['size-md'],
    )
    expect(getByTestId('size-lg').parentElement).toHaveClass(
      inputClasses['size-lg'],
    )
  })

  it('should add the appropriate radius class to root element based on radius prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <Input radius='none' data-testid='radius-none' />
        <Input radius='sm' data-testid='radius-sm' />
        <Input radius='md' data-testid='radius-md' />
        <Input radius='lg' data-testid='radius-lg' />
        <Input radius='full' data-testid='radius-full' />
      </>,
    )

    expect(getByTestId('radius-none').parentElement).toHaveClass(
      inputClasses['radius-none'],
    )
    expect(getByTestId('radius-sm').parentElement).toHaveClass(
      inputClasses['radius-sm'],
    )
    expect(getByTestId('radius-md').parentElement).toHaveClass(
      inputClasses['radius-md'],
    )
    expect(getByTestId('radius-lg').parentElement).toHaveClass(
      inputClasses['radius-lg'],
    )
    expect(getByTestId('radius-full').parentElement).toHaveClass(
      inputClasses['radius-full'],
    )
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

    expect(input.getAttribute('value')).toBe('defalt')
    expect(clearButton).toBeInTheDocument()

    fireEvent.change(input, {
      target: {
        value: 'changed',
      },
    })

    expect(input.getAttribute('value')).toBe('changed')

    fireEvent.click(clearButton!)
    expect(input.getAttribute('value')).toBe('')
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
    expect(input.getAttribute('value')).toBe('test')

    fireEvent.click(clearButton!)
    expect(input.getAttribute('value')).toBe('test')
  })

  it('should forward classes to root, label, prefix, suffix, input, clearButton slots', () => {
    const rootClassName = 'test-root-class'
    const labelClassName = 'test-label-class'
    const prefixClassName = 'test-prefix-class'
    const suffixClassName = 'test-suffix-class'
    const clearBtnClassName = 'test-clear-btn-class'
    const inputClassName = 'test-input-class'

    const { container } = renderWithNexUIProvider(
      <Input
        classes={{
          root: rootClassName,
          label: labelClassName,
          prefix: prefixClassName,
          suffix: suffixClassName,
          clearButton: clearBtnClassName,
          input: inputClassName,
        }}
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

    expect(root).toHaveClass(rootClassName)
    expect(label).toHaveClass(labelClassName)
    expect(prefix).toHaveClass(prefixClassName)
    expect(suffix).toHaveClass(suffixClassName)
    expect(clearButton).toHaveClass(clearBtnClassName)
    expect(input).toHaveClass(inputClassName)
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

    expect(input.getAttribute('value')).toBe('controlled')

    fireEvent.change(input, {
      target: {
        value: 'new value',
      },
    })

    expect(input.getAttribute('value')).toBe('new value')
  })

  it('should support defaultValue prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Input defaultValue='uncontrolled' data-testid='uncontrolled-input' />,
    )
    const input = getByTestId('uncontrolled-input')

    expect(input.getAttribute('value')).toBe('uncontrolled')
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
