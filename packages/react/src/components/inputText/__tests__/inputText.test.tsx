import { describe, it, expect } from '@jest/globals'
import { useState } from 'react'
import { fireEvent } from '@testing-library/react'
import { mountTest, refTest, renderWithNexProvider } from '~/tests/shared'
import { InputText } from '../InputText'
import { inputTextClasses } from '../inputTextClasses'

describe('InputText', () => {
  mountTest(<InputText />)
  refTest(<InputText />)

  it('renders correctly', () => {
    const { container } = renderWithNexProvider(<InputText />)
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should render with the root, variant-outlined, radius-md, size-md, color-blue classes but no others', () => {
    const { container } = renderWithNexProvider(<InputText />)

    const root = container.firstElementChild

    expect(root).toHaveClass(inputTextClasses.root)
    expect(root).toHaveClass(inputTextClasses['variant-outlined'])
    expect(root).toHaveClass(inputTextClasses['size-md'])
    expect(root).toHaveClass(inputTextClasses['radius-md'])
    expect(root).toHaveClass(inputTextClasses['color-blue'])

    expect(root).not.toHaveClass(inputTextClasses['variant-borderless'])
    expect(root).not.toHaveClass(inputTextClasses['variant-filled'])
    expect(root).not.toHaveClass(inputTextClasses['size-lg'])
    expect(root).not.toHaveClass(inputTextClasses['size-sm'])
    expect(root).not.toHaveClass(inputTextClasses['radius-full'])
    expect(root).not.toHaveClass(inputTextClasses['radius-lg'])
    expect(root).not.toHaveClass(inputTextClasses['radius-sm'])
    expect(root).not.toHaveClass(inputTextClasses['color-yellow'])
    expect(root).not.toHaveClass(inputTextClasses['color-cyan'])
    expect(root).not.toHaveClass(inputTextClasses['color-red'])
    expect(root).not.toHaveClass(inputTextClasses['color-gray'])
    expect(root).not.toHaveClass(inputTextClasses['color-green'])
    expect(root).not.toHaveClass(inputTextClasses['color-orange'])
    expect(root).not.toHaveClass(inputTextClasses['color-purple'])
    expect(root).not.toHaveClass(inputTextClasses['color-pink'])
    expect(root).not.toHaveClass(inputTextClasses.error)
    expect(root).not.toHaveClass(inputTextClasses.disabled)
    expect(root).not.toHaveClass(inputTextClasses['full-width'])
  })

  it('input should have proper class', () => {
    const { getByTestId } = renderWithNexProvider(
      <InputText data-testid='test-input' />,
    )

    expect(getByTestId('test-input')).toHaveClass(inputTextClasses.input)
  })

  it('should add the appropriate color class to root element based on color prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <>
        <InputText color='red' data-testid='color-red' />
        <InputText color='blue' data-testid='color-blue' />
        <InputText color='cyan' data-testid='color-cyan' />
        <InputText color='orange' data-testid='color-orange' />
        <InputText color='pink' data-testid='color-pink' />
        <InputText color='purple' data-testid='color-purple' />
        <InputText color='gray' data-testid='color-gray' />
        <InputText color='yellow' data-testid='color-yellow' />
        <InputText color='green' data-testid='color-green' />
      </>,
    )

    expect(getByTestId('color-red').parentElement).toHaveClass(
      inputTextClasses['color-red'],
    )
    expect(getByTestId('color-blue').parentElement).toHaveClass(
      inputTextClasses['color-blue'],
    )
    expect(getByTestId('color-cyan').parentElement).toHaveClass(
      inputTextClasses['color-cyan'],
    )
    expect(getByTestId('color-orange').parentElement).toHaveClass(
      inputTextClasses['color-orange'],
    )
    expect(getByTestId('color-pink').parentElement).toHaveClass(
      inputTextClasses['color-pink'],
    )
    expect(getByTestId('color-purple').parentElement).toHaveClass(
      inputTextClasses['color-purple'],
    )
    expect(getByTestId('color-green').parentElement).toHaveClass(
      inputTextClasses['color-green'],
    )
    expect(getByTestId('color-yellow').parentElement).toHaveClass(
      inputTextClasses['color-yellow'],
    )
    expect(getByTestId('color-green').parentElement).toHaveClass(
      inputTextClasses['color-green'],
    )
  })

  it('should add the appropriate variant class to root element based on variant prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <>
        <InputText variant='filled' data-testid='variant-filled' />
        <InputText variant='borderless' data-testid='variant-borderless' />
        <InputText variant='outlined' data-testid='variant-outlined' />
      </>,
    )

    expect(getByTestId('variant-filled').parentElement).toHaveClass(
      inputTextClasses['variant-filled'],
    )
    expect(getByTestId('variant-borderless').parentElement).toHaveClass(
      inputTextClasses['variant-borderless'],
    )
    expect(getByTestId('variant-outlined').parentElement).toHaveClass(
      inputTextClasses['variant-outlined'],
    )
  })

  it('should add the appropriate size class to root element based on size prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <>
        <InputText size='sm' data-testid='size-sm' />

        <InputText size='md' data-testid='size-md' />
        <InputText size='lg' data-testid='size-lg' />
      </>,
    )
    expect(getByTestId('size-sm').parentElement).toHaveClass(
      inputTextClasses['size-sm'],
    )
    expect(getByTestId('size-md').parentElement).toHaveClass(
      inputTextClasses['size-md'],
    )
    expect(getByTestId('size-lg').parentElement).toHaveClass(
      inputTextClasses['size-lg'],
    )
  })

  it('should add the appropriate radius class to root element based on radius prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <>
        <InputText radius='sm' data-testid='radius-sm' />
        <InputText radius='md' data-testid='radius-md' />
        <InputText radius='lg' data-testid='radius-lg' />
        <InputText radius='full' data-testid='radius-full' />
      </>,
    )

    expect(getByTestId('radius-sm').parentElement).toHaveClass(
      inputTextClasses['radius-sm'],
    )
    expect(getByTestId('radius-md').parentElement).toHaveClass(
      inputTextClasses['radius-md'],
    )
    expect(getByTestId('radius-lg').parentElement).toHaveClass(
      inputTextClasses['radius-lg'],
    )
    expect(getByTestId('radius-full').parentElement).toHaveClass(
      inputTextClasses['radius-full'],
    )
  })

  it('should add the appropriate radius class to root element based on error prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <InputText error data-testid='error' />,
    )

    expect(getByTestId('error').parentElement).toHaveClass(
      inputTextClasses.error,
    )
  })

  it('should add the appropriate radius class to root element based on disabled prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <InputText disabled data-testid='disabled' />,
    )

    expect(getByTestId('disabled').parentElement).toHaveClass(
      inputTextClasses.disabled,
    )
  })

  it('should add the appropriate radius class to root element based on fullWidth prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <InputText fullWidth data-testid='full-width' />,
    )

    expect(getByTestId('full-width').parentElement).toHaveClass(
      inputTextClasses['full-width'],
    )
  })

  it('should support prefix and suffix props', () => {
    const { getByText } = renderWithNexProvider(
      <InputText prefix={<span>Prefix</span>} suffix={<span>Suffix</span>} />,
    )
    expect(getByText('Prefix')).toBeInTheDocument()
    expect(getByText('Suffix')).toBeInTheDocument()
  })

  it('should support clearable props', () => {
    const ClearableInput: React.FC = () => {
      const [value, setValue] = useState('defalt')

      return (
        <InputText
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
    const { getByTestId, container } = renderWithNexProvider(<ClearableInput />)
    const input = getByTestId('clearable-input')

    expect(input.getAttribute('value')).toBe('defalt')
    expect(
      container.querySelector(`.${inputTextClasses['clear-btn']}`),
    ).toBeInTheDocument()

    fireEvent.change(input, {
      target: {
        value: 'changed',
      },
    })

    expect(input.getAttribute('value')).toBe('changed')
    expect(
      container.querySelector(`.${inputTextClasses['clear-btn']}`),
    ).toBeInTheDocument()

    fireEvent.click(
      container.querySelector(`.${inputTextClasses['clear-btn']}`)!,
    )
    expect(input.getAttribute('value')).toBe('')
    expect(
      container.querySelector(`.${inputTextClasses['clear-btn']}`),
    ).not.toBeInTheDocument()
    expect(document.activeElement).toBe(input)
  })

  it(`should not allow clear value when disabled`, () => {
    const { container } = renderWithNexProvider(
      <InputText clearable defaultValue='test' disabled />,
    )
    expect(
      container.querySelector('.ant-input-clear-icon-hidden'),
    ).not.toBeInTheDocument()
  })

  it('should forward classes to InputText', () => {
    const rootClassName = 'test-root-class'
    const inputClassName = 'test-input-class'
    const clearBtnClassName = 'test-clear-btn-class'

    const { container } = renderWithNexProvider(
      <InputText
        classes={{
          root: rootClassName,
          input: inputClassName,
          clearBtn: clearBtnClassName,
        }}
        clearable
        defaultValue='default'
      />,
    )

    const root = container.firstChild
    const input = container.querySelector(`.${inputTextClasses.input}`)
    const clearBtn = container.querySelector(
      `.${inputTextClasses['clear-btn']}`,
    )

    expect(root).toHaveClass(rootClassName)
    expect(input).toHaveClass(inputClassName)
    expect(clearBtn).toHaveClass(clearBtnClassName)
  })
})
