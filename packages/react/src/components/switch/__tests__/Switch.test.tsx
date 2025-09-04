import { useState } from 'react'
import { act, fireEvent } from '@testing-library/react'
import {
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
  testColorClasses,
  testSizeClasses,
  testRefForwarding,
  testClassesForwarding,
  testSlotPropsForwarding,
} from '~/tests/shared'
import { Switch } from '../index'
import { switchClasses } from '../switchClasses'

const slots = [
  'root',
  'track',
  'thumb',
  'startIcon',
  'endIcon',
  'label',
] as const

describe('Switch', () => {
  testComponentStability(<Switch />)

  testRootClassName(<Switch />)

  testColorClasses(<Switch />, switchClasses)

  testSizeClasses(<Switch />, switchClasses)

  testRefForwarding(<Switch />, HTMLInputElement)

  testClassesForwarding(
    <Switch startIcon={<span>Start</span>} endIcon={<span>End</span>}>
      Switch
    </Switch>,
    slots,
    {
      root: 'test-root-class',
      track: 'test-track-class',
      thumb: 'test-thumb-class',
      startIcon: 'test-start-icon-class',
      endIcon: 'test-end-icon-class',
      label: 'test-label-class',
    },
    switchClasses,
  )

  testSlotPropsForwarding(
    <Switch startIcon={<span>Start</span>} endIcon={<span>End</span>}>
      Switch
    </Switch>,
    slots,
    {
      root: {
        className: 'test-root-class',
      },
      track: {
        className: 'test-track-class',
      },
      thumb: {
        className: 'test-thumb-class',
      },
      startIcon: {
        className: 'test-start-icon-class',
      },
      endIcon: {
        className: 'test-end-icon-class',
      },
      label: {
        className: 'test-label-class',
      },
    },
    switchClasses,
  )

  it('should render with default props', () => {
    const { container, getByRole } = renderWithNexUIProvider(<Switch />)

    const root = container.firstElementChild
    const input = getByRole('switch')

    expect(root).toMatchSnapshot()
    expect(root).toHaveClass(switchClasses.root)
    expect(root).toHaveClass(switchClasses['color-blue'])
    expect(root).toHaveClass(switchClasses['size-md'])
    expect(input).toHaveClass(switchClasses.input)

    expect(root).not.toHaveClass(switchClasses.disabled)
    expect(root).not.toHaveClass(switchClasses.checked)
    expect(root).not.toHaveClass(switchClasses['color-cyan'])
    expect(root).not.toHaveClass(switchClasses['color-green'])
    expect(root).not.toHaveClass(switchClasses['color-gray'])
    expect(root).not.toHaveClass(switchClasses['color-orange'])
    expect(root).not.toHaveClass(switchClasses['color-pink'])
    expect(root).not.toHaveClass(switchClasses['color-purple'])
    expect(root).not.toHaveClass(switchClasses['color-red'])
    expect(root).not.toHaveClass(switchClasses['color-yellow'])
    expect(root).not.toHaveClass(switchClasses['size-sm'])
    expect(root).not.toHaveClass(switchClasses['size-lg'])
  })

  it('should render label with children', () => {
    const { getByText } = renderWithNexUIProvider(<Switch>Switch</Switch>)

    expect(getByText('Switch')).toBeInTheDocument()
  })

  it('should support defaultChecked prop', async () => {
    const { container, getByRole } = renderWithNexUIProvider(
      <Switch defaultChecked />,
    )

    const root = container.firstElementChild
    const input = getByRole('switch')

    expect(root).toHaveClass(switchClasses.checked)
    expect(input).toBeChecked()

    await act(async () => {
      fireEvent.click(input)
    })

    expect(root).not.toHaveClass(switchClasses.checked)
    expect(input).not.toBeChecked()

    await act(async () => {
      fireEvent.click(input)
    })

    expect(root).toHaveClass(switchClasses.checked)
    expect(input).toBeChecked()
  })

  it('should switch between checked and unchecked states when clicked', async () => {
    const { container, getByRole } = renderWithNexUIProvider(<Switch />)

    const root = container.firstElementChild!
    const input = getByRole('switch')

    expect(root).not.toHaveClass(switchClasses.checked)
    expect(input).not.toBeChecked()

    await act(async () => {
      fireEvent.click(root)
    })

    expect(root).toHaveClass(switchClasses.checked)
    expect(input).toBeChecked()

    await act(async () => {
      fireEvent.click(root)
    })

    expect(root).not.toHaveClass(switchClasses.checked)
    expect(input).not.toBeChecked()
  })

  it('should be controlled by checked prop', async () => {
    function ControlledSwitch() {
      const [checked, setChecked] = useState<boolean>(false)

      return (
        <Switch
          checked={checked}
          onCheckedChange={(newChecked) => {
            setChecked(newChecked)
          }}
        />
      )
    }

    const { getByRole, container } = renderWithNexUIProvider(
      <ControlledSwitch />,
    )

    const input = getByRole('switch')
    const root = container.firstElementChild

    expect(input).not.toBeChecked()
    expect(root).not.toHaveClass(switchClasses.checked)

    await act(async () => {
      fireEvent.click(input)
    })

    expect(input).toBeChecked()
    expect(root).toHaveClass(switchClasses.checked)

    await act(async () => {
      fireEvent.click(input)
    })

    expect(input).not.toBeChecked()
    expect(root).not.toHaveClass(switchClasses.checked)
  })

  it('should call onCheckedChange when checked state changes', async () => {
    const onCheckedChange = jest.fn()
    const { getByRole } = renderWithNexUIProvider(
      <Switch onCheckedChange={onCheckedChange} />,
    )

    const input = getByRole('switch')

    await act(async () => {
      fireEvent.click(input)
    })

    expect(onCheckedChange).toHaveBeenCalledWith(true)

    await act(async () => {
      fireEvent.click(input)
    })

    expect(onCheckedChange).toHaveBeenCalledWith(false)
  })

  it('should disable switch when disabled prop is true', () => {
    const { getByRole, container } = renderWithNexUIProvider(
      <Switch disabled />,
    )

    const root = container.firstElementChild
    const input = getByRole('switch')

    expect(input).toBeDisabled()
    expect(root).toHaveClass(switchClasses.disabled)
    expect(root).toHaveStyle('pointer-events: none')
  })

  it('should render startIcon and endIcon', () => {
    const { queryByClassName } = renderWithNexUIProvider(
      <Switch startIcon={<span>Start</span>} endIcon={<span>End</span>} />,
    )

    const startIcon = queryByClassName(switchClasses['start-icon'])
    const endIcon = queryByClassName(switchClasses['end-icon'])

    expect(startIcon).toBeInTheDocument()
    expect(endIcon).toBeInTheDocument()
    expect(startIcon?.textContent).toBe('Start')
    expect(endIcon?.textContent).toBe('End')
  })

  it('should render custom thumbIcon', () => {
    const { getByTestId, queryByClassName, rerender } = renderWithNexUIProvider(
      <Switch thumbIcon={<span data-testid='thumb-icon'>Thumb Icon</span>} />,
    )

    const thumbIcon = getByTestId('thumb-icon')
    expect(thumbIcon).toBeInTheDocument()

    const wrapper = queryByClassName(switchClasses.thumb)
    expect(wrapper).toContainElement(thumbIcon)

    const mockFn = jest.fn(() => (
      <span data-testid='thumb-icon'>Thumb Icon</span>
    ))

    rerender(<Switch thumbIcon={mockFn} />)
    const newThumbIcon = getByTestId('thumb-icon')
    expect(newThumbIcon).toBeInTheDocument()
    expect(wrapper).toContainElement(newThumbIcon)
    expect(mockFn).toHaveBeenCalledWith({
      checked: false,
      disabled: false,
      size: 'md',
      color: 'blue',
      defaultChecked: false,
      thumbIcon: mockFn,
      as: 'input',
      type: 'checkbox',
      role: 'switch',
    })
  })

  it('should have data-focus-visible attribute when keyboard focused', async () => {
    const { getByRole, user } = renderWithNexUIProvider(
      <Switch>Checkbox</Switch>,
    )

    const switchElement = getByRole('switch')

    expect(switchElement).not.toHaveAttribute('data-focus-visible')

    await user.tab()
    expect(document.activeElement).toBe(switchElement)
    expect(switchElement).toHaveAttribute('data-focus-visible', 'true')
  })

  describe('Accessibility', () => {
    it('should have type="checkbox" by default', () => {
      const { getByRole } = renderWithNexUIProvider(<Switch />)
      const input = getByRole('switch')
      expect(input).toHaveAttribute('type', 'checkbox')
    })

    it('should have role="switch" by default', () => {
      const { queryByClassName } = renderWithNexUIProvider(<Switch />)
      const input = queryByClassName(switchClasses.input)
      expect(input).toHaveRole('switch')
    })

    it('should have tabIndex=0 by default', () => {
      const { getByRole } = renderWithNexUIProvider(<Switch />)
      const input = getByRole('switch')
      expect(input).toHaveAttribute('tabIndex', '0')
    })

    it('should apply checked attribute when checked', () => {
      const { getByRole } = renderWithNexUIProvider(<Switch checked />)
      const input = getByRole('switch')
      expect(input).toHaveAttribute('checked', '')
      expect(input).not.toHaveAttribute('aria-checked', 'true')
    })

    it('should apply disabled attribute when disabled', async () => {
      const { getByRole } = await renderWithNexUIProvider(<Switch disabled />)
      const switchElement = getByRole('switch')

      expect(switchElement).toBeDisabled()
      expect(switchElement).not.toHaveAttribute('aria-disabled')
    })

    it('should apply aria-label when children is a string', () => {
      const { getByRole } = renderWithNexUIProvider(<Switch>Switch</Switch>)
      const input = getByRole('switch')
      expect(input).toHaveAttribute('aria-label', 'Switch')
    })

    it('should apply aria-labelledby when aria-labelledby prop is provided', () => {
      const { getByRole } = renderWithNexUIProvider(
        <Switch aria-labelledby='label-id'>
          <span id='label-id'>Switch</span>
        </Switch>,
      )
      const input = getByRole('switch')
      expect(input).toHaveAttribute('aria-labelledby', 'label-id')
    })

    it('should apply aria-labelledby="label-id" when children is a string', () => {
      const { getByRole, queryByClassName } = renderWithNexUIProvider(
        <Switch>Switch</Switch>,
      )
      const input = getByRole('switch')
      const label = queryByClassName(switchClasses.label)

      expect(input).toHaveAttribute('aria-labelledby', label!.id)
    })

    it('should apply aria-label when aria-label prop is provided', () => {
      const { getByRole } = renderWithNexUIProvider(
        <Switch aria-label='Custom Switch'>Switch</Switch>,
      )
      const input = getByRole('switch')
      expect(input).toHaveAttribute('aria-label', 'Custom Switch')
    })

    it('should apply aria-checked="true" to non-input elements when checked', () => {
      const { getByRole } = renderWithNexUIProvider(<Switch checked as='div' />)
      const input = getByRole('switch')

      expect(input).toHaveAttribute('aria-checked', 'true')
      expect(input).not.toHaveAttribute('checked')
    })

    it('should apply aria-checked="false" to non-input elements when unchecked', () => {
      const { getByRole } = renderWithNexUIProvider(<Switch as='div' />)
      const input = getByRole('switch')

      expect(input).toHaveAttribute('aria-checked', 'false')
      expect(input).not.toHaveAttribute('checked')
    })

    it('should apply aria-disabled="true" to non-input elements when disabled', () => {
      const { getByRole } = renderWithNexUIProvider(
        <Switch disabled as='div' />,
      )
      const input = getByRole('switch')

      expect(input).toHaveAttribute('aria-disabled', 'true')
      expect(input).not.toBeDisabled()
    })

    it('should check non-input elements when clicked', () => {
      const { getByRole } = renderWithNexUIProvider(<Switch as='div' />)
      const input = getByRole('switch')

      expect(input).toHaveAttribute('aria-checked', 'false')

      fireEvent.click(input)

      expect(input).toHaveAttribute('aria-checked', 'true')
    })

    it('should activate non-input elements when space is pressed', async () => {
      const onChange = jest.fn()
      const { user, getByRole } = renderWithNexUIProvider(
        <Switch as='span' onCheckedChange={onChange}>
          Focusable Span
        </Switch>,
      )

      const span = getByRole('switch')
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
