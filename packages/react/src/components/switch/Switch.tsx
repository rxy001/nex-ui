'use client'

import { useState } from 'react'
import { nex } from '@nex-ui/styled'
import type { ChangeEvent, ElementType, Ref } from 'react'
import { isFunction } from '@nex-ui/utils'
import { useEvent } from '@nex-ui/hooks'
import { useNexUI } from '../provider'
import { switchRecipe } from '../../theme/slotRecipes'
import {
  forwardRef,
  resolveSxProps,
  useDefaultProps,
  useSlotProps,
  useSlotStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import type { SwitchOwnerState, SwitchProps } from './types'

const useSlotClasses = (ownerState: SwitchOwnerState) => {
  const { prefix } = useNexUI()

  const switchRoot = `${prefix}-switch`

  const { size, color, disabled, checked, classes } = ownerState

  const slots = {
    root: [
      'root',
      `color-${color}`,
      `size-${size}`,
      disabled && 'disabled',
      checked && 'checked',
    ],
    input: ['input'],
    track: ['track'],
    thumb: ['thumb'],
    startIcon: ['start-icon'],
    endIcon: ['end-icon'],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(switchRoot),
    classes,
  )

  return composedClasses
}

export const Switch = forwardRef(
  <SwitchComponent extends ElementType = 'input'>(
    inProps: SwitchProps<SwitchComponent>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const { primaryColor } = useNexUI()

    const props = useDefaultProps<SwitchProps>({
      name: 'Switch',
      props: inProps,
    })

    const {
      sx,
      name,
      slotProps,
      className,
      startIcon,
      endIcon,
      defaultChecked,
      thumbIcon: thumbIconProp,
      checked: checkdeProp,
      disabled = false,
      size = 'md',
      onChange: onChangeProp,
      color = primaryColor,
      ...remainingProps
    } = props

    const [checked, setChecked] = useState(
      checkdeProp ?? defaultChecked ?? false,
    )

    const checkedInProps = checkdeProp !== undefined

    if (checkedInProps && checkdeProp !== checked) {
      setChecked(checkdeProp)
    }

    const ownerState = {
      ...props,
      color,
      checked,
      disabled,
      size,
    }

    const classes = useSlotClasses(ownerState)

    const styles = useSlotStyles({
      name: 'Switch',
      ownerState,
      slotRecipe: switchRecipe,
    })

    const onChange = useEvent((e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return
      }

      if (!checkedInProps) {
        setChecked(e.target.checked)
      }

      onChangeProp?.(e)
    })

    const rootProps = useSlotProps({
      externalSlotProps: slotProps?.root,
      externalForwardedProps: { className },
      sx: [styles.root, resolveSxProps(sx, ownerState)],
      classNames: classes.root,
    })

    const inputProps = useSlotProps({
      externalSlotProps: slotProps?.input,
      externalForwardedProps: {
        type: 'checkbox',
        ...remainingProps,
        ref,
        name,
        checked,
        disabled,
        onChange,
      },
      sx: styles.input,
      classNames: classes.input,
    })

    const trackProps = useSlotProps({
      externalSlotProps: slotProps?.track,
      sx: styles.track,
      classNames: classes.track,
    })

    const thumbProps = useSlotProps({
      externalSlotProps: slotProps?.thumb,
      sx: styles.thumb,
      classNames: classes.thumb,
    })

    const startIconProps = useSlotProps({
      externalSlotProps: slotProps?.startIcon,
      sx: styles.startIcon,
      classNames: classes.startIcon,
    })

    const endIconProps = useSlotProps({
      externalSlotProps: slotProps?.endIcon,
      sx: styles.endIcon,
      classNames: classes.endIcon,
    })

    const thumbIcon = isFunction(thumbIconProp)
      ? thumbIconProp(ownerState)
      : thumbIconProp

    return (
      <nex.label {...rootProps}>
        <nex.input {...inputProps} />
        <nex.span {...trackProps}>
          {startIcon && <nex.span {...startIconProps}>{startIcon}</nex.span>}
          <nex.span {...thumbProps}>{thumbIcon}</nex.span>
          {endIcon && <nex.span {...endIconProps}>{endIcon}</nex.span>}
        </nex.span>
      </nex.label>
    )
  },
)

Switch.displayName = 'Switch'
