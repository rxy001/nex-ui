import { useState } from 'react'
import {
  testComponentStability,
  renderWithNexUIProvider,
  testRefForwarding,
} from '~/tests/shared'
import { fireEvent } from '@testing-library/react'
import { InputBase } from '../index'

jest.mock('@nex-ui/hooks', () => {
  const originalModule = jest.requireActual('@nex-ui/hooks')

  return {
    __esModule: true,
    ...originalModule,
    useFocusRing: () => ({
      focusVisible: true,
    }),
  }
})

describe('InputBase', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })
  testComponentStability(<InputBase />)

  testRefForwarding(<InputBase />)

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<InputBase />)

    const root = container.firstElementChild

    expect(root).toMatchSnapshot()
  })

  it('should have aria-invalid=true attribute when invalid', () => {
    const { getByRole } = renderWithNexUIProvider(<InputBase invalid />)
    expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('should have tabIndex=-1 when disabled', () => {
    const { getByRole } = renderWithNexUIProvider(<InputBase disabled />)
    expect(getByRole('textbox')).toHaveAttribute('tabIndex', '-1')
  })

  it('should have value, disabled, placeholder, type, checked, required, readOnly and name props for input element', () => {
    const { getByRole } = renderWithNexUIProvider(
      <InputBase
        disabled
        required
        readOnly
        checked
        value='test'
        placeholder='Enter text'
        type='text'
        name='test-input'
      />,
    )

    const textbox = getByRole('textbox')

    expect(textbox).toHaveAttribute('value', 'test')
    expect(textbox).toHaveAttribute('placeholder', 'Enter text')
    expect(textbox).toHaveAttribute('type', 'text')
    expect(textbox).toHaveAttribute('name', 'test-input')
    expect(textbox).toHaveAttribute('readonly')
    expect(textbox).toHaveAttribute('required')
    expect(textbox).toHaveAttribute('disabled')
    expect(textbox).toHaveAttribute('checked')
  })

  it('should have aria-* attributes for non-input element', () => {
    const { getByRole } = renderWithNexUIProvider(
      <InputBase as='div' type='checkbox' disabled required readOnly checked />,
    )

    const checkbox = getByRole('checkbox')

    expect(checkbox).toHaveAttribute('aria-disabled', 'true')
    expect(checkbox).toHaveAttribute('aria-required', 'true')
    expect(checkbox).toHaveAttribute('aria-readonly', 'true')
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('should correctly handle aria-* attributes of non-input element', () => {
    const { getByRole } = renderWithNexUIProvider(
      <InputBase
        as='div'
        role='checkbox'
        aria-disabled='true'
        disabled={false}
        aria-checked='true'
        checked={false}
        aria-required='true'
        required={false}
        aria-readonly='true'
        readOnly={false}
      />,
    )

    const checkbox = getByRole('checkbox')

    expect(checkbox).toHaveAttribute('aria-disabled', 'true')
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
    expect(checkbox).toHaveAttribute('aria-required', 'true')
    expect(checkbox).toHaveAttribute('aria-readonly', 'true')
  })

  it('should have correct role for elements', () => {
    const { container, rerender } = renderWithNexUIProvider(
      <InputBase as='div' type='checkbox' />,
    )

    expect(container.firstElementChild).toHaveAttribute('role', 'checkbox')

    rerender(<InputBase as='div' type='radio' />)
    expect(container.firstElementChild).toHaveAttribute('role', 'radio')

    rerender(<InputBase as='div' type='text' />)
    expect(container.firstElementChild).toHaveAttribute('role', 'textbox')

    rerender(<InputBase as='div' type='date' />)
    expect(container.firstElementChild).not.toHaveAttribute('role')
  })

  it('should have data-visible attribute when focused', () => {
    const { getByRole } = renderWithNexUIProvider(<InputBase />)
    expect(getByRole('textbox')).toHaveAttribute('data-focus-visible', 'true')
  })

  it('should call onCheckedChange on click for non-input checkable elements', () => {
    const onCheckedChange = jest.fn()

    const { getByRole, rerender } = renderWithNexUIProvider(
      <InputBase as='div' role='checkbox' onCheckedChange={onCheckedChange} />,
    )

    fireEvent.click(getByRole('checkbox'))

    expect(onCheckedChange).toHaveBeenCalledTimes(1)

    rerender(
      <InputBase as='div' role='switch' onCheckedChange={onCheckedChange} />,
    )
    fireEvent.click(getByRole('switch'))
    expect(onCheckedChange).toHaveBeenCalledTimes(2)

    rerender(
      <InputBase as='div' type='radio' onCheckedChange={onCheckedChange} />,
    )
    fireEvent.click(getByRole('radio'))
    expect(onCheckedChange).toHaveBeenCalledTimes(3)
  })

  it('should call onCheckedChange on keyup for non-input checkable elements', () => {
    const onCheckedChange = jest.fn()
    const { getByRole, rerender } = renderWithNexUIProvider(
      <InputBase as='div' role='checkbox' onCheckedChange={onCheckedChange} />,
    )

    fireEvent.keyUp(getByRole('checkbox'), { key: ' ' })

    expect(onCheckedChange).toHaveBeenCalledTimes(1)

    rerender(
      <InputBase as='div' role='switch' onCheckedChange={onCheckedChange} />,
    )
    fireEvent.keyUp(getByRole('switch'), { key: ' ' })
    expect(onCheckedChange).toHaveBeenCalledTimes(2)

    rerender(
      <InputBase as='div' type='radio' onCheckedChange={onCheckedChange} />,
    )
    fireEvent.keyUp(getByRole('radio'), { key: ' ' })
    expect(onCheckedChange).toHaveBeenCalledTimes(3)
  })

  it('should call onCheckedChange on change for input checkable elements', () => {
    const onCheckedChange = jest.fn()
    const { getByRole, rerender } = renderWithNexUIProvider(
      <InputBase as='input' type='radio' onCheckedChange={onCheckedChange} />,
    )
    fireEvent.click(getByRole('radio'))
    expect(onCheckedChange).toHaveBeenCalledTimes(1)

    rerender(
      <InputBase
        as='input'
        type='checkbox'
        onCheckedChange={onCheckedChange}
      />,
    )
    fireEvent.click(getByRole('checkbox'))
    expect(onCheckedChange).toHaveBeenCalledTimes(2)
  })

  it('should not call onCheckedChange when disabled', () => {
    const onCheckedChange = jest.fn()
    const { getByRole, rerender } = renderWithNexUIProvider(
      <InputBase
        as='div'
        role='checkbox'
        checked={false}
        disabled
        onCheckedChange={onCheckedChange}
      />,
    )

    let checkbox = getByRole('checkbox')

    fireEvent.keyUp(checkbox, { key: ' ' })

    expect(onCheckedChange).not.toHaveBeenCalled()

    fireEvent.click(checkbox)

    expect(onCheckedChange).not.toHaveBeenCalled()

    rerender(
      <InputBase
        type='checkbox'
        disabled
        onCheckedChange={onCheckedChange}
        checked={false}
      />,
    )

    checkbox = getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('should not call onCheckedChange when uncheckable elements', () => {
    const onCheckedChange = jest.fn()

    const { getByRole, rerender, container } = renderWithNexUIProvider(
      <InputBase
        as='div'
        role='textbox'
        checked={false}
        onCheckedChange={onCheckedChange}
      />,
    )

    const textbox = getByRole('textbox')

    fireEvent.keyUp(textbox, { key: ' ' })
    expect(onCheckedChange).not.toHaveBeenCalled()

    fireEvent.click(textbox)
    expect(onCheckedChange).not.toHaveBeenCalled()

    rerender(
      <InputBase as='div' type='text' onCheckedChange={onCheckedChange} />,
    )
    fireEvent.click(container.firstElementChild!)
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('should switch checked state for non-input element (uncontrolled)', () => {
    function Checkbox() {
      const [checked, setChecked] = useState(false)

      return (
        <>
          <InputBase
            as='div'
            defaultChecked={false}
            role='checkbox'
            onCheckedChange={setChecked}
          />
          <span data-testid='checkbox-value'>{`${checked}`}</span>
        </>
      )
    }

    const { getByRole, getByTestId } = renderWithNexUIProvider(<Checkbox />)

    const checkbox = getByRole('checkbox')
    const value = getByTestId('checkbox-value')

    expect(value.textContent).toBe('false')
    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(checkbox)
    expect(value.textContent).toBe('true')
    expect(checkbox).toHaveAttribute('aria-checked', 'true')

    fireEvent.click(checkbox)
    expect(value.textContent).toBe('false')
    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    fireEvent.keyUp(checkbox, { key: ' ' })
    expect(value.textContent).toBe('true')
    expect(checkbox).toHaveAttribute('aria-checked', 'true')

    fireEvent.keyUp(checkbox, { key: ' ' })
    expect(value.textContent).toBe('false')
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
  })

  it('should switch checked state for non-input element (controlled)', () => {
    function Checkbox() {
      const [checked, setChecked] = useState(false)

      return (
        <>
          <InputBase
            as='div'
            checked={checked}
            role='checkbox'
            onCheckedChange={setChecked}
          />
          <span data-testid='checkbox-value'>{`${checked}`}</span>
        </>
      )
    }

    const { getByRole, getByTestId } = renderWithNexUIProvider(<Checkbox />)

    const checkbox = getByRole('checkbox')
    const value = getByTestId('checkbox-value')

    expect(value.textContent).toBe('false')
    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(checkbox)
    expect(value.textContent).toBe('true')
    expect(checkbox).toHaveAttribute('aria-checked', 'true')

    fireEvent.click(checkbox)
    expect(value.textContent).toBe('false')
    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    fireEvent.keyUp(checkbox, { key: ' ' })
    expect(value.textContent).toBe('true')
    expect(checkbox).toHaveAttribute('aria-checked', 'true')

    fireEvent.keyUp(checkbox, { key: ' ' })
    expect(value.textContent).toBe('false')
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
  })

  it('should handle as for function components', () => {
    const { container } = renderWithNexUIProvider(
      <InputBase as={() => <div />} />,
    )

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })

  it('should correctly handle non-input radio events', () => {
    function Radio() {
      const [checked, setChecked] = useState(false)

      return (
        <>
          <InputBase
            as='div'
            role='radio'
            checked={checked}
            onCheckedChange={setChecked}
          />
          <span data-testid='radio-value'>{`${checked}`}</span>
        </>
      )
    }

    const { getByRole, getByTestId } = renderWithNexUIProvider(<Radio />)

    const radio = getByRole('radio')

    const value = getByTestId('radio-value')

    fireEvent.click(radio)

    expect(value.textContent).toBe('true')

    fireEvent.click(radio)

    expect(value.textContent).toBe('true')

    fireEvent.keyUp(radio, { key: ' ' })

    expect(value.textContent).toBe('true')
  })
})
