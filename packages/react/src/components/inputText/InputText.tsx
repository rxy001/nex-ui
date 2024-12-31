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

const useUtilityClasses = <InputComponent extends ElementType = 'input'>(
  ownerState: InputTextOwnerState<InputComponent>,
) => {
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
    const props = useDefaultProps({
      name: 'InputText',
      props: inProps,
    })

    const {
      sx,
      as,
      id,
      prefix,
      suffix,
      className,
      defaultValue,
      onClear,
      onBlur,
      onFocus,
      onKeyUp,
      onKeyDown,
      placeholder,
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
    } = props

    const ownerState: InputTextOwnerState<InputComponent> = {
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
    const composedRef = composeRef<HTMLInputElement>(ref, inputRef)
    const [value, setValue] = useState(valueProp ?? defaultValue)

    if (valueProp !== undefined && valueProp !== value) {
      setValue(valueProp)
    }

    const styles = useStyles({
      ownerState,
      name: 'InputText',
    })

    const classes = useUtilityClasses<InputComponent>(ownerState)

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
          as={as}
          ref={composedRef}
          value={value}
          sx={styles.input}
          onChange={onChange}
          disabled={disabled}
          className={classes.input}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          type={type}
          id={id}
        />
        {clearable && value && !disabled && (
          <Button
            iconOnly
            sx={styles.clearBtn}
            size="sm"
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

InputText.displayName = 'InputText'
