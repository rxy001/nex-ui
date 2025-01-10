'use client'

import { nex } from '@nex-ui/styled'
import { useState } from 'react'
import { CheckOutlined } from '@nex-ui/icons'
import { useEvent } from '@nex-ui/utils'
import type { Ref, ElementType, ChangeEvent } from 'react'
import { useNexContext } from '../provider'
import {
  forwardRef,
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  resovleClasses,
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
    resovleClasses(classes, ownerState),
    getUtilityClass(checkboxRoot),
  )

  return composedClasses
}

export const Checkbox = forwardRef(
  <CheckboxComponent extends ElementType = 'input'>(
    inProps: CheckboxProps<CheckboxComponent>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const props = useDefaultProps<CheckboxProps>({
      name: 'Checkbox',
      props: inProps,
    })

    const {
      sx,
      children,
      className,
      slotProps,
      defaultChecked,
      onChange: onChangeProp,
      type = 'checkbox',
      color = 'blue',
      disabled = false,
      size = 'md',
      radius = size,
      checked: checkedProps,
      ...remainingProps
    } = props

    const [checked, setChecked] = useState(
      checkedProps ?? defaultChecked ?? false,
    )

    if (checkedProps !== undefined && checkedProps !== checked) {
      setChecked(checkedProps)
    }

    const ownerState = {
      ...props,
      type,
      color,
      checked,
      size,
      radius,
    }

    const classes = useSlotClasses(ownerState)

    const onChange = useEvent((e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked)
      onChangeProp?.(e)
    })

    const styles = useStyles({
      name: 'Checkbox',
      ownerState,
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

    return (
      <nex.label {...rootProps}>
        <nex.input {...inputProps} />
        <nex.span {...iconContainerProps}>
          <CheckOutlined {...iconProps} />
        </nex.span>
        <nex.span {...labelProps}>{children}</nex.span>
      </nex.label>
    )
  },
)
