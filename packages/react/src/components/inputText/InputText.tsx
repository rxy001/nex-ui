'use client'

import clsx from 'clsx'
import { useRef, useState } from 'react'
import { nex, composeSx } from '@nex-ui/styled'
import { composeRef, useEvent } from '@nex-ui/utils'
import { CloseCircleFilled } from '@nex-ui/icons'
import type { ChangeEvent, ElementType, Ref } from 'react'
import { useNexContext } from '../provider'
import {
  useStyles,
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  forwardRef,
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

export const InputText = forwardRef(
  <InputComponent extends ElementType = 'input'>(
    inProps: InputTextProps<InputComponent>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const props = useDefaultProps<InputTextProps>({
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
      slotProps,
      onChange: onChangeProp,
      value: valueProp,
      color = 'blue',
      type = 'text',
      disabled = false,
      variant = 'outlined',
      fullWidth = false,
      error = false,
      size = 'md',
      radius = size,
      clearable = false,
      ...remainingProps
    } = props

    const [value, setValue] = useState(valueProp ?? defaultValue ?? '')
    const inputRef = useRef<HTMLInputElement>(null)
    const composedRef = composeRef<HTMLInputElement>(ref, inputRef)

    if (valueProp !== undefined && valueProp !== value) {
      setValue(valueProp)
    }

    const ownerState = {
      ...props,
      color,
      disabled,
      variant,
      fullWidth,
      size,
      radius,
      error,
    }

    const styles = useStyles({
      ownerState,
      name: 'InputText',
    })

    const classes = useUtilityClasses(ownerState)

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
      <nex.span
        {...slotProps?.root}
        sx={composeSx(styles.root, sx)}
        className={clsx(classes.root, className)}
      >
        {prefix}
        <nex.input
          {...slotProps?.input}
          {...remainingProps}
          value={value}
          onChange={onChange}
          disabled={disabled}
          type={type}
          ref={composedRef}
          sx={composeSx(styles.input, slotProps?.input?.sx)}
          className={clsx(classes.input, slotProps?.input?.className)}
        />
        {clearable && value && !disabled && (
          <Button
            iconOnly
            size="sm"
            variant="link"
            color="gray"
            onClick={onClearValue}
            {...slotProps?.clearBtn}
            sx={composeSx(styles.clearBtn, slotProps?.clearBtn?.sx)}
            className={clsx(classes.clearBtn, slotProps?.clearBtn?.className)}
          >
            <CloseCircleFilled />
          </Button>
        )}
        {suffix}
      </nex.span>
    )
  },
)

InputText.displayName = 'InputText'
