'use client'

import { useControlledState, useEvent } from '@nex-ui/hooks'
import { __DEV__, isFunction } from '@nex-ui/utils'
import { useId, useMemo } from 'react'
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
import type { ChangeEvent, ElementType, InputHTMLAttributes } from 'react'
import type {
  RadioOwnerState,
  RadioProps,
  RadioGroupContextValue,
} from './types'

const useSlotClasses = (ownerState: RadioOwnerState) => {
  const { prefix } = useNexUI()

  const { classes, size, color, checked } = ownerState

  return useMemo(() => {
    const prefixClassName = `${prefix}-radio`

    const slots = {
      root: ['root', `size-${size}`, `color-${color}`, checked && 'checked'],
      input: ['input'],
      dot: ['dot'],
      label: ['label'],
    }

    return composeClasses(slots, getUtilityClass(prefixClassName), classes)
  }, [checked, classes, color, prefix, size])
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
      tabIndex:
        disabled || (!(ctx?.isNullValue() ?? true) && !checked) ? -1 : tabIndex,
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
    groupCtx.setGroupState({ value, disabled })
  }

  const styles = useStyles({
    name: 'Radio',
    recipe: radioRecipe,
    ownerState,
  })

  const slotClasses = useSlotClasses(ownerState)

  const slotAriaProps = useSlotAriaProps(ownerState, groupCtx)

  const handleChange = useEvent((event: ChangeEvent<HTMLInputElement>) => {
    if (inGroup && value) {
      groupCtx.setValue(value)
      return
    }

    setRawChecked(event.target.checked)
  })

  const [RadioRoot, getRadioRootProps] = useSlot({
    elementType: 'label',
    ownerState,
    style: styles.root,
    classNames: slotClasses.root,
  })

  const [RadioInput, getRadioInputProps] = useSlot({
    ownerState,
    elementType: 'input',
    externalForwardedProps: remainingProps,
    style: styles.input,
    classNames: slotClasses.input,
    additionalProps: {
      onChange: handleChange,
    },
    a11y: slotAriaProps.input,
  })

  const [RadioLabel, getRadioLabelProps] = useSlot({
    elementType: 'span',
    ownerState,
    style: styles.label,
    classNames: slotClasses.label,
    a11y: slotAriaProps.label,
  })

  const [RadioDot, getRadioDotProps] = useSlot({
    elementType: 'span',
    ownerState,
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
