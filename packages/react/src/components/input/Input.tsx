'use client'

import { useRef, useState } from 'react'
import { nex } from '@nex-ui/styled'
import { mergeRefs } from '@nex-ui/utils'
import { useEvent } from '@nex-ui/hooks'
import { CloseCircleFilled } from '@nex-ui/icons'
import type { ChangeEvent, ElementType, Ref } from 'react'
import { useNexUI } from '../provider'
import { inputRecipe } from '../../theme/slotRecipes'
import {
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  forwardRef,
  useSlotProps,
  useSlotStyles,
} from '../utils'
import type { InputOwnerState, InputProps } from './types'
import { Button } from '../button'

const useSlotClasses = (ownerState: InputOwnerState) => {
  const { prefix } = useNexUI()

  const inputRoot = `${prefix}-input`

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
    getUtilityClass(inputRoot),
    classes,
  )

  return composedClasses
}

export const Input = forwardRef(
  <InputComponent extends ElementType = 'input'>(
    inProps: InputProps<InputComponent>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const { primaryColor } = useNexUI()

    const props = useDefaultProps<InputProps>({
      name: 'Input',
      props: inProps,
    })

    const {
      sx,
      className,
      prefix,
      suffix,
      defaultValue,
      onClear,
      slotProps,
      value: valueProp,
      onChange: onChangeProp,
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
    const mergedRefs = mergeRefs<HTMLInputElement>(ref, inputRef)

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
      name: 'Input',
      slotRecipe: inputRecipe,
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
      ownerState,
      externalSlotProps: slotProps?.root,
      externalForwardedProps: {
        className,
        sx,
      },
      sx: styles.root,
      classNames: classes.root,
    })

    const inputProps = useSlotProps({
      ownerState,
      externalSlotProps: slotProps?.input,
      externalForwardedProps: remainingProps,
      sx: styles.input,
      classNames: classes.input,
      additionalProps: {
        value,
        onChange,
        disabled,
        type,
        ref: mergedRefs,
      },
    })

    const clearBtnProps = useSlotProps({
      ownerState,
      externalSlotProps: slotProps?.clearBtn,
      sx: styles.clearBtn,
      classNames: classes.clearBtn,
      additionalProps: {
        onClick: onClearValue,
      },
    })

    return (
      <nex.label {...rootProps}>
        {prefix}
        <nex.input {...inputProps} />
        {clearable && value && !disabled && (
          <Button
            iconOnly
            radius='full'
            size='sm'
            color='gray'
            variant='text'
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

Input.displayName = 'Input'
