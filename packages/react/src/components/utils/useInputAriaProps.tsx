import { isFunction } from '@nex-ui/utils'
import { useMemo } from 'react'
import { useEvent, useFocusRing } from '@nex-ui/hooks'
import type {
  InputHTMLAttributes,
  ElementType,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react'

export type UseAriaInputPropsArgs = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'disabled'
  | 'checked'
  | 'value'
  | 'required'
  | 'readOnly'
  | 'placeholder'
  | 'type'
  | 'role'
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

export const useInputAriaProps = (props: UseAriaInputPropsArgs) => {
  const {
    disabled,
    invalid,
    checked,
    value,
    required,
    readOnly,
    placeholder,
    role,
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

  const inputElementType = as === 'input'

  const { focusVisible, focusProps } = useFocusRing({
    autoFocus,
    input: inputElementType,
  })

  const checkableControl = useMemo(() => {
    if (inputElementType) {
      return ['radio', 'checkbox'].includes(type!)
    }

    return ['switch', 'radio', 'checkbox'].includes(role!)
  }, [inputElementType, type, role])

  const handleClick = useEvent((event: MouseEvent<HTMLInputElement>) => {
    if (
      event.currentTarget.tagName !== 'INPUT' &&
      event.currentTarget === event.target &&
      checkableControl
    ) {
      const target = event.currentTarget
      onCheckedChange?.(target.role === 'radio' ? true : !checked)
    }
  })

  const handleKeyUp = useEvent((event: KeyboardEvent<HTMLInputElement>) => {
    // Keyboard accessibility for non interactive elements
    if (
      focusVisible &&
      event.key === ' ' &&
      event.currentTarget.tagName !== 'INPUT' &&
      event.currentTarget === event.target &&
      checkableControl
    ) {
      const target = event.currentTarget
      onCheckedChange?.(target.role === 'radio' ? true : !checked)
    }
  })

  const handleChange = useEvent((event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.tagName === 'INPUT' && checkableControl) {
      onCheckedChange?.(event.currentTarget.checked)
    }
  })

  const resolvedProps = useMemo(() => {
    let ariaProps: InputHTMLAttributes<HTMLInputElement> = {
      role: as === 'input' && role === type ? undefined : role,
      tabIndex: disabled ? -1 : tabIndex,
      'aria-invalid': invalid || undefined,
    }

    if (as === 'input' || isFunction(as)) {
      ariaProps = {
        ...ariaProps,
        value,
        disabled,
        placeholder,
        type,
        checked,
        required,
        readOnly,
        name,
      }
    } else {
      ariaProps = {
        ...ariaProps,
        'aria-disabled': ariaDisabled ?? disabled,
        'aria-checked': ariaChecked ?? checked,
        'aria-required': ariaRequired ?? required,
        'aria-readonly': ariaReadOnly ?? readOnly,
      }
    }
    return {
      as,
      autoFocus,
      onKeyUp: handleKeyUp,
      onClick: handleClick,
      onChange: handleChange,
      ...ariaProps,
      ...focusProps,
    }
  }, [
    role,
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
    getInputAriaProps: () => resolvedProps,
  }
}
