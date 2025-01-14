import { useState } from 'react'
import { nex } from '@nex-ui/styled'
import type { ChangeEvent, ElementType, Ref } from 'react'
import { isFunction, useEvent } from '@nex-ui/utils'
import { useNexContext } from '../provider'
import {
  forwardRef,
  resolveSxProps,
  useDefaultProps,
  useSlotProps,
  useStyles,
  composeClasses,
  resovleClasses,
  getUtilityClass,
} from '../utils'
import type { SwitchOwnerState, SwitchProps } from './types'

const useSlotClasses = (ownerState: SwitchOwnerState) => {
  const { prefix } = useNexContext()

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
    startIcon: ['startIcon'],
    endIcon: ['endIcon'],
  }

  const composedClasses = composeClasses(
    slots,
    resovleClasses(classes, ownerState),
    getUtilityClass(switchRoot),
  )

  return composedClasses
}

export const Switch = forwardRef(
  <SwitchComponent extends ElementType = 'input'>(
    inProps: SwitchProps<SwitchComponent>,
    ref: Ref<HTMLInputElement>,
  ) => {
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
      type = 'checkbox',
      onChange: onChangeProp,
      color = 'blue',
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

    const styles = useStyles({
      name: 'Switch',
      ownerState,
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
        ...remainingProps,
        type,
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
