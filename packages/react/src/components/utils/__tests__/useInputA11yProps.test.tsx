import { renderHook } from '@testing-library/react'
import { useInputA11yProps } from '../useInputA11yProps'

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

describe('useInputA11yProps', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should return default props', () => {
    const { result } = renderHook(() => useInputA11yProps({}))

    const props = result.current.getInputA11yProps()

    expect(props).toMatchObject({
      tabIndex: 0,
      type: 'text',
      'aria-invalid': undefined,
    })
  })

  it('should return focusVisible', () => {
    const { result } = renderHook(() => useInputA11yProps({}))

    expect(result.current.focusVisible).toBe(true)
  })

  it('should handle disabled state correctly', () => {
    const { result } = renderHook(() => useInputA11yProps({ disabled: true }))

    const props = result.current.getInputA11yProps()

    expect(props.disabled).toBe(true)
    expect(props.tabIndex).toBe(-1)
  })

  it('should handle invalid state correctly', () => {
    const { result } = renderHook(() => useInputA11yProps({ invalid: true }))

    const props = result.current.getInputA11yProps()

    expect(props['aria-invalid']).toBe(true)
  })

  it('should correctly handle the attributes of input element', () => {
    const onCheckedChange = jest.fn()

    const { result } = renderHook(() =>
      useInputA11yProps({
        as: 'input',
        type: 'checkbox',
        checked: false,
        readOnly: true,
        required: true,
        value: 'value',
        name: 'name',
        onCheckedChange,
      }),
    )

    const props = result.current.getInputA11yProps()

    expect(props.type).toBe('checkbox')
    expect(props.checked).toBe(false)
    expect(props.readOnly).toBe(true)
    expect(props.required).toBe(true)
    expect(props.value).toBe('value')
    expect(props.name).toBe('name')

    const target = {
      tagName: 'INPUT',
      checked: true,
      type: 'checkbox',
      getAttribute: () => 'checkbox',
    }
    const mockEvent: any = {
      currentTarget: target,
      target: target,
    }

    props.onChange?.(mockEvent)

    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('should correctly handle the aria attributes of non-input elements', () => {
    const { result } = renderHook(() =>
      useInputA11yProps({
        disabled: true,
        as: 'div',
        checked: true,
        required: true,
        readOnly: true,
        value: 'value',
        name: 'name',
        type: 'checkbox',
        invalid: true,
      }),
    )

    const props = result.current.getInputA11yProps()

    expect(props['aria-disabled']).toBe(true)
    expect(props['aria-checked']).toBe(true)
    expect(props['aria-required']).toBe(true)
    expect(props['aria-readonly']).toBe(true)
    expect(props['aria-invalid']).toBe(true)
    expect(props.tabIndex).toBe(-1)

    expect(props.value).toBe(undefined)
    expect(props.name).toBe(undefined)
    expect(props.type).toBe(undefined)
    expect(props.disabled).toBe(undefined)
    expect(props.required).toBe(undefined)
    expect(props.readOnly).toBe(undefined)
    expect(props.checked).toBe(undefined)
  })

  it('should correctly handle non-input elements with aria attributes', () => {
    const { result } = renderHook(() =>
      useInputA11yProps({
        as: 'div',
        'aria-disabled': true,
        'aria-checked': true,
        'aria-required': true,
        'aria-readonly': true,
        disabled: false,
        checked: false,
        required: false,
        readOnly: false,
      }),
    )

    const props = result.current.getInputA11yProps()

    expect(props['aria-checked']).toBe(true)
    expect(props['aria-required']).toBe(true)
    expect(props['aria-readonly']).toBe(true)
    expect(props['aria-disabled']).toBe(true)

    expect(props.disabled).toBe(undefined)
    expect(props.required).toBe(undefined)
    expect(props.readOnly).toBe(undefined)
    expect(props.checked).toBe(undefined)
  })

  it('should call onCheckedChange on click for non-input checkable elements', () => {
    const onCheckedChange = jest.fn()

    const { result } = renderHook(() =>
      useInputA11yProps({
        as: 'div',
        checked: false,
        onCheckedChange,
      }),
    )

    const props = result.current.getInputA11yProps()

    const target = {
      tagName: 'DIV',
      getAttribute: () => 'checkbox',
    }
    const mockEvent: any = {
      currentTarget: target,
      target,
    }

    props.onClick?.(mockEvent)

    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('should call onCheckedChange on keyup for non-input checkable elements', () => {
    const onCheckedChange = jest.fn()
    const { result } = renderHook(() =>
      useInputA11yProps({
        as: 'div',
        checked: false,
        onCheckedChange,
      }),
    )

    const props = result.current.getInputA11yProps()

    const target = {
      tagName: 'DIV',
      getAttribute: () => 'checkbox',
    }
    const mockEvent: any = {
      key: ' ',
      currentTarget: target,
      target: target,
    }

    props.onKeyUp?.(mockEvent)

    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('should not call onCheckedChange when disabled', () => {
    const onCheckedChange = jest.fn()
    const { result, rerender } = renderHook(() =>
      useInputA11yProps({
        as: 'div',
        checked: false,
        disabled: true,
        onCheckedChange,
      }),
    )
    const props = result.current.getInputA11yProps()

    const target = {
      tagName: 'DIV',
      getAttribute: () => 'checkbox',
    }
    const mockEvent: any = {
      currentTarget: target,
      target: target,
    }

    props.onKeyUp?.({
      ...mockEvent,
      key: ' ',
    })

    expect(onCheckedChange).not.toHaveBeenCalled()

    props.onClick?.(mockEvent)

    expect(onCheckedChange).not.toHaveBeenCalled()

    rerender(() =>
      useInputA11yProps({
        as: 'input',
        type: 'checkbox',
        checked: false,
        disabled: true,
        onCheckedChange,
      }),
    )

    props.onChange?.({
      currentTarget: {
        tagName: 'INPUT',
        checked: true,
        getAttribute: () => 'checkbox',
      },
    } as any)

    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('should not call onCheckedChange when uncheckable elements', () => {
    const onCheckedChange = jest.fn()
    const { result } = renderHook(() =>
      useInputA11yProps({
        as: 'div',
        checked: false,
        onCheckedChange,
      }),
    )
    const props = result.current.getInputA11yProps()

    const target = {
      tagName: 'DIV',
      getAttribute: () => '',
    }
    const mockEvent: any = {
      currentTarget: target,
      target: target,
    }

    props.onKeyUp?.({
      ...mockEvent,
      key: ' ',
    })

    expect(onCheckedChange).not.toHaveBeenCalled()

    props.onClick?.(mockEvent)

    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('should correctly handle radio events', () => {
    const onCheckedChange = jest.fn()

    const { result } = renderHook(() =>
      useInputA11yProps({
        as: 'div',
        checked: true,
        onCheckedChange,
      }),
    )
    const props = result.current.getInputA11yProps()

    const target = {
      tagName: 'DIV',
      getAttribute: () => 'radio',
    }
    const mockEvent: any = {
      currentTarget: target,
      target,
    }

    props.onClick?.(mockEvent)

    expect(onCheckedChange).toHaveBeenCalledTimes(1)

    props.onKeyUp?.({
      ...mockEvent,
      key: ' ',
    })

    expect(onCheckedChange).toHaveBeenCalledTimes(2)
  })

  it('should handle as for function components', () => {
    const { result } = renderHook(() =>
      useInputA11yProps({
        as: () => <div />,
      }),
    )

    const props = result.current.getInputA11yProps()

    expect(props).toEqual({})
  })
})
