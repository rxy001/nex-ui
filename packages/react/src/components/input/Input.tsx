'use client'

import { useId, useMemo, useRef } from 'react'
import { isFunction, isString } from '@nex-ui/utils'
import { useControlledState, useEvent, useFocusRing } from '@nex-ui/hooks'
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
} from '../utils'
import type {
  ElementType,
  ChangeEvent,
  MouseEvent,
  InputHTMLAttributes,
} from 'react'
import type { InputOwnerState, InputProps } from './types'

const useSlotClasses = (ownerState: InputOwnerState) => {
  const { prefix } = useNexUI()

  const {
    variant,
    clearable,
    radius,
    size,
    color,
    disabled,
    fullWidth,
    invaild,
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
        invaild && 'invaild',
        clearable && 'clearable',
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
    clearable,
    color,
    disabled,
    fullWidth,
    invaild,
    labelPlacement,
    prefix,
    radius,
    size,
    variant,
  ])
}

const useSlotAriaProps = (ownerState: InputOwnerState) => {
  const {
    disabled,
    invaild,
    as,
    type,
    value,
    placeholder,
    slotProps,
    label: inputLabel,
    tabIndex = 0,
    id: idProp,
  } = ownerState

  const id = useId()
  const ariaLabel = ownerState['aria-label']

  return useMemo(() => {
    const labelProps = slotProps?.label ?? {}
    const clearButtonProps = slotProps?.clearButton ?? {}
    const stringLabel = isString(inputLabel)
    const inputId = idProp ?? (stringLabel ? `input-${id}` : undefined)
    const labelId =
      labelProps['id'] ?? (stringLabel ? `label-${id}` : undefined)

    let input: InputHTMLAttributes<HTMLInputElement> = {
      id: inputId,
      tabIndex: disabled ? -1 : tabIndex,
      'aria-invalid': invaild,
      'aria-labelledby': labelId,
      'aria-label': ariaLabel ?? (stringLabel ? inputLabel : undefined),
    }

    if (!as || as === 'input' || isFunction(as)) {
      input = {
        ...input,
        value,
        disabled,
        placeholder,
        type,
      }
    }

    const label = {
      id: labelId,
      htmlFor: inputId,
    }

    const clearButton = {
      'aria-label': clearButtonProps['aria-label'] ?? 'Clear input',
      tabIndex: clearButtonProps.tabIndex ?? -1,
    }

    return {
      input,
      label,
      clearButton,
    }
  }, [
    ariaLabel,
    as,
    disabled,
    id,
    idProp,
    inputLabel,
    invaild,
    placeholder,
    slotProps?.clearButton,
    slotProps?.label,
    tabIndex,
    type,
    value,
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
    autoFocus,
    defaultValue = '',
    value: valueProp,
    color = primaryThemeColor,
    type = 'text',
    disabled = false,
    variant = 'outlined',
    fullWidth = false,
    invaild = false,
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
    invaild,
    type,
    clearable,
    value,
    labelPlacement,
    autoFocus,
  }

  const { focusVisible, focusProps } = useFocusRing({
    autoFocus,
    input: true,
  })

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
    a11y: slotAriaProps.input,
    additionalProps: {
      ref: inputRef,
      autoFocus,
      onChange: handleChange,
      ...focusProps,
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
