'use client'

import { useControlledState, useEvent } from '@nex-ui/hooks'
import { __DEV__ } from '@nex-ui/utils'
import { useId, useMemo, useRef } from 'react'
import { useNexUI } from '../provider'
import { InputBase } from '../inputBase'
import { useRadioGroup } from './RadioGroupContext'
import { useDefaultProps, useSlot, useStyles, useSlotClasses } from '../utils'
import { radioRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { RadioOwnerState, RadioProps } from './types'

const slots = ['root', 'input', 'dot', 'label']

const useSlotAriaProps = (ownerState: RadioOwnerState) => {
  const {
    children,
    slotProps,
    role,
    as,
    type,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  } = ownerState

  const id = useId()

  return useMemo(() => {
    const hasLabel = !!children
    const stringChildren = typeof children === 'string'
    const labelSlotProps = slotProps?.label || {}
    const labelId = labelSlotProps.id ?? (hasLabel ? id : undefined)

    return {
      input: {
        'aria-label': ariaLabel ?? (stringChildren ? children : undefined),
        'aria-labelledby': ariaLabelledBy ?? labelId,
        role: !role && as !== 'input' && type === 'radio' ? 'radio' : role,
      },
      label: {
        id: labelId,
      },
    }
  }, [
    children,
    slotProps?.label,
    id,
    ariaLabel,
    ariaLabelledBy,
    role,
    as,
    type,
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
    classNames,
    slotProps,
    checked: checkedProp,
    tabIndex: tabIndexProp = 0,
    as = 'input',
    type = 'radio',
    disabled = groupCtx?.disabled ?? false,
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

  // Use ref to avoid repeated adding in strict mode.
  const radioStateRef = useRef({
    value,
    disabled,
  })

  if (inGroup) {
    radioStateRef.current.value = value
    radioStateRef.current.disabled = disabled
    groupCtx.setGroupState(radioStateRef.current)
  }

  const tabIndex = (groupCtx?.isTabbable(value) ?? true) ? tabIndexProp : -1

  const ownerState: RadioOwnerState = {
    ...props,
    tabIndex,
    as,
    inGroup,
    disabled,
    type,
    name,
    color,
    size,
    checked,
    defaultChecked,
  }

  const styles = useStyles({
    name: 'Radio',
    recipe: radioRecipe,
    ownerState,
  })

  const slotClasses = useSlotClasses({
    name: 'Radio',
    slots,
    classNames,
  })

  const slotAriaProps = useSlotAriaProps(ownerState)

  const handleChange = useEvent((newChecked: boolean) => {
    if (inGroup && value !== undefined) {
      groupCtx.setValue(value)
    }

    if (!inGroup) {
      setRawChecked(newChecked)
    }
  })

  const [RadioRoot, getRadioRootProps] = useSlot({
    elementType: 'label',
    style: styles.root,
    externalSlotProps: slotProps?.root,
    classNames: slotClasses.root,
    additionalProps: {
      sx,
      className,
    },
    dataAttrs: {
      color,
      size,
      checked,
      disabled,
    },
  })

  const [RadioInput, getRadioInputProps] = useSlot({
    elementType: InputBase,
    externalForwardedProps: remainingProps,
    style: styles.input,
    classNames: slotClasses.input,
    a11y: slotAriaProps.input,
    shouldForwardComponent: false,
    additionalProps: {
      tabIndex,
      as,
      disabled,
      type,
      name,
      checked,
      value,
      onCheckedChange: handleChange,
    },
  })

  const [RadioLabel, getRadioLabelProps] = useSlot({
    elementType: 'span',
    style: styles.label,
    externalSlotProps: slotProps?.label,
    classNames: slotClasses.label,
    a11y: slotAriaProps.label,
  })

  const [RadioDot, getRadioDotProps] = useSlot({
    elementType: 'span',
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
