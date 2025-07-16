import { createRef } from 'react'
import { fireEvent, act } from '@testing-library/react'
import {
  testColorClasses,
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
  testSizeClasses,
  testRadiusClasses,
} from '~/tests/shared'
import { Checkbox, CheckboxGroup } from '../index'
import { checkboxClasses } from '../checkboxClasses'

describe('Checkbox', () => {
  testComponentStability(<Checkbox />, {
    useAct: true,
  })

  testRootClassName(<Checkbox className='test-class' />, 'test-class', {
    useAct: true,
  })

  testColorClasses(<Checkbox>Checkbox</Checkbox>, checkboxClasses, {
    useAct: true,
  })

  testSizeClasses(<Checkbox>Checkbox</Checkbox>, checkboxClasses, {
    useAct: true,
  })

  testRadiusClasses(<Checkbox>Checkbox</Checkbox>, checkboxClasses, {
    useAct: true,
  })

  it('should render with default props', async () => {
    const { container, getByRole } = await renderWithNexUIProvider(
      <Checkbox />,
      {
        useAct: true,
      },
    )

    const root = container.firstElementChild
    expect(root).toHaveClass(checkboxClasses.root)
    expect(root).toHaveClass(checkboxClasses['size-md'])
    expect(root).toHaveClass(checkboxClasses['radius-md'])
    expect(root).toHaveClass(checkboxClasses['color-blue'])

    expect(root).not.toHaveClass(checkboxClasses['color-green'])
    expect(root).not.toHaveClass(checkboxClasses['color-cyan'])
    expect(root).not.toHaveClass(checkboxClasses['color-orange'])
    expect(root).not.toHaveClass(checkboxClasses['color-pink'])
    expect(root).not.toHaveClass(checkboxClasses['color-purple'])
    expect(root).not.toHaveClass(checkboxClasses['color-yellow'])
    expect(root).not.toHaveClass(checkboxClasses['color-red'])
    expect(root).not.toHaveClass(checkboxClasses['color-gray'])
    expect(root).not.toHaveClass(checkboxClasses['size-sm'])
    expect(root).not.toHaveClass(checkboxClasses['size-lg'])
    expect(root).not.toHaveClass(checkboxClasses['radius-sm'])
    expect(root).not.toHaveClass(checkboxClasses['radius-lg'])
    expect(root).not.toHaveClass(checkboxClasses['radius-full'])
    expect(root).not.toHaveClass(checkboxClasses.indeterminate)
    expect(root).not.toHaveClass(checkboxClasses.checked)
    expect(root).not.toHaveClass(checkboxClasses.disabled)

    const checkbox = getByRole('checkbox')

    expect(checkbox).toHaveClass(checkboxClasses.input)
    expect(checkbox.nextElementSibling).toHaveClass(checkboxClasses.icon)

    expect(root).toMatchSnapshot()
  })

  it("should forward ref to Checkbox's input element", async () => {
    const ref = createRef<HTMLInputElement>()
    const { getByRole } = await renderWithNexUIProvider(
      <Checkbox ref={ref} />,
      {
        useAct: true,
      },
    )
    const checkbox = getByRole('checkbox')
    expect(ref.current).toBe(checkbox)
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
    const checkbox = getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('should render checked checkbox by defaultChecked prop', async () => {
    const { getByRole } = await renderWithNexUIProvider(
      <Checkbox defaultChecked />,
      {
        useAct: true,
      },
    )
    const checkbox = getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('should render checked checkbox when checked prop is true', async () => {
    const { getByRole, container } = await renderWithNexUIProvider(
      <Checkbox checked />,
      {
        useAct: true,
      },
    )
    const checkbox = getByRole('checkbox')
    expect(checkbox).toBeChecked()
    expect(container.firstElementChild).toHaveClass(checkboxClasses.checked)
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

  it('should forward classes to icon, root, input and label slots', async () => {
    const { container } = await renderWithNexUIProvider(
      <Checkbox
        classes={{
          icon: 'test-class-icon',
          root: 'test-class-root',
          input: 'test-class-input',
          label: 'test-class-label',
        }}
      >
        Checkbox
      </Checkbox>,
      {
        useAct: true,
      },
    )

    const root = container.querySelector(`.${checkboxClasses.root}`)
    const label = container.querySelector(`.${checkboxClasses.label}`)
    const icon = container.querySelector(`.${checkboxClasses.icon}`)
    const input = container.querySelector(`.${checkboxClasses.input}`)

    expect(root).toHaveClass('test-class-root')
    expect(icon).toHaveClass('test-class-icon')
    expect(label).toHaveClass('test-class-label')
    expect(input).toHaveClass('test-class-input')
  })

  it('should forward slotProps to icon, root and label slots', async () => {
    const { container } = await renderWithNexUIProvider(
      <Checkbox
        slotProps={{
          root: { className: 'test-class-root' },
          label: { className: 'test-class-label' },
          icon: { className: 'test-class-icon' },
        }}
      >
        Checkbox
      </Checkbox>,
      {
        useAct: true,
      },
    )

    const root = container.querySelector(`.${checkboxClasses.root}`)
    const label = container.querySelector(`.${checkboxClasses.label}`)
    const icon = container.querySelector(`.${checkboxClasses.icon}`)

    expect(root).toHaveClass('test-class-root')
    expect(label).toHaveClass('test-class-label')
    expect(icon).toHaveClass('test-class-icon')
  })

  it('should disable the checkbox when disabled prop is true', async () => {
    const onCheckedChange = jest.fn(() => {})

    const { getByRole, container } = await renderWithNexUIProvider(
      <Checkbox disabled onCheckedChange={onCheckedChange} />,
      {
        useAct: true,
      },
    )

    const checkbox = getByRole('checkbox')

    expect(checkbox).toBeDisabled()
    expect(container.firstElementChild).toHaveClass(checkboxClasses.disabled)
    await act(async () => {
      fireEvent.click(checkbox)
    })
    expect(onCheckedChange).not.toHaveBeenCalled()
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
    expect(container.firstElementChild).toHaveClass(
      checkboxClasses.indeterminate,
    )
  })

  it('should render custom icon when icon prop is provided', async () => {
    const { getByTestId, rerender, container } = await renderWithNexUIProvider(
      <Checkbox
        defaultChecked
        icon={<span data-testid='custom-icon'>Icon</span>}
      />,
      {
        useAct: true,
      },
    )
    const icon = getByTestId('custom-icon')
    expect(icon).toBeInTheDocument()

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
    })
    expect(getByTestId('custom-icon')).toBeInTheDocument()

    rerender(<Checkbox icon='123' defaultChecked />)

    expect(
      container.querySelector(`.${checkboxClasses.icon}`),
    ).toHaveTextContent('123')
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

  it("should warn when Checkbox's value is not set within CheckboxGroup", async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

    await renderWithNexUIProvider(
      <CheckboxGroup>
        <Checkbox>orange</Checkbox>
      </CheckboxGroup>,
      {
        useAct: true,
      },
    )

    expect(consoleSpy).toHaveBeenCalledWith(
      '[Nex UI] Checkbox: The CheckboxGroup is being used, but `value` is not provided.',
    )

    consoleSpy.mockRestore()
  })
})
