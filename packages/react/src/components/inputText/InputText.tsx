import clsx from 'clsx'
import { forwardRef, useState } from 'react'
import { nex, composeSx } from '@nex-ui/styled'
import { useEvent } from '@nex-ui/utils'
import type { ChangeEvent } from 'react'
import { useNexContext } from '../provider'
import {
  useStyles,
  useDefaultProps,
  composeClasses,
  getUtilityClass,
} from '../utils'
import type { InputTextOwnerState, InputTextProps } from './types'

const useUtilityClasses = (ownerState: InputTextOwnerState) => {
  const { prefix } = useNexContext()

  const inputTextRoot = `${prefix}-input-text`

  const { classes, variant, radius, size, color, disabled, fullWidth, error } =
    ownerState

  const slots = {
    root: [
      'root',
      `variant-${variant}`,
      `radius-${radius}`,
      `size-${size}`,
      `color-${color}`,
      disabled && 'disabled',
      fullWidth && 'fullWidth',
      error && 'error',
    ],
    input: ['input'],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(inputTextRoot),
    ownerState,
    classes,
  )

  return composedClasses
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (inProps, ref) => {
    const props = useDefaultProps({
      name: 'InputText',
      props: inProps,
    })

    const {
      sx,
      className,
      prefix,
      suffix,
      defaultValue,
      onChange: onChangeProp,
      value: valueProp,
      color = 'blue',
      disabled = false,
      variant = 'outlined',
      fullWidth = false,
      error = false,
      size = 'md',
      radius = size,
      ...remainingProps
    } = props

    const ownerState: InputTextOwnerState = {
      ...props,
      color,
      disabled,
      variant,
      fullWidth,
      size,
      radius,
      error,
    }

    const [value, setValue] = useState(valueProp ?? defaultValue)

    if (valueProp && valueProp !== value) {
      setValue(valueProp)
    }

    const styles = useStyles({
      ownerState,
      name: 'InputText',
    })

    const classes = useUtilityClasses(ownerState)

    const composedSx = composeSx(styles.root, sx)

    const onChange = useEvent((e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      onChangeProp?.(e)
    })

    return (
      <nex.span sx={composedSx} className={clsx(classes.root, className)}>
        {prefix}
        <nex.input
          ref={ref}
          type="text"
          value={value}
          sx={styles.input}
          onChange={onChange}
          disabled={disabled}
          className={classes.input}
          {...remainingProps}
        />
        {suffix}
      </nex.span>
    )
  },
)
