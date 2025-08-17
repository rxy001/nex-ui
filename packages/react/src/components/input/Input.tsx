'use client'

import { useId, useMemo, useRef } from 'react'
import { isString } from '@nex-ui/utils'
import { useControlledState, useEvent } from '@nex-ui/hooks'
import { CloseCircleFilled } from '@nex-ui/icons'
import { useNexUI } from '../provider'
import { inputRecipe } from '../../theme/recipes'
import { ButtonBase } from '../buttonBase'
import {
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  useStyles,
  useSlot,
  useInputA11yProps,
} from '../utils'
import type { ElementType, ChangeEvent, MouseEvent } from 'react'
import type { InputOwnerState, InputProps } from './types'

const useSlotClasses = (ownerState: InputOwnerState) => {
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
      clearButton: ['clear-btn'],
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

const useSlotAriaProps = (ownerState: InputOwnerState) => {
  const {
    label,
    as,
    type,
    slotProps,
    role,
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
        role: !role && as !== 'input' && type === 'text' ? 'textbox' : role,
        'aria-labelledby': ariaLabelledBy ?? labelId,
        'aria-label': ariaLabel ?? (stringLabel ? label : undefined),
      },
      label: {
        id: labelId,
        htmlFor: inputId,
      },
      clearButton: {
        'aria-label': clearButtonProps['aria-label'] ?? 'Clear input',
      },
    }
  }, [
    ariaLabel,
    ariaLabelledBy,
    as,
    id,
    idProp,
    label,
    role,
    slotProps?.clearButton,
    slotProps?.label,
    type,
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

  const ownerState: InputOwnerState = {
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
  const { getInputA11yProps, focusVisible } = useInputA11yProps(ownerState)

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
    }
  })

  const [InputRoot, getInputRootProps] = useSlot({
    ownerState,
    elementType: 'div',
    externalSlotProps: slotProps?.root,
    style: styles.root,
    classNames: classes.root,
    additionalProps: {
      sx,
      className,
      onClick: handleFocusInput,
      ['data-focus-visible']: focusVisible || undefined,
    },
  })

  const [InputLabel, getInputLabelProps] = useSlot({
    ownerState,
    elementType: 'label',
    externalSlotProps: slotProps?.label,
    style: styles.label,
    classNames: classes.label,
    a11y: slotAriaProps.label,
  })

  const [InputControl, getInputControlProps] = useSlot({
    ownerState,
    elementType: 'input',
    externalForwardedProps: remainingProps,
    style: styles.input,
    classNames: classes.input,
    a11y: {
      ...getInputA11yProps(),
      ...slotAriaProps.input,
    },
    additionalProps: {
      as,
      ref: inputRef,
      onChange: handleChange,
    },
  })

  const [InputClearButton, getClearButtonProps] = useSlot({
    ownerState,
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
    ownerState,
    elementType: 'span',
    externalSlotProps: slotProps?.prefix,
    style: styles.prefix,
    classNames: classes.prefix,
  })

  const [InputSuffix, getInputSuffixProps] = useSlot({
    ownerState,
    elementType: 'span',
    externalSlotProps: slotProps?.suffix,
    style: styles.suffix,
    classNames: classes.suffix,
  })

  return (
    <InputRoot {...getInputRootProps()}>
      {prefix && <InputPrefix {...getInputPrefixProps()}>{prefix}</InputPrefix>}
      {label && <InputLabel {...getInputLabelProps()}>{label}</InputLabel>}
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
