import clsx from 'clsx'
import { composeSx, nex } from '@nex-ui/styled'
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
} from '../utils'
import type { CheckboxOwnerState, CheckboxProps } from './types'

const useUtilityClasses = (ownerState: CheckboxOwnerState) => {
  const { prefix } = useNexContext()

  const checkboxRoot = `${prefix}-checkbox`

  const { classes, radius, size, color, disabled, checked } = ownerState

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
    ownerState,
    classes,
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
      classes: _classes,
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

    const classes = useUtilityClasses(ownerState)

    const onChange = useEvent((e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked)
      onChangeProp?.(e)
    })

    const styles = useStyles({
      name: 'Checkbox',
      ownerState,
    })

    return (
      <nex.label
        {...slotProps?.root}
        sx={composeSx(styles.root, sx)}
        className={clsx(classes.root, className)}
      >
        <nex.input
          {...slotProps?.input}
          {...remainingProps}
          type={type}
          ref={ref}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          sx={composeSx(styles.input, slotProps?.input?.sx)}
          className={clsx(classes.input, slotProps?.input?.className)}
        />
        <nex.span
          {...slotProps?.iconContainer}
          sx={composeSx(styles.iconContainer, slotProps?.iconContainer?.sx)}
          className={clsx(
            classes.iconContainer,
            slotProps?.iconContainer?.className,
          )}
        >
          <CheckOutlined
            {...slotProps?.icon}
            sx={composeSx(styles.icon, slotProps?.icon?.sx)}
            className={clsx(classes.icon, slotProps?.icon?.className)}
          />
        </nex.span>
        <nex.span
          sx={composeSx(styles.label, slotProps?.label?.sx)}
          className={clsx(classes.label, slotProps?.label?.className)}
        >
          {children}
        </nex.span>
      </nex.label>
    )
  },
)
