import { isFunction, isString } from '@nex-ui/utils'
import { useMemo } from 'react'
import { useEvent, useFocusRing } from '@nex-ui/hooks'
import type {
  InputHTMLAttributes,
  ElementType,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react'

export type UseInputA11yPropsArgs = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'disabled'
  | 'checked'
  | 'value'
  | 'required'
  | 'readOnly'
  | 'placeholder'
  | 'type'
  | 'autoFocus'
  | 'aria-disabled'
  | 'aria-checked'
  | 'aria-required'
  | 'aria-readonly'
  | 'tabIndex'
  | 'name'
> & {
  as?: ElementType
  invalid?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const useInputA11yProps = (props: UseInputA11yPropsArgs) => {
  const {
    disabled,
    invalid,
    checked,
    value,
    required,
    readOnly,
    placeholder,
    name,
    autoFocus,
    onCheckedChange,
    'aria-disabled': ariaDisabled,
    'aria-checked': ariaChecked,
    'aria-required': ariaRequired,
    'aria-readonly': ariaReadOnly,
    type = 'text',
    as = 'input',
    tabIndex = 0,
  } = props

  const { focusVisible, focusProps } = useFocusRing({
    autoFocus,
    input: as === 'input',
  })

  const isCheckableControl = useEvent((element: HTMLInputElement) => {
    const role = element.getAttribute('role')
    const type = element.getAttribute('type')

    if (role) {
      return ['switch', 'radio', 'checkbox'].includes(role)
    }

    if (type) {
      return ['radio', 'checkbox'].includes(type)
    }

    return false
  })

  const handleClick = useEvent((event: MouseEvent<HTMLInputElement>) => {
    if (disabled) {
      return
    }

    if (
      event.currentTarget.tagName !== 'INPUT' &&
      event.currentTarget === event.target &&
      isCheckableControl(event.currentTarget)
    ) {
      const role = event.currentTarget.getAttribute('role')
      onCheckedChange?.(role === 'radio' ? true : !checked)
    }
  })

  const handleKeyUp = useEvent((event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) {
      return
    }

    // Keyboard accessibility for non interactive elements
    if (
      focusVisible &&
      event.key === ' ' &&
      event.currentTarget.tagName !== 'INPUT' &&
      event.currentTarget === event.target &&
      isCheckableControl(event.currentTarget)
    ) {
      const role = event.currentTarget.getAttribute('role')
      onCheckedChange?.(role === 'radio' ? true : !checked)
    }
  })

  const handleChange = useEvent((event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return
    }

    if (
      event.currentTarget.tagName === 'INPUT' &&
      isCheckableControl(event.currentTarget)
    ) {
      onCheckedChange?.(event.currentTarget.checked)
    }
  })

  const resolvedProps = useMemo<InputHTMLAttributes<HTMLInputElement>>(() => {
    if (isFunction(as)) {
      return {}
    }

    let a11yProps: InputHTMLAttributes<HTMLInputElement> = {
      tabIndex: disabled ? -1 : tabIndex,
      'aria-invalid': invalid || undefined,
    }

    if (as === 'input') {
      a11yProps = {
        ...a11yProps,
        value,
        disabled,
        placeholder,
        type,
        checked,
        required,
        readOnly,
        name,
      }
    } else if (isString(as)) {
      a11yProps = {
        ...a11yProps,
        'aria-disabled': ariaDisabled ?? disabled,
        'aria-checked': ariaChecked ?? checked,
        'aria-required': ariaRequired ?? required,
        'aria-readonly': ariaReadOnly ?? readOnly,
      }
    }

    return {
      autoFocus,
      onKeyUp: handleKeyUp,
      onClick: handleClick,
      onChange: handleChange,
      ...a11yProps,
      ...focusProps,
    }
  }, [
    disabled,
    tabIndex,
    invalid,
    as,
    autoFocus,
    handleKeyUp,
    handleClick,
    handleChange,
    focusProps,
    value,
    placeholder,
    type,
    checked,
    required,
    readOnly,
    name,
    ariaDisabled,
    ariaChecked,
    ariaRequired,
    ariaReadOnly,
  ])

  return {
    focusVisible,
    getInputA11yProps: () => resolvedProps,
  }
}
