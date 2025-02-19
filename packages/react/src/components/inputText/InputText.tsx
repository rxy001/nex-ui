'use client'

import { useRef, useState } from 'react'
import { nex } from '@nex-ui/styled'
import { composeRef } from '@nex-ui/utils'
import { useEvent } from '@nex-ui/hooks'
import { CloseCircleFilled } from '@nex-ui/icons'
import type { ChangeEvent, ElementType, Ref } from 'react'
import { useNexContext } from '../provider'
import { inputTextRecipe } from '../../theme/slotRecipes'
import {
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  forwardRef,
  useSlotProps,
  useSlotStyles,
  resolveSxProps,
} from '../utils'
import type { InputTextOwnerState, InputTextProps } from './types'
import { Button } from '../button'

const useSlotClasses = (ownerState: InputTextOwnerState) => {
  const { prefix } = useNexContext()

  const inputTextRoot = `${prefix}-input-text`

  const { variant, radius, size, color, disabled, fullWidth, error, classes } =
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
    classes,
  )

  return composedClasses
}

export const InputText = forwardRef(
  <InputComponent extends ElementType = 'input'>(
    inProps: InputTextProps<InputComponent>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const { primaryColor } = useNexContext()

    const props = useDefaultProps<InputTextProps>({
      name: 'InputText',
      props: inProps,
    })

    const {
      sx,
      name,
      className,
      prefix,
      suffix,
      defaultValue,
      onClear,
      slotProps,
      onChange: onChangeProp,
      value: valueProp,
      color = primaryColor,
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

    const valueInProps = valueProp !== undefined

    if (valueInProps && valueProp !== value) {
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

    const styles = useSlotStyles({
      ownerState,
      name: 'InputText',
      slotRecipe: inputTextRecipe,
    })

    const classes = useSlotClasses(ownerState)

    const onChange = useEvent((e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return
      }

      if (!valueInProps) {
        setValue(e.target.value)
      }

      onChangeProp?.(e)
    })

    const onClearValue = useEvent(() => {
      setValue('')
      onClear?.()
      inputRef.current?.focus()
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
        onChange,
        disabled,
        type,
        ref: composedRef,
      },
      sx: styles.input,
      classNames: classes.input,
    })

    const clearBtnProps = useSlotProps({
      externalSlotProps: slotProps?.clearBtn,
      externalForwardedProps: {
        onClick: onClearValue,
      },
      sx: styles.clearBtn,
      classNames: classes.clearBtn,
    })

    return (
      <nex.label {...rootProps}>
        {prefix}
        <nex.input {...inputProps} />
        {clearable && value && !disabled && (
          <Button
            iconOnly
            size='sm'
            variant='link'
            color='gray'
            {...clearBtnProps}
          >
            <CloseCircleFilled />
          </Button>
        )}
        {suffix}
      </nex.label>
    )
  },
)

InputText.displayName = 'InputText'
