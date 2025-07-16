import { createRef } from 'react'
import { fireEvent, act } from '@testing-library/react'
import {
  mountTest,
  renderWithNexUIProvider,
  rootClassNameTest,
} from '~/tests/shared'
import { Checkbox, CheckboxGroup } from '../index'
import { checkboxClasses } from '../checkboxClasses'

describe('Checkbox', () => {
  mountTest(<Checkbox />, {
    useAct: true,
  })

  rootClassNameTest(<Checkbox className='test-class' />, 'test-class', {
    useAct: true,
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

  it('should render Checkbox with the root, size-md, radius-md, and color-blue classes but no others', async () => {
    const { container } = await renderWithNexUIProvider(<Checkbox />, {
      useAct: true,
    })

    const checkbox = container.firstElementChild
    expect(checkbox).toHaveClass(checkboxClasses.root)
    expect(checkbox).toHaveClass(checkboxClasses['size-md'])
    expect(checkbox).toHaveClass(checkboxClasses['radius-md'])
    expect(checkbox).toHaveClass(checkboxClasses['color-blue'])
    expect(checkbox).not.toHaveClass(checkboxClasses['color-green'])
    expect(checkbox).not.toHaveClass(checkboxClasses['color-cyan'])
    expect(checkbox).not.toHaveClass(checkboxClasses['color-orange'])
    expect(checkbox).not.toHaveClass(checkboxClasses['color-pink'])
    expect(checkbox).not.toHaveClass(checkboxClasses['color-purple'])
    expect(checkbox).not.toHaveClass(checkboxClasses['color-yellow'])
    expect(checkbox).not.toHaveClass(checkboxClasses['color-red'])
    expect(checkbox).not.toHaveClass(checkboxClasses['color-gray'])
    expect(checkbox).not.toHaveClass(checkboxClasses['size-sm'])
    expect(checkbox).not.toHaveClass(checkboxClasses['size-lg'])
    expect(checkbox).not.toHaveClass(checkboxClasses['radius-sm'])
    expect(checkbox).not.toHaveClass(checkboxClasses['radius-lg'])
    expect(checkbox).not.toHaveClass(checkboxClasses['radius-full'])
    expect(checkbox).not.toHaveClass(checkboxClasses.indeterminate)
    expect(checkbox).not.toHaveClass(checkboxClasses.checked)
    expect(checkbox).not.toHaveClass(checkboxClasses.disabled)
  })

  it('should add the appropriate color class to root element based on color prop', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <>
        <Checkbox color='red' data-testid='color-red'>
          Checkbox
        </Checkbox>
        <Checkbox color='blue' data-testid='color-blue'>
          Checkbox
        </Checkbox>
        <Checkbox color='cyan' data-testid='color-cyan'>
          Checkbox
        </Checkbox>
        <Checkbox color='orange' data-testid='color-orange'>
          Checkbox
        </Checkbox>
        <Checkbox color='pink' data-testid='color-pink'>
          Checkbox
        </Checkbox>
        <Checkbox color='purple' data-testid='color-purple'>
          Checkbox
        </Checkbox>
        <Checkbox color='gray' data-testid='color-gray'>
          Checkbox
        </Checkbox>
        <Checkbox color='yellow' data-testid='color-yellow'>
          Checkbox
        </Checkbox>
        <Checkbox color='green' data-testid='color-green'>
          Checkbox
        </Checkbox>
      </>,
      {
        useAct: true,
      },
    )

    expect(getByTestId('color-red').parentElement).toHaveClass(
      checkboxClasses['color-red'],
    )
    expect(getByTestId('color-blue').parentElement).toHaveClass(
      checkboxClasses['color-blue'],
    )
    expect(getByTestId('color-cyan').parentElement).toHaveClass(
      checkboxClasses['color-cyan'],
    )
    expect(getByTestId('color-orange').parentElement).toHaveClass(
      checkboxClasses['color-orange'],
    )
    expect(getByTestId('color-pink').parentElement).toHaveClass(
      checkboxClasses['color-pink'],
    )
    expect(getByTestId('color-purple').parentElement).toHaveClass(
      checkboxClasses['color-purple'],
    )
    expect(getByTestId('color-green').parentElement).toHaveClass(
      checkboxClasses['color-green'],
    )
    expect(getByTestId('color-yellow').parentElement).toHaveClass(
      checkboxClasses['color-yellow'],
    )
    expect(getByTestId('color-green').parentElement).toHaveClass(
      checkboxClasses['color-green'],
    )
  })

  it('should add the appropriate size class to root element based on size prop', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <>
        <Checkbox size='sm' data-testid='size-sm'>
          Checkbox
        </Checkbox>
        <Checkbox size='md' data-testid='size-md'>
          Checkbox
        </Checkbox>
        <Checkbox size='lg' data-testid='size-lg'>
          Checkbox
        </Checkbox>
      </>,
      {
        useAct: true,
      },
    )

    expect(getByTestId('size-sm').parentElement).toHaveClass(
      checkboxClasses['size-sm'],
    )
    expect(getByTestId('size-md').parentElement).toHaveClass(
      checkboxClasses['size-md'],
    )
    expect(getByTestId('size-lg').parentElement).toHaveClass(
      checkboxClasses['size-lg'],
    )
  })

  it('should add the appropriate radius class to root element based on radius prop', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <>
        <Checkbox radius='sm' data-testid='radius-sm'>
          Checkbox
        </Checkbox>
        <Checkbox radius='md' data-testid='radius-md'>
          Checkbox
        </Checkbox>
        <Checkbox radius='lg' data-testid='radius-lg'>
          Checkbox
        </Checkbox>
        <Checkbox radius='full' data-testid='radius-full'>
          Checkbox
        </Checkbox>
      </>,
      {
        useAct: true,
      },
    )

    expect(getByTestId('radius-sm').parentElement).toHaveClass(
      checkboxClasses['radius-sm'],
    )
    expect(getByTestId('radius-md').parentElement).toHaveClass(
      checkboxClasses['radius-md'],
    )
    expect(getByTestId('radius-lg').parentElement).toHaveClass(
      checkboxClasses['radius-lg'],
    )
    expect(getByTestId('radius-full').parentElement).toHaveClass(
      checkboxClasses['radius-full'],
    )
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

  it('should forward classes to icon, root and label slots', async () => {
    const { container } = await renderWithNexUIProvider(
      <Checkbox
        classes={{
          icon: 'test-class-icon',
          root: 'test-class-root',
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

    expect(root).toHaveClass('test-class-root')
    expect(icon).toHaveClass('test-class-icon')
    expect(label).toHaveClass('test-class-label')
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
