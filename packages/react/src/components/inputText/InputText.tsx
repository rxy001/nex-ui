import clsx from 'clsx'
import { forwardRef, useRef, useState } from 'react'
import { nex, composeSx } from '@nex-ui/styled'
import { composeRef, useEvent } from '@nex-ui/utils'
import { CloseCircleFilled } from '@nex-ui/icons'
import type { ChangeEvent } from 'react'
import { useNexContext } from '../provider'
import {
  useStyles,
  useDefaultProps,
  composeClasses,
  getUtilityClass,
} from '../utils'
import type { InputTextOwnerState, InputTextProps } from './types'
import { Button } from '../button'

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
      fullWidth && 'full-width',
      error && 'error',
    ],
    input: ['input'],
    clearBtn: ['clear-btn'],
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
      prefix,
      suffix,
      className,
      defaultValue,
      onClear,
      onChange: onChangeProp,
      value: valueProp,
      color = 'blue',
      disabled = false,
      variant = 'outlined',
      fullWidth = false,
      error = false,
      size = 'md',
      radius = size,
      clearable = false,
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

    const inputRef = useRef<HTMLInputElement>(null)
    const composedRef = composeRef<HTMLInputElement>(ref as any, inputRef)
    const [value, setValue] = useState(valueProp ?? defaultValue)

    if (valueProp !== undefined && valueProp !== value) {
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

    const onClearValue = useEvent(() => {
      setValue('')
      onClear?.()
      inputRef.current?.focus()
    })

    return (
      <nex.span sx={composedSx} className={clsx(classes.root, className)}>
        {prefix}
        <nex.input
          ref={composedRef}
          type="text"
          value={value}
          sx={styles.input}
          onChange={onChange}
          disabled={disabled}
          className={classes.input}
          {...remainingProps}
        />
        {clearable && value && !disabled && (
          <Button
            iconOnly
            sx={styles.clearBtn}
            variant="link"
            color="gray"
            onClick={onClearValue}
            className={classes.clearBtn}
          >
            <CloseCircleFilled />
          </Button>
        )}
        {suffix}
      </nex.span>
    )
  },
)
