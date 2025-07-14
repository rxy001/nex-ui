import { useState } from 'react'
import { fireEvent } from '@testing-library/react'
import { mountTest, refTest, renderWithNexUIProvider } from '~/tests/shared'
import { Input } from '../Input'
import { inputClasses } from '../inputClasses'

describe('Input', () => {
  mountTest(<Input />)
  refTest(<Input />)

  it('renders correctly', () => {
    const { container } = renderWithNexUIProvider(<Input />)
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should render with the root, variant-outlined, radius-md, size-md, color-blue classes but no others', () => {
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
    expect(root).not.toHaveClass(inputClasses['color-yellow'])
    expect(root).not.toHaveClass(inputClasses['color-cyan'])
    expect(root).not.toHaveClass(inputClasses['color-red'])
    expect(root).not.toHaveClass(inputClasses['color-gray'])
    expect(root).not.toHaveClass(inputClasses['color-green'])
    expect(root).not.toHaveClass(inputClasses['color-orange'])
    expect(root).not.toHaveClass(inputClasses['color-purple'])
    expect(root).not.toHaveClass(inputClasses['color-pink'])
    expect(root).not.toHaveClass(inputClasses.invaild)
    expect(root).not.toHaveClass(inputClasses.disabled)
    expect(root).not.toHaveClass(inputClasses['full-width'])
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
      </>,
    )

    expect(getByTestId('variant-outlined').parentElement).toHaveClass(
      inputClasses['variant-outlined'],
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
        <Input radius='sm' data-testid='radius-sm' />
        <Input radius='md' data-testid='radius-md' />
        <Input radius='lg' data-testid='radius-lg' />
        <Input radius='full' data-testid='radius-full' />
      </>,
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

  it('should add the appropriate radius class to root element based on invaild prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Input invaild data-testid='invaild' />,
    )

    expect(getByTestId('invaild').parentElement).toHaveClass(
      inputClasses.invaild,
    )
  })

  it('should add the appropriate radius class to root element based on disabled prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Input disabled data-testid='disabled' />,
    )

    expect(getByTestId('disabled').parentElement).toHaveClass(
      inputClasses.disabled,
    )
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

    expect(input.getAttribute('value')).toBe('defalt')
    expect(
      container.querySelector(`.${inputClasses['clear-btn']}`),
    ).toBeInTheDocument()

    fireEvent.change(input, {
      target: {
        value: 'changed',
      },
    })

    expect(input.getAttribute('value')).toBe('changed')
    expect(
      container.querySelector(`.${inputClasses['clear-btn']}`),
    ).toBeInTheDocument()

    fireEvent.click(container.querySelector(`.${inputClasses['clear-btn']}`)!)
    expect(input.getAttribute('value')).toBe('')
    expect(document.activeElement).toBe(input)
  })

  it(`should not allow clear value when disabled`, () => {
    const { container } = renderWithNexUIProvider(
      <Input clearable defaultValue='test' disabled />,
    )
    expect(
      container.querySelector('.ant-input-clear-icon-hidden'),
    ).not.toBeInTheDocument()
  })

  it('should forward classes to Input', () => {
    const rootClassName = 'test-root-class'
    const clearBtnClassName = 'test-clear-btn-class'

    const { container } = renderWithNexUIProvider(
      <Input
        classes={{
          root: rootClassName,
          clearButton: clearBtnClassName,
        }}
        clearable
        defaultValue='default'
      />,
    )

    const root = container.firstChild
    const clearButton = container.querySelector(`.${inputClasses['clear-btn']}`)

    expect(root).toHaveClass(rootClassName)
    expect(clearButton).toHaveClass(clearBtnClassName)
  })
})
