'use client'

import { useId, useMemo, useRef } from 'react'
import { isString } from '@nex-ui/utils'
import { useControlledState, useEvent } from '@nex-ui/hooks'
import { CloseCircleFilled } from '@nex-ui/icons'
import { useNexUI } from '../provider'
import { inputRecipe } from '../../theme/recipes'
import { ButtonBase } from '../buttonBase'
import { InputBase } from '../inputBase'
import {
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  useStyles,
  useSlot,
} from '../utils'
import type { ElementType, ChangeEvent, MouseEvent } from 'react'
import type { InputProps } from './types'

const useSlotClasses = (ownerState: InputProps) => {
  const { prefix } = useNexUI()

  const {
    variant,
    radius,
    size,
    color,
    disabled,
    fullWidth,
    invalid,
    classes,
    labelPlacement,
  } = ownerState

  return useMemo(() => {
    const inputRoot = `${prefix}-input`

    const slots = {
      root: [
        'root',
        `variant-${variant}`,
        `radius-${radius}`,
        `size-${size}`,
        `color-${color}`,
        disabled && 'disabled',
        fullWidth && 'full-width',
        invalid && 'invalid',
        labelPlacement && `label-placement-${labelPlacement}`,
      ],
      input: ['input'],
      clearButton: ['clear-button'],
      prefix: ['prefix'],
      suffix: ['suffix'],
      label: ['label'],
    }

    return composeClasses(slots, getUtilityClass(inputRoot), classes)
  }, [
    classes,
    color,
    disabled,
    fullWidth,
    invalid,
    labelPlacement,
    prefix,
    radius,
    size,
    variant,
  ])
}

const useSlotAriaProps = (ownerState: InputProps) => {
  const {
    label,
    slotProps,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    id: idProp,
  } = ownerState

  const id = useId()

  return useMemo(() => {
    const hasLabel = !!label
    const stringLabel = isString(label)
    const labelProps = slotProps?.label ?? {}
    const clearButtonProps = slotProps?.clearButton ?? {}
    const inputId = idProp ?? (hasLabel ? `input-${id}` : undefined)
    const labelId = labelProps['id'] ?? (hasLabel ? `label-${id}` : undefined)

    return {
      input: {
        id: inputId,
        'aria-labelledby': ariaLabelledBy ?? labelId,
        'aria-label': ariaLabel ?? (stringLabel ? label : undefined),
      },
      label: {
        id: labelId,
        htmlFor: inputId,
      },
      clearButton: {
        'aria-label': clearButtonProps['aria-label'] ?? 'Clear input',
        tabIndex: -1,
      },
    }
  }, [
    ariaLabel,
    ariaLabelledBy,
    id,
    idProp,
    label,
    slotProps?.clearButton,
    slotProps?.label,
  ])
}

export const Input = <InputComponent extends ElementType = 'input'>(
  inProps: InputProps<InputComponent>,
) => {
  const { primaryThemeColor } = useNexUI()

  const props = useDefaultProps<InputProps>({
    name: 'Input',
    props: inProps,
  })

  const {
    sx,
    label,
    className,
    prefix,
    suffix,
    onClear,
    slotProps,
    onValueChange,
    placeholder,
    defaultValue = '',
    as = 'input',
    value: valueProp,
    color = primaryThemeColor,
    type = 'text',
    disabled = false,
    variant = 'outlined',
    fullWidth = false,
    invalid = false,
    size = 'md',
    radius = size,
    clearable = false,
    labelPlacement: labelPlacementProp = 'float-outside',
    ...remainingProps
  } = props

  const [value, setValue] = useControlledState(
    valueProp,
    defaultValue,
    onValueChange,
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const hasLabel = !!label
  const hasValue = !!value
  const hasPlaceholder = !!placeholder
  const hasPrefix = !!prefix

  let labelPlacement: InputProps['labelPlacement'] = labelPlacementProp
  const floatLabel =
    labelPlacement === 'float-outside' || labelPlacement === 'float-inside'
  const hasDefaultPlaceholder = [
    'date',
    'datetime-local',
    'time',
    'week',
    'month',
    'range',
  ].includes(type)

  if (!hasLabel) {
    labelPlacement = undefined
  } else if (
    floatLabel &&
    (hasPlaceholder || hasValue || hasDefaultPlaceholder || hasPrefix)
  ) {
    if (labelPlacementProp === 'float-outside') {
      labelPlacement = 'outside'
    } else if (labelPlacementProp === 'float-inside') {
      labelPlacement = 'inside'
    }
  }

  const ownerState: InputProps = {
    ...props,
    color,
    disabled,
    variant,
    fullWidth,
    size,
    radius,
    invalid,
    type,
    clearable,
    value,
    labelPlacement,
    as,
  }

  const styles = useStyles({
    ownerState,
    name: 'Input',
    recipe: inputRecipe,
  })

  const classes = useSlotClasses(ownerState)

  const slotAriaProps = useSlotAriaProps(ownerState)

  const handleClearValue = useEvent(() => {
    setValue('')
    onClear?.()
    inputRef.current?.focus()
  })

  const handleChange = useEvent((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  })

  const handleFocusInput = useEvent((e: MouseEvent<HTMLDivElement>) => {
    if (inputRef.current && e.target === e.currentTarget) {
      inputRef.current.focus()
      e.preventDefault()
    }
  })

  const [InputRoot, getInputRootProps] = useSlot({
    elementType: 'div',
    externalSlotProps: slotProps?.root,
    style: styles.root,
    classNames: classes.root,
    additionalProps: {
      sx,
      className,
      onMouseDown: handleFocusInput,
    },
  })

  const [InputLabel, getInputLabelProps] = useSlot({
    elementType: 'label',
    externalSlotProps: slotProps?.label,
    style: styles.label,
    classNames: classes.label,
    a11y: slotAriaProps.label,
  })

  const [InputControl, getInputControlProps] = useSlot({
    elementType: InputBase,
    externalForwardedProps: remainingProps,
    style: styles.input,
    classNames: classes.input,
    a11y: slotAriaProps.input,
    shouldForwardComponent: false,
    additionalProps: {
      as,
      disabled,
      invalid,
      type,
      value,
      ref: inputRef,
      onChange: handleChange,
    },
  })

  const [InputClearButton, getClearButtonProps] = useSlot({
    elementType: ButtonBase,
    style: styles.clearButton,
    externalSlotProps: slotProps?.clearButton,
    classNames: classes.clearButton,
    a11y: slotAriaProps.clearButton,
    shouldForwardComponent: false,
    additionalProps: {
      onClick: handleClearValue,
      disabled: disabled,
      sx: {
        visibility: value ? 'visible' : 'hidden',
      },
    },
  })

  const [InputPrefix, getInputPrefixProps] = useSlot({
    elementType: 'span',
    externalSlotProps: slotProps?.prefix,
    style: styles.prefix,
    classNames: classes.prefix,
  })

  const [InputSuffix, getInputSuffixProps] = useSlot({
    elementType: 'span',
    externalSlotProps: slotProps?.suffix,
    style: styles.suffix,
    classNames: classes.suffix,
  })

  return (
    <InputRoot {...getInputRootProps()}>
      {label && <InputLabel {...getInputLabelProps()}>{label}</InputLabel>}
      {prefix && <InputPrefix {...getInputPrefixProps()}>{prefix}</InputPrefix>}
      <InputControl {...getInputControlProps()} />
      {clearable && (
        <InputClearButton {...getClearButtonProps()}>
          <CloseCircleFilled />
        </InputClearButton>
      )}
      {suffix && <InputSuffix {...getInputSuffixProps()}>{suffix}</InputSuffix>}
    </InputRoot>
  )
}

Input.displayName = 'Input'
