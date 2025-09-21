import { act, fireEvent } from '@testing-library/react'
import {
  testComponentStability,
  testRootClassName,
  renderWithNexUIProvider,
  testRefForwarding,
  testClassNamesForwarding,
  testSlotPropsForwarding,
  testColorDataAttrs,
  testSizeDataAttrs,
} from '~/tests/shared'
import { Radio, RadioGroup } from '../index'
import { radioClasses, radioDataAttrs } from './constants'

const slots = ['root', 'dot', 'label'] as const

describe('Radio', () => {
  testComponentStability(<Radio value='1'>Option 1</Radio>)

  testRootClassName(<Radio />)

  testRefForwarding(<Radio />, HTMLInputElement)

  testColorDataAttrs(<Radio>Radio</Radio>)

  testSizeDataAttrs(<Radio>Radio</Radio>)

  testClassNamesForwarding(
    <Radio>Radio</Radio>,
    slots,
    {
      root: 'test-class-root',
      dot: 'test-class-dot',
      label: 'test-class-label',
    },
    radioClasses,
  )

  testSlotPropsForwarding(
    <Radio>Radio</Radio>,
    slots,
    {
      root: { className: 'test-class-root' },
      label: { className: 'test-class-label' },
      dot: { className: 'test-class-dot' },
    },
    radioClasses,
  )

  it('should render with default props', () => {
    const { container, getByRole } = renderWithNexUIProvider(
      <Radio>Radio</Radio>,
    )

    const radioRoot = container.firstElementChild
    expect(radioRoot).toHaveClass(radioClasses.root)
    expect(radioRoot).toHaveAttribute(...radioDataAttrs['size-md'])
    expect(radioRoot).toHaveAttribute(...radioDataAttrs['color-blue'])
    expect(radioRoot).toHaveAttribute(...radioDataAttrs['checked-false'])
    expect(radioRoot).toHaveAttribute(...radioDataAttrs['disabled-false'])
    expect(radioRoot).toMatchSnapshot()

    const radio = getByRole('radio')
    expect(radio).toHaveClass(radioClasses.input)
    expect(radio.nextElementSibling).toHaveClass(radioClasses.dot)
  })

  it("should render Radio's label with text children", () => {
    const { getByText } = renderWithNexUIProvider(<Radio>Test Label</Radio>)
    expect(getByText('Test Label')).toBeInTheDocument()
  })

  it('should render unchecked radio by default', () => {
    const { getByRole } = renderWithNexUIProvider(<Radio />)

    expect(getByRole('radio')).not.toBeChecked()
  })

  it('should render checked radio by defaultChecked prop', () => {
    const { getByRole, container } = renderWithNexUIProvider(
      <Radio defaultChecked />,
    )

    expect(getByRole('radio')).toBeChecked()
    expect(container.firstElementChild).toHaveAttribute(
      ...radioDataAttrs['checked-true'],
    )
  })

  it('should render checked radio when checked prop is true', () => {
    const { getByRole, container } = renderWithNexUIProvider(<Radio checked />)

    expect(getByRole('radio')).toBeChecked()
    expect(container.firstElementChild).toHaveAttribute(
      ...radioDataAttrs['checked-true'],
    )
  })

  it('should switch checked state and call onCheckedChange when clicked', async () => {
    const onCheckedChange = jest.fn()
    const { getByRole } = renderWithNexUIProvider(
      <Radio onCheckedChange={onCheckedChange} />,
    )

    const radio = getByRole('radio')
    expect(radio).not.toBeChecked()

    await act(async () => {
      fireEvent.click(radio)
    })

    expect(radio).toBeChecked()
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('should disable the radio when disabled prop is true', () => {
    const { getByRole, container } = renderWithNexUIProvider(<Radio disabled />)

    const radio = getByRole('radio')
    const radioRoot = container.firstElementChild

    expect(radio).toBeDisabled()
    expect(radioRoot).toHaveAttribute(...radioDataAttrs['checked-false'])
    expect(radioRoot).toHaveStyleRule('pointer-events', 'none')
  })

  it("should warn when Radio's checked is set within RadioGroup", () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

    renderWithNexUIProvider(
      <RadioGroup>
        <Radio value='orange' checked>
          orange
        </Radio>
      </RadioGroup>,
    )

    expect(consoleSpy).toHaveBeenCalledWith(
      '[Nex UI] Radio: The RadioGroup is being used, `checked` will be ignored. Use the `value` of the RadioGroup instead.',
    )

    consoleSpy.mockRestore()
  })

  it("should warn when Radio's defaultChecked is set within RadioGroup", () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

    renderWithNexUIProvider(
      <RadioGroup>
        <Radio value='orange' defaultChecked>
          orange
        </Radio>
      </RadioGroup>,
    )

    expect(consoleSpy).toHaveBeenCalledWith(
      '[Nex UI] Radio: The RadioGroup is being used, `defaultChecked` will be ignored. Use the `defaultValue` of the RadioGroup instead.',
    )

    consoleSpy.mockRestore()
  })

  it("should error when Radio's value is not set within RadioGroup", () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    renderWithNexUIProvider(
      <RadioGroup>
        <Radio>orange</Radio>
      </RadioGroup>,
    )

    expect(consoleSpy).toHaveBeenCalledWith(
      '[Nex UI] Radio: The `value` prop is required when using Radio inside a RadioGroup',
    )

    consoleSpy.mockRestore()
  })

  it('should have data-focus-visible attribute when keyboard focused', async () => {
    const { getByRole, user } = renderWithNexUIProvider(
      <Radio as='div'>Radio</Radio>,
    )

    const radio = getByRole('radio')

    expect(radio).not.toHaveAttribute('data-focus-visible')

    await user.tab()
    expect(document.activeElement).toBe(radio)
    expect(radio).toHaveAttribute('data-focus-visible', 'true')
  })

  describe('Accessibility', () => {
    it('should have type="radio" by default', () => {
      const { getByRole } = renderWithNexUIProvider(<Radio />)
      const radio = getByRole('radio')
      expect(radio).toHaveAttribute('type', 'radio')
    })

    it('should not apply role="radio" when rendered as an input', () => {
      const { queryByClassName } = renderWithNexUIProvider(
        <Radio as='input'>Radio</Radio>,
      )
      const radio = queryByClassName(radioClasses.input)
      expect(radio).not.toHaveAttribute('role', 'radio')
    })

    it('should apply role="radio" when rendered as a non-input element', () => {
      const { queryByClassName } = renderWithNexUIProvider(
        <Radio as='div'>Radio</Radio>,
      )

      const radio = queryByClassName(radioClasses.input)
      expect(radio).toHaveAttribute('role', 'radio')
    })

    it('should apply checked attribute when checked', () => {
      const { getByRole } = renderWithNexUIProvider(<Radio checked />)
      const radio = getByRole('radio')
      expect(radio).toHaveAttribute('checked', '')
      expect(radio).not.toHaveAttribute('aria-checked', 'true')
    })

    it('should apply aria-checked="true" to non-input elements when checked', () => {
      const { getByRole } = renderWithNexUIProvider(<Radio as='div' checked />)
      const radio = getByRole('radio')
      expect(radio).toHaveAttribute('aria-checked', 'true')
      expect(radio).not.toHaveAttribute('checked')
    })

    it('should apply aria-checked="false" to non-input elements when unchecked', () => {
      const { getByRole } = renderWithNexUIProvider(<Radio as='div' />)
      const radio = getByRole('radio')
      expect(radio).toHaveAttribute('aria-checked', 'false')
      expect(radio).not.toHaveAttribute('checked')
    })

    it('should apply disabled attribute when disabled', () => {
      const { getByRole } = renderWithNexUIProvider(<Radio disabled />)
      const radio = getByRole('radio')
      expect(radio).toBeDisabled()
      expect(radio).not.toHaveAttribute('aria-disabled')
    })

    it('should apply aria-disabled="true" to non-input elements when disabled', () => {
      const { getByRole } = renderWithNexUIProvider(<Radio as='div' disabled />)
      const radio = getByRole('radio')
      expect(radio).toHaveAttribute('aria-disabled', 'true')
      expect(radio).not.toBeDisabled()
    })

    it('should have tabIndex=0 by default', () => {
      const { getByRole } = renderWithNexUIProvider(<Radio />)
      const radio = getByRole('radio')
      expect(radio).toHaveAttribute('tabIndex', '0')
    })

    it('should apply tabIndex=-1 when disabled', () => {
      const { getByRole } = renderWithNexUIProvider(<Radio disabled />)
      const radio = getByRole('radio')
      expect(radio).toHaveAttribute('tabIndex', '-1')
    })

    it('should apply aria-label when children is a string', () => {
      const { getByRole } = renderWithNexUIProvider(<Radio>Radio Label</Radio>)
      const radio = getByRole('radio')
      expect(radio).toHaveAttribute('aria-label', 'Radio Label')
    })

    it('should apply aria-label when aria-label prop is provided', () => {
      const { getByRole } = renderWithNexUIProvider(
        <Radio aria-label='Custom Label'>Radio</Radio>,
      )
      const radio = getByRole('radio')
      expect(radio).toHaveAttribute('aria-label', 'Custom Label')
    })

    it('should apply aria-labelledby when aria-labelledby prop is provided', () => {
      const { getByRole } = renderWithNexUIProvider(
        <Radio aria-labelledby='label-id'>
          <span id='label-id'>Radio Label</span>
        </Radio>,
      )
      const radio = getByRole('radio')
      expect(radio).toHaveAttribute('aria-labelledby', 'label-id')
      expect(radio).not.toHaveAttribute('aria-label')
    })

    it('should apply aria-labelledby="label-id" by default when children is a string', () => {
      const { getByRole, queryByClassName } = renderWithNexUIProvider(
        <Radio>Radio Label</Radio>,
      )
      const label = queryByClassName(radioClasses.label)
      const radio = getByRole('radio')
      expect(radio).toHaveAttribute('aria-labelledby', label!.id)
    })

    it('should check non-input elements when clicked', async () => {
      const { container, getByRole } = renderWithNexUIProvider(
        <Radio as='div'>Radio</Radio>,
      )
      const radioRoot = container.firstElementChild!
      const radio = getByRole('radio')

      expect(radioRoot).toHaveAttribute(...radioDataAttrs['checked-false'])
      expect(radio).toHaveAttribute('aria-checked', 'false')

      await act(async () => {
        fireEvent.click(radio)
      })

      expect(radioRoot).toHaveAttribute(...radioDataAttrs['checked-true'])
      expect(radio).toHaveAttribute('aria-checked', 'true')
    })

    it('should check non-input elements when space is pressed', async () => {
      const onChange = jest.fn()

      const { user, getByRole } = renderWithNexUIProvider(
        <Radio as='span' onCheckedChange={onChange}>
          Focusable Span
        </Radio>,
      )

      const span = getByRole('radio')
      await user.tab()
      expect(document.activeElement).toBe(span)

      await user.keyboard(' ')
      expect(span).toHaveAttribute('aria-checked', 'true')
      expect(onChange).toHaveBeenCalledWith(true)
    })
  })
})
