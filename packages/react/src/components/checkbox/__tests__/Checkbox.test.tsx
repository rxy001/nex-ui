import { fireEvent, act } from '@testing-library/react'
import {
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
  testRefForwarding,
  testClassNamesForwarding,
  testSlotPropsForwarding,
  testColorDataAttrs,
  testSizeDataAttrs,
  testRadiusDataAttrs,
} from '~/tests/shared'
import { Checkbox, CheckboxGroup } from '../index'
import { checkboxClasses, checkboxDataAttrs } from './constants'

const slots = ['icon', 'root', 'label'] as const

describe('Checkbox', () => {
  testComponentStability(<Checkbox />, {
    useAct: true,
  })

  testRootClassName(<Checkbox />, {
    useAct: true,
  })

  testColorDataAttrs(<Checkbox>Checkbox</Checkbox>, {
    useAct: true,
  })

  testSizeDataAttrs(<Checkbox>Checkbox</Checkbox>, {
    useAct: true,
  })

  testRadiusDataAttrs(<Checkbox>Checkbox</Checkbox>, {
    useAct: true,
  })

  testRefForwarding(<Checkbox />, HTMLInputElement, {
    useAct: true,
  })

  testClassNamesForwarding(
    <Checkbox>Checkbox</Checkbox>,
    slots,
    {
      icon: 'test-class-icon',
      root: 'test-class-root',
      label: 'test-class-label',
    },
    checkboxClasses,
    {
      useAct: true,
    },
  )

  testSlotPropsForwarding(
    <Checkbox>Checkbox</Checkbox>,
    slots,
    {
      root: { className: 'test-class-root' },
      label: { className: 'test-class-label' },
      icon: { className: 'test-class-icon' },
    },
    checkboxClasses,
    {
      useAct: true,
    },
  )

  it('should render with default props', async () => {
    const { container, getByRole } = await renderWithNexUIProvider(
      <Checkbox>Checkbox</Checkbox>,
      {
        useAct: true,
      },
    )

    const checkboxRoot = container.firstElementChild
    expect(checkboxRoot).toHaveClass(checkboxClasses.root)

    expect(checkboxRoot).toHaveAttribute(...checkboxDataAttrs['size-md'])
    expect(checkboxRoot).toHaveAttribute(...checkboxDataAttrs['radius-md'])
    expect(checkboxRoot).toHaveAttribute(...checkboxDataAttrs['color-blue'])
    expect(checkboxRoot).toHaveAttribute(...checkboxDataAttrs['disabled-false'])
    expect(checkboxRoot).toHaveAttribute(
      ...checkboxDataAttrs['indeterminate-false'],
    )
    expect(checkboxRoot).toHaveAttribute(...checkboxDataAttrs['checked-false'])
    expect(checkboxRoot).toHaveAttribute(...checkboxDataAttrs['inGroup-false'])

    expect(checkboxRoot).toMatchSnapshot()

    const checkbox = getByRole('checkbox')
    expect(checkbox).toHaveClass(checkboxClasses.input)
    expect(checkbox.nextElementSibling).toHaveClass(checkboxClasses.icon)
  })

  it("should render Checkbox's label with text children", async () => {
    const { getByText } = await renderWithNexUIProvider(
      <Checkbox>Test Label</Checkbox>,
      {
        useAct: true,
      },
    )
    expect(getByText('Test Label')).toBeInTheDocument()
  })

  it('should render unchecked checkbox by default', async () => {
    const { getByRole } = await renderWithNexUIProvider(<Checkbox />, {
      useAct: true,
    })

    expect(getByRole('checkbox')).not.toBeChecked()
  })

  it('should render checked checkbox by defaultChecked prop', async () => {
    const { getByRole } = await renderWithNexUIProvider(
      <Checkbox defaultChecked />,
      {
        useAct: true,
      },
    )

    expect(getByRole('checkbox')).toBeChecked()
  })

  it('should render checked checkbox when checked prop is true', async () => {
    const { getByRole, container } = await renderWithNexUIProvider(
      <Checkbox checked />,
      {
        useAct: true,
      },
    )

    expect(getByRole('checkbox')).toBeChecked()
    expect(container.firstElementChild).toHaveAttribute(
      ...checkboxDataAttrs['checked-true'],
    )
  })

  it('should switch checked state and call onCheckedChange when clicked', async () => {
    const onCheckedChange = jest.fn()
    const { getByRole } = await renderWithNexUIProvider(
      <Checkbox onCheckedChange={onCheckedChange} />,
      {
        useAct: true,
      },
    )

    const checkbox = getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    await act(async () => {
      fireEvent.click(checkbox)
    })

    expect(checkbox).toBeChecked()
    expect(onCheckedChange).toHaveBeenCalledWith(true)

    await act(async () => {
      fireEvent.click(checkbox)
    })

    expect(checkbox).not.toBeChecked()
    expect(onCheckedChange).toHaveBeenCalledWith(false)
  })

  it('should disable the checkbox when disabled prop is true', async () => {
    const { getByRole, container } = await renderWithNexUIProvider(
      <Checkbox disabled />,
      {
        useAct: true,
      },
    )

    const checkbox = getByRole('checkbox')
    const checkboxRoot = container.firstElementChild

    expect(checkbox).toBeDisabled()
    expect(checkboxRoot).toHaveAttribute(...checkboxDataAttrs['disabled-true'])
    expect(checkboxRoot).toHaveStyleRule('pointer-events', 'none')
  })

  it('should render indeterminate checkbox when indeterminate prop is true', async () => {
    const { getByRole, container } = await renderWithNexUIProvider(
      <Checkbox indeterminate defaultChecked />,
      {
        useAct: true,
      },
    )
    const checkbox = getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toBeChecked()
    expect(container.firstElementChild).toHaveAttribute(
      ...checkboxDataAttrs['indeterminate-true'],
    )
  })

  it('should render with custom name attribute', async () => {
    const { getByRole } = await renderWithNexUIProvider(
      <Checkbox name='agreement'>I agree to terms</Checkbox>,
      {
        useAct: true,
      },
    )
    const checkbox = getByRole('checkbox')
    expect(checkbox).toHaveAttribute('name', 'agreement')
  })

  it('should render custom icon when icon prop is provided', async () => {
    const { getByTestId, rerender, queryByClassName } =
      await renderWithNexUIProvider(
        <Checkbox
          defaultChecked
          icon={<span data-testid='custom-icon'>Icon</span>}
        />,
        {
          useAct: true,
        },
      )
    const checkboxIcon = getByTestId('custom-icon')
    expect(checkboxIcon).toBeInTheDocument()

    const renderIcon = jest.fn(() => (
      <span data-testid='custom-icon'>Icon</span>
    ))

    rerender(<Checkbox icon={renderIcon} defaultChecked />)

    expect(renderIcon).toHaveBeenCalledWith({
      type: 'checkbox',
      checked: true,
      disabled: false,
      size: 'md',
      radius: 'md',
      color: 'blue',
      defaultChecked: true,
      inGroup: false,
      name: undefined,
      icon: renderIcon,
      as: 'input',
      classNames: undefined,
      indeterminate: false,
    })
    expect(getByTestId('custom-icon')).toBeInTheDocument()

    rerender(<Checkbox icon='123' defaultChecked />)

    expect(queryByClassName(checkboxClasses.icon)).toHaveTextContent('123')
  })

  it("should warn when Checkbox's checked is set within CheckboxGroup", async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

    await renderWithNexUIProvider(
      <CheckboxGroup>
        <Checkbox value='orange' checked>
          orange
        </Checkbox>
      </CheckboxGroup>,
      {
        useAct: true,
      },
    )

    expect(consoleSpy).toHaveBeenCalledWith(
      '[Nex UI] Checkbox: The CheckboxGroup is being used, `checked` will be ignored. Use the `value` of the CheckboxGroup instead.',
    )

    consoleSpy.mockRestore()
  })

  it("should warn when Checkbox's defaultChecked is set within CheckboxGroup", async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

    await renderWithNexUIProvider(
      <CheckboxGroup>
        <Checkbox value='orange' defaultChecked>
          orange
        </Checkbox>
      </CheckboxGroup>,
      {
        useAct: true,
      },
    )

    expect(consoleSpy).toHaveBeenCalledWith(
      '[Nex UI] Checkbox: The CheckboxGroup is being used, `defaultChecked` will be ignored. Use the `defaultValue` of the CheckboxGroup instead.',
    )

    consoleSpy.mockRestore()
  })

  it("should error when Checkbox's value is not set within CheckboxGroup", async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    await renderWithNexUIProvider(
      <CheckboxGroup>
        <Checkbox>orange</Checkbox>
      </CheckboxGroup>,
      {
        useAct: true,
      },
    )

    expect(consoleSpy).toHaveBeenCalledWith(
      '[Nex UI] Checkbox: The `value` prop is required when using Checkbox inside a CheckboxGroup.',
    )

    consoleSpy.mockRestore()
  })

  it('should have data-focus-visible attribute when keyboard focused', async () => {
    const { getByRole, user } = await renderWithNexUIProvider(
      <Checkbox as='div'>Checkbox</Checkbox>,
      {
        useAct: true,
      },
    )

    const checkbox = getByRole('checkbox')

    expect(checkbox).not.toHaveAttribute('data-focus-visible')

    await user.tab()
    expect(document.activeElement).toBe(checkbox)
    expect(checkbox).toHaveAttribute('data-focus-visible', 'true')
  })

  describe('Accessibility', () => {
    it('should have type="checkbox" by default', async () => {
      const { getByRole } = await renderWithNexUIProvider(<Checkbox />, {
        useAct: true,
      })
      const checkbox = getByRole('checkbox')
      expect(checkbox).toHaveAttribute('type', 'checkbox')
    })

    it('should not apply role="checkbox" when rendered as an input', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Checkbox as='input'>Checkbox</Checkbox>,
        {
          useAct: true,
        },
      )
      const checkbox = getByRole('checkbox')
      expect(checkbox).not.toHaveAttribute('role', 'checkbox')
    })

    it('should apply role="checkbox" when rendered as a non-input element', async () => {
      const { queryByClassName } = await renderWithNexUIProvider(
        <Checkbox as='div'>Checkbox</Checkbox>,
        {
          useAct: true,
        },
      )

      expect(queryByClassName(checkboxClasses.input)).toHaveAttribute(
        'role',
        'checkbox',
      )
    })

    it('should apply checked attribute when checked', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Checkbox checked />,
        {
          useAct: true,
        },
      )
      const checkbox = getByRole('checkbox')
      expect(checkbox).toHaveAttribute('checked', '')
      expect(checkbox).not.toHaveAttribute('aria-checked', 'true')
    })

    it('should apply aria-checked="true" to non-input elements when checked', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Checkbox as='div' checked />,
        {
          useAct: true,
        },
      )
      const checkbox = getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-checked', 'true')
      expect(checkbox).not.toHaveAttribute('checked')
    })

    it('should apply aria-checked="false" to non-input elements when unchecked', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Checkbox as='div'>Checkbox</Checkbox>,
        {
          useAct: true,
        },
      )
      const checkbox = getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-checked', 'false')
      expect(checkbox).not.toHaveAttribute('checked')
    })

    it('should apply disabled attribute when disabled', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Checkbox disabled />,
        {
          useAct: true,
        },
      )
      const checkbox = getByRole('checkbox')
      expect(checkbox).toBeDisabled()
      expect(checkbox).not.toHaveAttribute('aria-disabled')
    })

    it('should apply aria-disabled="true" to non-input elements when disabled', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Checkbox as='div' disabled />,
        {
          useAct: true,
        },
      )
      const checkbox = getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-disabled', 'true')
      expect(checkbox).not.toBeDisabled()
    })

    it('should have tabIndex=0 by default', async () => {
      const { getByRole } = await renderWithNexUIProvider(<Checkbox />, {
        useAct: true,
      })
      const checkbox = getByRole('checkbox')
      expect(checkbox).toHaveAttribute('tabIndex', '0')
    })

    it('should apply tabIndex=-1 when disabled', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Checkbox disabled />,
        {
          useAct: true,
        },
      )
      const checkbox = getByRole('checkbox')
      expect(checkbox).toHaveAttribute('tabIndex', '-1')
    })

    it('should apply aria-label when children is a string', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Checkbox>Checkbox Label</Checkbox>,
        {
          useAct: true,
        },
      )
      const checkbox = getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-label', 'Checkbox Label')
    })

    it('should apply aria-label when aria-label prop is provided', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Checkbox aria-label='Custom Label'>Checkbox</Checkbox>,
        {
          useAct: true,
        },
      )
      const checkbox = getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-label', 'Custom Label')
    })

    it('should apply aria-labelledby when aria-labelledby prop is provided', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Checkbox aria-labelledby='label-id'>
          <span id='label-id'>Checkbox Label</span>
        </Checkbox>,
        {
          useAct: true,
        },
      )
      const checkbox = getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-labelledby', 'label-id')
    })

    it('should apply aria-labelledby="label-id" by default when children is a string', async () => {
      const { getByRole, queryByClassName } = await renderWithNexUIProvider(
        <Checkbox>Checkbox Label</Checkbox>,
        {
          useAct: true,
        },
      )
      const label = queryByClassName(checkboxClasses.label)
      const checkbox = getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-labelledby', label!.id)
    })

    it('should check non-input elements when clicked', async () => {
      const { container, getByRole } = await renderWithNexUIProvider(
        <Checkbox as='div'>Checkbox</Checkbox>,
        {
          useAct: true,
        },
      )
      const checkboxRoot = container.firstElementChild!
      const checkbox = getByRole('checkbox')

      expect(checkboxRoot).toHaveAttribute(
        ...checkboxDataAttrs['checked-false'],
      )
      expect(checkbox).toHaveAttribute('aria-checked', 'false')

      await act(async () => {
        fireEvent.click(checkbox)
      })

      expect(checkboxRoot).toHaveAttribute(...checkboxDataAttrs['checked-true'])
      expect(checkbox).toHaveAttribute('aria-checked', 'true')
    })

    it('should check non-input elements within CheckboxGroup when clicked', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <CheckboxGroup>
          <Checkbox value='test' as='div'>
            Test Checkbox
          </Checkbox>
        </CheckboxGroup>,
        {
          useAct: true,
        },
      )
      const checkbox = getByRole('checkbox')
      const checkboxRoot = checkbox.parentElement!

      expect(checkboxRoot).toHaveAttribute(
        ...checkboxDataAttrs['checked-false'],
      )

      await act(async () => {
        fireEvent.click(checkbox)
      })
      expect(checkboxRoot).toHaveAttribute(...checkboxDataAttrs['checked-true'])
    })

    it('should activate non-input elements when space is pressed', async () => {
      const onChange = jest.fn()
      const { user, getByRole } = await renderWithNexUIProvider(
        <Checkbox as='span' onCheckedChange={onChange}>
          Focusable Span
        </Checkbox>,
        {
          useAct: true,
        },
      )

      const span = getByRole('checkbox')
      await user.tab()
      expect(document.activeElement).toBe(span)

      await user.keyboard(' ')
      expect(span).toHaveAttribute('aria-checked', 'true')
      expect(onChange).toHaveBeenCalledWith(true)

      await user.keyboard(' ')
      expect(span).toHaveAttribute('aria-checked', 'false')
      expect(onChange).toHaveBeenCalledWith(false)
    })
  })
})
