'use client'

import { useId, useRef } from 'react'
import { nex } from '@nex-ui/styled'
import { isString, mergeRefs } from '@nex-ui/utils'
import { useControlledState, useEvent } from '@nex-ui/hooks'
import { CloseCircleFilled } from '@nex-ui/icons'
import { useNexUI } from '../provider'
import { inputRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  useSlotProps,
  useStyles,
} from '../utils'
import { Button } from '../button'
import type { ElementType, ChangeEvent, MouseEvent } from 'react'
import type { InputOwnerState, InputProps } from './types'

const useSlotClasses = (ownerState: InputOwnerState) => {
  const { prefix } = useNexUI()

  const inputRoot = `${prefix}-input`

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
    clearBtn: ['clear-btn'],
    prefix: ['prefix'],
    suffix: ['suffix'],
    label: ['label'],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(inputRoot),
    classes,
  )

  return composedClasses
}

const useSlotAriaProps = (ownerState: InputOwnerState) => {
  const { tabIndex, disabled, invaild, label } = ownerState
  const labelString = isString(label)
  const id = useId()
  const inputId = `input-${id}`
  const labelId = `label-${id}`

  const inputProps = {
    tabIndex: disabled ? -1 : tabIndex,
    'aria-invalid': invaild,
    id: labelString ? inputId : undefined,
    'aria-labelledby': labelString ? labelId : undefined,
    'aria-label': labelString ? label : undefined,
  }

  const labelProps = {
    id: labelString ? labelId : undefined,
    htmlFor: labelString ? inputId : undefined,
  }

  const clearBtnProps = {
    'aria-label': 'Clear input',
    tabIndex: -1,
  }

  return {
    input: inputProps,
    label: labelProps,
    clearBtn: clearBtnProps,
  }
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
    ref,
    label,
    className,
    prefix,
    suffix,
    onClear,
    slotProps,
    onValueChange,
    placeholder,
    tabIndex = 0,
    as = 'input',
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
  const mergedRefs = mergeRefs<HTMLInputElement>(ref, inputRef)
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
    as,
    tabIndex,
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
  }

  const styles = useStyles({
    ownerState,
    name: 'Input',
    recipe: inputRecipe,
  })

  const classes = useSlotClasses(ownerState)

  const slotAriaProps = useSlotAriaProps(ownerState)

  const onClearValue = useEvent(() => {
    setValue('')
    onClear?.()
    inputRef.current?.focus()
  })

  const handleChange = useEvent((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  })

  const rootProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.root,
    externalForwardedProps: {
      className,
      sx,
    },
    sx: styles.root,
    classNames: classes.root,
    additionalProps: {
      onClick: (e: MouseEvent<HTMLDivElement>) => {
        if (inputRef.current && e.target === e.currentTarget) {
          inputRef.current.focus()
        }
      },
    },
  })

  const labelProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.label,
    sx: styles.label,
    classNames: classes.label,
    additionalProps: slotAriaProps.label,
  })

  const inputProps = useSlotProps({
    ownerState,
    externalForwardedProps: remainingProps,
    sx: styles.input,
    classNames: classes.input,
    additionalProps: {
      as,
      type,
      value,
      disabled,
      placeholder,
      ref: mergedRefs,
      onChange: handleChange,
      ...slotAriaProps.input,
    },
  })

  const clearBtnProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.clearBtn,
    sx: styles.clearBtn,
    classNames: classes.clearBtn,
    additionalProps: {
      onClick: onClearValue,
      iconOnly: true,
      disableRipple: true,
      size: 'sm',
      color: variant === 'filled' ? color : 'gray',
      variant: 'text',
      disabled: disabled,
      sx: {
        visibility: value ? 'visible' : 'hidden',
      },
      ...slotAriaProps.clearBtn,
    },
  })

  const prefixProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.prefix,
    sx: styles.prefix,
    classNames: classes.prefix,
  })

  const suffixProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.suffix,
    sx: styles.suffix,
    classNames: classes.suffix,
  })

  return (
    <nex.div {...rootProps}>
      {prefix && <nex.span {...prefixProps}>{prefix}</nex.span>}
      {label && <nex.label {...labelProps}>{label}</nex.label>}
      <nex.input {...inputProps} />
      {clearable && (
        <Button {...clearBtnProps}>
          <CloseCircleFilled />
        </Button>
      )}
      {suffix && <nex.span {...suffixProps}>{suffix}</nex.span>}
    </nex.div>
  )
}

Input.displayName = 'Input'
