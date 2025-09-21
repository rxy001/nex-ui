'use client'

import { useId, useMemo } from 'react'
import { isFunction, isString } from '@nex-ui/utils'
import { useControlledState } from '@nex-ui/hooks'
import { useNexUI } from '../provider'
import { InputBase } from '../inputBase'
import { switchRecipe } from '../../theme/recipes'
import { useDefaultProps, useStyles, useSlotClasses, useSlot } from '../utils'
import type { ElementType, HTMLAttributes } from 'react'
import type { SwitchProps } from './types'

const slots = [
  'root',
  'input',
  'track',
  'thumb',
  'startIcon',
  'endIcon',
  'label',
]

const useSlotAriaProps = (
  ownerState: SwitchProps,
): Record<'input' | 'label', HTMLAttributes<HTMLElement>> => {
  const {
    children,
    slotProps,
    role,
    'aria-labelledby': labelledBy,
    'aria-label': ariaLabel,
  } = ownerState

  const id = useId()

  return useMemo(() => {
    const hasLabel = !!children
    const stringChildren = isString(children)
    const labelProps = slotProps?.label ?? {}
    const labelId = labelProps.id ?? (hasLabel ? id : undefined)

    return {
      input: {
        role,
        'aria-labelledby': labelledBy ?? labelId,
        'aria-label': ariaLabel ?? (stringChildren ? children : undefined),
      },
      label: {
        id: labelId,
      },
    }
  }, [ariaLabel, children, id, labelledBy, role, slotProps?.label])
}

export const Switch = <SwitchComponent extends ElementType = 'input'>(
  inProps: SwitchProps<SwitchComponent>,
) => {
  const { primaryThemeColor } = useNexUI()

  const props = useDefaultProps<SwitchProps>({
    name: 'Switch',
    props: inProps,
  })

  const {
    sx,
    children,
    slotProps,
    className,
    classNames,
    startIcon,
    endIcon,
    onCheckedChange,
    thumbIcon: thumbIconProp,
    checked: checkedProp,
    role = 'switch',
    disabled = false,
    as = 'input',
    size = 'md',
    type = 'checkbox',
    defaultChecked = false,
    color = primaryThemeColor,
    ...remainingProps
  } = props

  const [checked, setChecked] = useControlledState(
    checkedProp,
    defaultChecked,
    onCheckedChange,
  )

  const ownerState: SwitchProps = {
    ...props,
    color,
    as,
    type,
    checked,
    disabled,
    size,
    defaultChecked,
    role,
  }

  const slotClasses = useSlotClasses({
    name: 'Switch',
    slots,
    classNames,
  })

  const styles = useStyles({
    ownerState,
    name: 'Switch',
    recipe: switchRecipe,
  })

  const slotAriaProps = useSlotAriaProps(ownerState)

  const [SwitchRoot, getSwitchRootProps] = useSlot({
    elementType: 'label',
    externalSlotProps: slotProps?.root,
    style: styles.root,
    classNames: slotClasses.root,
    additionalProps: {
      className,
      sx,
    },
    dataAttrs: {
      color,
      size,
      disabled,
      checked,
    },
  })

  const [SwitchInput, getSwitchInputProps] = useSlot({
    elementType: InputBase,
    externalForwardedProps: remainingProps,
    style: styles.input,
    classNames: slotClasses.input,
    a11y: slotAriaProps.input,
    shouldForwardComponent: false,
    additionalProps: {
      as,
      type,
      role,
      checked,
      disabled,
      onCheckedChange: setChecked,
    },
  })

  const [SwitchTrack, getSwitchTrackProps] = useSlot({
    elementType: 'span',
    externalSlotProps: slotProps?.track,
    style: styles.track,
    classNames: slotClasses.track,
  })

  const [SwitchThumb, getSwitchThumbProps] = useSlot({
    elementType: 'span',
    externalSlotProps: slotProps?.thumb,
    style: styles.thumb,
    classNames: slotClasses.thumb,
  })

  const [SwitchStartIcon, getSwitchStartIconProps] = useSlot({
    elementType: 'span',
    externalSlotProps: slotProps?.startIcon,
    style: styles.startIcon,
    classNames: slotClasses.startIcon,
  })

  const [SwitchEndIcon, getSwitchEndIconProps] = useSlot({
    elementType: 'span',
    externalSlotProps: slotProps?.endIcon,
    style: styles.endIcon,
    classNames: slotClasses.endIcon,
  })

  const [SwitchLabel, getSwitchLabelProps] = useSlot({
    elementType: 'span',
    externalSlotProps: slotProps?.label,
    style: styles.label,
    classNames: slotClasses.label,
    a11y: slotAriaProps.label,
  })

  const thumbIcon = isFunction(thumbIconProp)
    ? thumbIconProp(ownerState)
    : thumbIconProp

  return (
    <SwitchRoot {...getSwitchRootProps()}>
      <SwitchInput {...getSwitchInputProps()} />
      <SwitchTrack {...getSwitchTrackProps()}>
        {startIcon && (
          <SwitchStartIcon {...getSwitchStartIconProps()}>
            {startIcon}
          </SwitchStartIcon>
        )}
        <SwitchThumb {...getSwitchThumbProps()}>{thumbIcon}</SwitchThumb>
        {endIcon && (
          <SwitchEndIcon {...getSwitchEndIconProps()}>{endIcon}</SwitchEndIcon>
        )}
      </SwitchTrack>
      {children && (
        <SwitchLabel {...getSwitchLabelProps()}>{children}</SwitchLabel>
      )}
    </SwitchRoot>
  )
}

Switch.displayName = 'Switch'
