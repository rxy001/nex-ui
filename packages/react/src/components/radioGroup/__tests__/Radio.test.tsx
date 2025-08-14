import { act, fireEvent } from '@testing-library/react'
import {
  testComponentStability,
  testRootClassName,
  testColorClasses,
  testSizeClasses,
  renderWithNexUIProvider,
} from '~/tests/shared'
import { createRef } from 'react'
import { Radio, RadioGroup } from '../index'
import { radioClasses } from '../classes'

describe('Radio', () => {
  testComponentStability(<Radio value='1'>Option 1</Radio>)

  testRootClassName(<Radio className='test-class' />, 'test-class')

  testColorClasses(<Radio>Radio</Radio>, radioClasses)

  testSizeClasses(<Radio>Radio</Radio>, radioClasses)

  it('should render with default props', () => {
    const { container, getByRole } = renderWithNexUIProvider(
      <Radio>Radio</Radio>,
    )

    const radioRoot = container.firstElementChild
    expect(radioRoot).toHaveClass(radioClasses.root)
    expect(radioRoot).toHaveClass(radioClasses['size-md'])
    expect(radioRoot).toHaveClass(radioClasses['color-blue'])

    expect(radioRoot).not.toHaveClass(radioClasses['color-green'])
    expect(radioRoot).not.toHaveClass(radioClasses['color-cyan'])
    expect(radioRoot).not.toHaveClass(radioClasses['color-orange'])
    expect(radioRoot).not.toHaveClass(radioClasses['color-pink'])
    expect(radioRoot).not.toHaveClass(radioClasses['color-purple'])
    expect(radioRoot).not.toHaveClass(radioClasses['color-yellow'])
    expect(radioRoot).not.toHaveClass(radioClasses['color-red'])
    expect(radioRoot).not.toHaveClass(radioClasses['color-gray'])
    expect(radioRoot).not.toHaveClass(radioClasses['size-sm'])
    expect(radioRoot).not.toHaveClass(radioClasses['size-lg'])
    expect(radioRoot).not.toHaveClass(radioClasses.checked)
    expect(radioRoot).not.toHaveClass(radioClasses.disabled)
    expect(radioRoot).toMatchSnapshot()

    const radio = getByRole('radio')
    expect(radio).toHaveClass(radioClasses.input)
    expect(radio.nextElementSibling).toHaveClass(radioClasses.dot)
  })

  it("should forward ref to Radio's input element", () => {
    const ref = createRef<HTMLInputElement>()
    const { getByRole } = renderWithNexUIProvider(<Radio ref={ref} />)
    expect(ref.current).toBe(getByRole('radio'))
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
    const { getByRole } = renderWithNexUIProvider(<Radio defaultChecked />)

    expect(getByRole('radio')).toBeChecked()
  })

  it('should render checked radio when checked prop is true', () => {
    const { getByRole, container } = renderWithNexUIProvider(<Radio checked />)

    expect(getByRole('radio')).toBeChecked()
    expect(container.firstElementChild).toHaveClass(radioClasses.checked)
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

  it('should forward classes to root, input, dot and label slots', () => {
    const classes = {
      root: 'test-class-root',
      input: 'test-class-input',
      dot: 'test-class-dot',
      label: 'test-class-label',
    }

    const { container } = renderWithNexUIProvider(
      <Radio classes={classes}>Radio</Radio>,
    )

    const radioRoot = container.querySelector(`.${radioClasses.root}`)
    const radioLabel = container.querySelector(`.${radioClasses.label}`)
    const radioDot = container.querySelector(`.${radioClasses.dot}`)
    const radio = container.querySelector(`.${radioClasses.input}`)

    expect(radioRoot).toHaveClass(classes.root)
    expect(radioDot).toHaveClass(classes.dot)
    expect(radioLabel).toHaveClass(classes.label)
    expect(radio).toHaveClass(classes.input)
  })

  it('should forward slotProps to root, dot and label slots', () => {
    const { container } = renderWithNexUIProvider(
      <Radio
        slotProps={{
          root: { className: 'test-class-root' },
          label: { className: 'test-class-label' },
          dot: { className: 'test-class-dot' },
        }}
      >
        Radio
      </Radio>,
    )

    const radioRoot = container.querySelector(`.${radioClasses.root}`)
    const radioLabel = container.querySelector(`.${radioClasses.label}`)
    const radioIcon = container.querySelector(`.${radioClasses.dot}`)

    expect(radioRoot).toHaveClass('test-class-root')
    expect(radioLabel).toHaveClass('test-class-label')
    expect(radioIcon).toHaveClass('test-class-dot')
  })

  it('should disable the radio when disabled prop is true', () => {
    const { getByRole, container } = renderWithNexUIProvider(<Radio disabled />)

    const radio = getByRole('radio')
    const radioRoot = container.firstElementChild

    expect(radio).toBeDisabled()
    expect(radioRoot).toHaveClass(radioClasses.disabled)
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

  it('should have data-focus-visible attribute when focused', async () => {
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
      const { container } = renderWithNexUIProvider(
        <Radio as='input'>Radio</Radio>,
      )
      const radio = container.querySelector(`.${radioClasses.input}`)
      expect(radio).not.toHaveAttribute('role', 'radio')
    })

    it('should apply role="radio" when rendered as a non-input element', () => {
      const { container } = renderWithNexUIProvider(
        <Radio as='div'>Radio</Radio>,
      )

      const radio = container.querySelector(`.${radioClasses.input}`)
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
      const { getByRole, container } = renderWithNexUIProvider(
        <Radio>Radio Label</Radio>,
      )
      const label = container.querySelector(`.${radioClasses.label}`)
      const radio = getByRole('radio')
      expect(radio).toHaveAttribute('aria-labelledby', label!.id)
    })

    it('should check non-input elements when clicked', async () => {
      const { container, getByRole } = renderWithNexUIProvider(
        <Radio as='div'>Radio</Radio>,
      )
      const radioRoot = container.firstElementChild!
      const radio = getByRole('radio')

      expect(radioRoot).not.toHaveClass(radioClasses.checked)
      expect(radio).toHaveAttribute('aria-checked', 'false')

      await act(async () => {
        fireEvent.click(radio)
      })

      expect(radioRoot).toHaveClass(radioClasses.checked)
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
