import { useMemo, useState } from 'react'
import { useEvent, useFocusRing } from '@nex-ui/hooks'
import { isFunction } from '@nex-ui/utils'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import type {
  InputHTMLAttributes,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
  HTMLInputTypeAttribute,
} from 'react'
import type { InputBaseProps } from './types'

const getRole = (type?: HTMLInputTypeAttribute) => {
  switch (type) {
    case 'checkbox':
      return 'checkbox'
    case 'radio':
      return 'radio'
    case 'text':
      return 'textbox'
    default:
      return undefined
  }
}

const useAriaProps = (props: InputBaseProps) => {
  const {
    disabled,
    invalid,
    checked,
    required,
    readOnly,
    role,
    type,
    as,
    tabIndex,
    'aria-disabled': ariaDisabled,
    'aria-checked': ariaChecked,
    'aria-required': ariaRequired,
    'aria-readonly': ariaReadOnly,
  } = props

  return useMemo(() => {
    if (isFunction(as)) {
      return {}
    }

    let ariaProps: InputHTMLAttributes<HTMLInputElement> = {
      tabIndex: disabled ? -1 : tabIndex,
      'aria-invalid': invalid || undefined,
    }

    if (as === 'input') {
      ariaProps = {
        ...ariaProps,
        role,
      }
    } else {
      ariaProps = {
        ...ariaProps,
        role: role ?? getRole(type),
        'aria-disabled': ariaDisabled ?? disabled,
        'aria-checked': ariaChecked ?? checked,
        'aria-required': ariaRequired ?? required,
        'aria-readonly': ariaReadOnly ?? readOnly,
      }
    }

    return ariaProps
  }, [
    as,
    disabled,
    tabIndex,
    invalid,
    type,
    checked,
    required,
    readOnly,
    role,
    ariaDisabled,
    ariaChecked,
    ariaRequired,
    ariaReadOnly,
  ])
}

const isCheckableControl = (element: HTMLInputElement) => {
  const role = element.getAttribute('role')
  const type = element.getAttribute('type')
  const tagName = element.tagName

  if (role) {
    return ['switch', 'radio', 'checkbox'].includes(role)
  }

  if (tagName === 'INPUT' && type) {
    return ['radio', 'checkbox'].includes(type)
  }
}

/**
 * InputBase is a lower-level construct that is leveraged by the following components:
 *
 * - Switch
 * - Input
 * - Checkbox
 * - Radio
 */

const recipe = defineRecipe({
  base: {
    m: '0',
    p: '0',
    border: 'none',
    background: 'none',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    boxSizing: 'border-box',

    '&[type="search"]': {
      '::-webkit-search-decoration': {
        WebkitAppearance: 'none',
      },
      '::-webkit-search-cancel-button': {
        WebkitAppearance: 'none',
      },
    },

    '&:is(:-webkit-autofill, :autofill)': {
      bg: 'transparent !important',
      transition: 'background-color 50000s ease-in-out 0s',
    },
  },
})

const style = recipe()

export const InputBase = (props: InputBaseProps) => {
  const {
    defaultChecked,
    disabled,
    autoFocus,
    onCheckedChange,
    onClick,
    onKeyUp,
    onChange,
    checked: checkProp,
    type = 'text',
    as = 'input',
    tabIndex = 0,
    ...remainingProps
  } = props

  const controlled = 'checked' in props

  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? false,
  )

  const currentChecked = controlled ? checkProp : internalChecked

  const { focusVisible, focusProps } = useFocusRing({
    autoFocus,
    input: as === 'input',
  })

  const toggleCheckableState = useEvent((element: HTMLInputElement) => {
    const role = element.getAttribute('role')
    const ariaChecked = element.getAttribute('aria-checked')
    const newChecked = role === 'radio' ? true : !(ariaChecked === 'true')

    onCheckedChange?.(newChecked)

    if (!controlled) {
      setInternalChecked(newChecked)
    }
  })

  const handleClick = useEvent((event: MouseEvent<HTMLInputElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    const currentTarget = event.currentTarget
    if (
      currentTarget.tagName !== 'INPUT' &&
      currentTarget === event.target &&
      isCheckableControl(currentTarget)
    ) {
      toggleCheckableState(currentTarget)
    }

    onClick?.(event)
  })

  const handleKeyUp = useEvent((event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    const currentTarget = event.currentTarget
    // Keyboard accessibility for non interactive elements
    if (
      focusVisible &&
      event.key === ' ' &&
      currentTarget.tagName !== 'INPUT' &&
      currentTarget === event.target &&
      isCheckableControl(currentTarget)
    ) {
      toggleCheckableState(currentTarget)
    }

    onKeyUp?.(event)
  })

  const handleChange = useEvent((event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (
      event.currentTarget.tagName === 'INPUT' &&
      isCheckableControl(event.currentTarget)
    ) {
      onCheckedChange?.(event.currentTarget.checked)
    }

    onChange?.(event)
  })

  const ariaProps = useAriaProps({
    ...props,
    as,
    type,
    tabIndex,
    checked: currentChecked,
  })

  const [InputRoot, getInputRootProps] = useSlot({
    style,
    elementType: 'input',
    a11y: {
      ...ariaProps,
      onKeyUp: handleKeyUp,
      onClick: handleClick,
      onChange: handleChange,
    },
    externalForwardedProps: remainingProps,
    additionalProps: {
      as,
      type,
      disabled,
      autoFocus,
      checked: currentChecked,
      'data-focus-visible': focusVisible || undefined,
      ...focusProps,
    },
  })

  return <InputRoot {...getInputRootProps()} />
}

InputBase.displayName = 'InputBase'
