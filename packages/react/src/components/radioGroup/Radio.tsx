'use client'

import { useControlledState, useEvent, useFocusRing } from '@nex-ui/hooks'
import { __DEV__, isFunction } from '@nex-ui/utils'
import { useId, useMemo, useRef } from 'react'
import { useNexUI } from '../provider'
import { useRadioGroup } from './RadioGroupContext'
import {
  useDefaultProps,
  useSlot,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { radioRecipe } from '../../theme/recipes'
import type {
  ChangeEvent,
  ElementType,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
} from 'react'
import type {
  RadioOwnerState,
  RadioProps,
  RadioGroupContextValue,
} from './types'

const useSlotClasses = (ownerState: RadioOwnerState) => {
  const { prefix } = useNexUI()

  const { classes, size, color, checked, disabled } = ownerState

  return useMemo(() => {
    const prefixClassName = `${prefix}-radio`

    const slots = {
      root: [
        'root',
        `size-${size}`,
        `color-${color}`,
        checked && 'checked',
        disabled && 'disabled',
      ],
      input: ['input'],
      dot: ['dot'],
      label: ['label'],
    }

    return composeClasses(slots, getUtilityClass(prefixClassName), classes)
  }, [checked, classes, color, prefix, size, disabled])
}

const useSlotAriaProps = (
  ownerState: RadioOwnerState,
  ctx: RadioGroupContextValue | undefined | null,
) => {
  const {
    disabled,
    name,
    value,
    checked,
    children,
    slotProps,
    role,
    type,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-checked': ariaChecked,
    'aria-disabled': ariaDisabled,
    as = 'input',
    tabIndex = 0,
  } = ownerState

  const labelId = useId()

  return useMemo(() => {
    const stringChildren = typeof children === 'string'
    const labelSlotProps = slotProps?.label || {}

    const label = {
      id: labelSlotProps.id ?? (stringChildren ? labelId : undefined),
    }

    let input: InputHTMLAttributes<HTMLInputElement> = {
      tabIndex: disabled || !(ctx?.isTabbable(value) ?? true) ? -1 : tabIndex,
      'aria-label': ariaLabel ?? (stringChildren ? children : undefined),
      'aria-labelledby': ariaLabelledBy ?? label.id,
    }

    if (as === 'input' || isFunction(as)) {
      input = {
        name,
        role,
        value,
        disabled,
        checked,
        type,
        ...input,
      }
    } else {
      input = {
        role: role ?? 'radio',
        'aria-checked': ariaChecked ?? checked,
        'aria-disabled': ariaDisabled ?? disabled,
        ...input,
      }
    }

    return {
      input,
      label,
    }
  }, [
    children,
    slotProps?.label,
    labelId,
    disabled,
    ctx,
    checked,
    tabIndex,
    ariaLabel,
    ariaLabelledBy,
    as,
    name,
    role,
    value,
    type,
    ariaChecked,
    ariaDisabled,
  ])
}

export const Radio = <InputComponent extends ElementType = 'input'>(
  inProps: RadioProps<InputComponent>,
) => {
  const props = useDefaultProps<RadioProps>({
    name: 'Radio',
    props: inProps,
  })

  const groupCtx = useRadioGroup()

  const inGroup = !!groupCtx

  const { primaryThemeColor } = useNexUI()

  const {
    children,
    value,
    onCheckedChange,
    sx,
    className,
    slotProps,
    checked: checkedProp,
    type = 'radio',
    disabled = groupCtx?.disabled,
    name = groupCtx?.name,
    size = groupCtx?.size ?? 'md',
    defaultChecked = false,
    color = groupCtx?.color ?? primaryThemeColor,
    ...remainingProps
  } = props

  if (__DEV__ && inGroup) {
    if ('checked' in props) {
      console.warn(
        '[Nex UI] Radio: The RadioGroup is being used, `checked` will be ignored. Use the `value` of the RadioGroup instead.',
      )
    }

    if ('defaultChecked' in props) {
      console.warn(
        '[Nex UI] Radio: The RadioGroup is being used, `defaultChecked` will be ignored. Use the `defaultValue` of the RadioGroup instead.',
      )
    }

    if (!('value' in props)) {
      console.error(
        '[Nex UI] Radio: The `value` prop is required when using Radio inside a RadioGroup',
      )
    }
  }

  const [rawChecked, setRawChecked] = useControlledState(
    checkedProp,
    defaultChecked,
    onCheckedChange,
  )

  const checked = inGroup ? groupCtx.isChecked(value) : rawChecked
  const { focusVisible, focusProps } = useFocusRing()

  // Use ref to avoid repeated adding in strict mode.
  const radioStateRef = useRef({
    value,
    disabled,
  })

  const ownerState: RadioOwnerState = {
    ...props,
    inGroup,
    disabled,
    type,
    name,
    color,
    size,
    checked,
    defaultChecked,
  }

  if (inGroup) {
    radioStateRef.current.value = value
    radioStateRef.current.disabled = disabled
    groupCtx.setGroupState(radioStateRef.current)
  }

  const styles = useStyles({
    name: 'Radio',
    recipe: radioRecipe,
    ownerState,
  })

  const slotClasses = useSlotClasses(ownerState)

  const slotAriaProps = useSlotAriaProps(ownerState, groupCtx)

  const handleChange = useEvent((event: ChangeEvent<HTMLInputElement>) => {
    if (inGroup && value !== undefined) {
      groupCtx.setValue(value)
      return
    }

    setRawChecked(event.target.checked)
  })

  const handleClick = useEvent((event: MouseEvent<HTMLInputElement>) => {
    if (
      event.currentTarget.tagName !== 'INPUT' &&
      event.currentTarget === event.target
    ) {
      if (inGroup && value !== undefined) {
        groupCtx.setValue(value)
      }

      if (!inGroup) {
        setRawChecked(!checked)
      }
    }
  })

  const handleKeyUp = useEvent((event: KeyboardEvent<HTMLInputElement>) => {
    if (
      focusVisible &&
      event.key === ' ' &&
      event.currentTarget.tagName !== 'INPUT' &&
      event.currentTarget === event.target
    ) {
      event.currentTarget.click()
    }
  })

  const [RadioRoot, getRadioRootProps] = useSlot({
    elementType: 'label',
    ownerState,
    style: styles.root,
    externalSlotProps: slotProps?.root,
    classNames: slotClasses.root,
    additionalProps: {
      sx,
      className,
    },
  })

  const [RadioInput, getRadioInputProps] = useSlot({
    ownerState,
    elementType: 'input',
    externalForwardedProps: remainingProps,
    style: styles.input,
    classNames: slotClasses.input,
    additionalProps: {
      onChange: handleChange,
      onClick: handleClick,
      onKeyUp: handleKeyUp,
      'data-focus-visible': focusVisible || undefined,
      ...focusProps,
    },
    a11y: slotAriaProps.input,
  })

  const [RadioLabel, getRadioLabelProps] = useSlot({
    elementType: 'span',
    ownerState,
    style: styles.label,
    externalSlotProps: slotProps?.label,
    classNames: slotClasses.label,
    a11y: slotAriaProps.label,
  })

  const [RadioDot, getRadioDotProps] = useSlot({
    elementType: 'span',
    ownerState,
    externalSlotProps: slotProps?.dot,
    style: styles.dot,
    classNames: slotClasses.dot,
  })

  return (
    <RadioRoot {...getRadioRootProps()}>
      <RadioInput {...getRadioInputProps()} />
      <RadioDot {...getRadioDotProps()} />
      {children && (
        <RadioLabel {...getRadioLabelProps()}>{children}</RadioLabel>
      )}
    </RadioRoot>
  )
}

Radio.displayName = 'Radio'
