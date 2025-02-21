'use client'

import { nex } from '@nex-ui/styled'
import { useState } from 'react'
import { CheckOutlined } from '@nex-ui/icons'
import { isFunction, __DEV__ } from '@nex-ui/utils'
import { useEvent } from '@nex-ui/hooks'
import type { Ref, ElementType, ChangeEvent } from 'react'
import { checkboxRecipe } from '../../theme/slotRecipes'
import { useNexContext } from '../provider'
import { useCheckboxGroupContext } from './CheckboxGroupContext'
import {
  forwardRef,
  useDefaultProps,
  useSlotStyles,
  composeClasses,
  getUtilityClass,
  useSlotProps,
  resolveSxProps,
} from '../utils'
import type { CheckboxOwnerState, CheckboxProps } from './types'

const useSlotClasses = (ownerState: CheckboxOwnerState) => {
  const { prefix } = useNexContext()

  const checkboxRoot = `${prefix}-checkbox`

  const { radius, size, color, disabled, checked, classes } = ownerState

  const slots = {
    root: [
      'root',
      `radius-${radius}`,
      `size-${size}`,
      `color-${color}`,
      disabled && 'disabled',
      checked && 'checked',
    ],
    input: ['input'],
    label: ['label'],
    icon: ['icon'],
    iconContainer: ['icon-container'],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(checkboxRoot),
    classes,
  )

  return composedClasses
}

export const Checkbox = forwardRef(
  <CheckboxComponent extends ElementType = 'input'>(
    inProps: CheckboxProps<CheckboxComponent>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const { primaryColor } = useNexContext()

    const props = useDefaultProps<CheckboxProps>({
      name: 'Checkbox',
      props: inProps,
    })

    const groupCtx = useCheckboxGroupContext()

    const inGroup = !!groupCtx

    if (__DEV__ && inGroup) {
      if (props.checked) {
        console.warn(
          '[Nex UI] Checkbox: The Checkbox.Group is being used, `checked` will be ignored. Use the `value` of the Checkbox.Group instead.',
        )
      }
      if (props.defaultChecked) {
        console.warn(
          '[Nex UI] Checkbox: The Checkbox.Group is being used, `defaultChecked` will be ignored. Use the `defaultValue` of the Checkbox.Group instead.',
        )
      }
    }

    const {
      sx,
      icon,
      value,
      children,
      className,
      slotProps,
      defaultChecked,
      onChange: onChangeProp,
      name = groupCtx?.name,
      type = 'checkbox',
      color = groupCtx?.color ?? primaryColor,
      disabled = groupCtx?.disabled ?? false,
      size = groupCtx?.size ?? 'md',
      radius = groupCtx?.radius ?? groupCtx?.size ?? size,
      checked: checkedProp,
      ...remainingProps
    } = props

    const [rawChecked, setRawChecked] = useState(
      () => checkedProp ?? defaultChecked ?? false,
    )

    const checkedInProps = checkedProp !== undefined

    if (!inGroup && checkedInProps && checkedProp !== rawChecked) {
      setRawChecked(checkedProp)
    }

    const checked = inGroup ? groupCtx.isChecked(value) : rawChecked

    const ownerState = {
      ...props,
      type,
      disabled,
      color,
      checked,
      size,
      radius,
    }

    const classes = useSlotClasses(ownerState)

    const onChange = useEvent((e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return
      }

      if (inGroup && value) {
        // eslint-disable-next-line no-unused-expressions
        groupCtx.toggleValue(value)
      }

      if (!inGroup && !checkedInProps) {
        setRawChecked(e.target.checked)
      }

      onChangeProp?.(e)
    })

    const styles = useSlotStyles({
      name: 'Checkbox',
      ownerState,
      slotRecipe: checkboxRecipe,
    })

    const rootProps = useSlotProps({
      externalSlotProps: slotProps?.root,
      externalForwardedProps: {
        className,
      },
      sx: [styles.root, resolveSxProps(sx, ownerState)],
      classNames: classes.root,
    })

    const inputProps = useSlotProps({
      externalSlotProps: slotProps?.input,
      externalForwardedProps: {
        ...remainingProps,
        value,
        name,
        ref,
        type,
        checked,
        disabled,
        onChange,
      },
      classNames: classes.input,
      sx: styles.input,
    })

    const iconContainerProps = useSlotProps({
      externalSlotProps: slotProps?.iconContainer,
      sx: styles.iconContainer,
      classNames: classes.iconContainer,
    })

    const iconProps = useSlotProps({
      externalSlotProps: slotProps?.icon,
      sx: styles.icon,
      classNames: classes.icon,
    })

    const labelProps = useSlotProps({
      externalSlotProps: slotProps?.label,
      sx: styles.label,
      classNames: classes.label,
    })

    const checkIcon = icon ? (
      isFunction(icon) ? (
        icon(ownerState)
      ) : (
        icon
      )
    ) : (
      <CheckOutlined {...iconProps} />
    )

    return (
      <nex.label {...rootProps}>
        <nex.input {...inputProps} />
        <nex.span {...iconContainerProps}>{checkIcon}</nex.span>
        <nex.span {...labelProps}>{children}</nex.span>
      </nex.label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
