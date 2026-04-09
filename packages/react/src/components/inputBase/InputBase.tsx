'use client'

import { nex } from '@nex-ui/styled'
import { useMemo, useState } from 'react'
import { useFocusRing } from '@nex-ui/hooks'
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

const isCheckableControl = (element: HTMLInputElement) => {
  const role = element.getAttribute('role')
  const type = element.getAttribute('type')
  const { tagName } = element

  if (role) {
    return ['switch', 'radio', 'checkbox'].includes(role)
  }

  if (tagName === 'INPUT' && type) {
    return ['radio', 'checkbox'].includes(type)
  }

  return false
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
    outline: 'none',
    '&:is(:-webkit-autofill, :autofill)': {
      bg: 'transparent !important',
      transition: 'background-color 50000s ease-in-out 0s',
    },
  },
})

const style = recipe()

export function InputBase(props: InputBaseProps) {
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

  const toggleCheckableState = (element: HTMLInputElement) => {
    const role = element.getAttribute('role')
    const ariaChecked = element.getAttribute('aria-checked')
    const newChecked = role === 'radio' ? true : !(ariaChecked === 'true')

    onCheckedChange?.(newChecked)

    if (!controlled) {
      setInternalChecked(newChecked)
    }
  }

  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    const { currentTarget } = event
    if (
      currentTarget.tagName !== 'INPUT' &&
      currentTarget === event.target &&
      isCheckableControl(currentTarget)
    ) {
      toggleCheckableState(currentTarget)
    }

    onClick?.(event)
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    const { currentTarget } = event
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
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
  }

  const ariaProps = useMemo(() => {
    if (isFunction(as)) {
      return {}
    }

    let ariaProps: InputHTMLAttributes<HTMLInputElement> = {
      tabIndex: disabled ? -1 : tabIndex,
      'aria-invalid': props.invalid || undefined,
    }

    if (as !== 'input') {
      ariaProps = {
        ...ariaProps,
        role: getRole(type),
        'aria-disabled': disabled || undefined,
        'aria-checked': currentChecked,
        'aria-required': props.required,
        'aria-readonly': props.readOnly,
        // @ts-ignore
        'data-checked': currentChecked,
        // @ts-ignore
        'aria-disabled': disabled || undefined,
      }
    }

    return ariaProps
  }, [
    as,
    disabled,
    tabIndex,
    type,
    props.invalid,
    props.required,
    props.readOnly,
    currentChecked,
  ])

  const [InputRoot, getInputRootProps] = useSlot({
    style,
    component: nex.input,
    ariaProps,
    externalForwardedProps: remainingProps,
    additionalProps: {
      as,
      type,
      disabled,
      autoFocus,
      checked: currentChecked,
      onKeyUp: handleKeyUp,
      onClick: handleClick,
      onChange: handleChange,
      ...focusProps,
    },
    dataAttrs: {
      focusVisible: focusVisible || undefined,
    },
  })

  return <InputRoot {...getInputRootProps()} />
}

InputBase.displayName = 'InputBase'
