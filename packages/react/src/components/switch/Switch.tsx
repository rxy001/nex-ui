'use client'

import { useId, useRef } from 'react'
import { nex } from '@nex-ui/styled'
import type {
  ChangeEvent,
  ElementType,
  HTMLAttributes,
  KeyboardEvent,
  InputHTMLAttributes,
} from 'react'
import { isFunction, isString, mergeRefs } from '@nex-ui/utils'
import { useControlledState, useEvent, useFocusVisible } from '@nex-ui/hooks'
import { useNexUI } from '../provider'
import { switchRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useSlotProps,
  useStyles,
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
    label: ['label'],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(switchRoot),
    classes,
  )

  return composedClasses
}

const useSlotAriaProps = (
  ownerState: SwitchOwnerState,
): Record<'input' | 'label', HTMLAttributes<HTMLElement>> => {
  const { checked, disabled, as, tabIndex, type, children } = ownerState

  const childrenString = isString(children)

  const id = useId()

  let input: InputHTMLAttributes<HTMLInputElement> = {
    checked,
    disabled,
    type,
    tabIndex: disabled ? -1 : tabIndex,
  }

  if (as === 'input') {
    input = {
      ...input,
      role: 'switch',
      'aria-labelledby': childrenString ? id : undefined,
      'aria-label': childrenString ? children : undefined,
    }
  } else if (isFunction(as)) {
    input = {
      ...input,
      tabIndex,
    }
  } else {
    input = {
      ...input,
      role: 'switch',
      'aria-checked': checked,
      'aria-labelledby': childrenString ? id : undefined,
      'aria-label': childrenString ? children : undefined,
      'aria-disabled': disabled || undefined,
    }
  }

  const label = {
    id: childrenString ? id : undefined,
  }

  return { input, label }
}

export const Switch = <SwitchComponent extends ElementType = 'input'>(
  inProps: SwitchProps<SwitchComponent>,
) => {
  const { primaryColor } = useNexUI()

  const inputRef = useRef<HTMLInputElement>(null)

  const props = useDefaultProps<SwitchProps>({
    name: 'Switch',
    props: inProps,
  })

  const {
    sx,
    ref,
    children,
    slotProps,
    className,
    startIcon,
    endIcon,
    onCheckedChange,
    thumbIcon: thumbIconProp,
    checked: checkdeProp,
    disabled = false,
    size = 'md',
    type = 'checkbox',
    tabIndex = 0,
    as = 'input',
    defaultChecked = false,
    color = primaryColor,
    ...remainingProps
  } = props

  const [focusVisible] = useFocusVisible({ ref: inputRef })

  const [checked, setChecked] = useControlledState(
    checkdeProp,
    defaultChecked,
    onCheckedChange,
  )

  const ownerState: SwitchOwnerState = {
    ...props,
    as,
    color,
    checked,
    disabled,
    size,
    type,
    tabIndex,
    defaultChecked,
  }

  const handleChange = useEvent((e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  })

  const handleClick = useEvent(() => {
    // Compatible with non interactive elements
    if (isString(as) && as !== 'input') {
      setChecked(!checked)
    }
  })

  const handleKeyUp = useEvent((event: KeyboardEvent<HTMLInputElement>) => {
    // Keyboard accessibility for non interactive elements
    if (focusVisible && as !== 'input' && event.code === 'Space') {
      event.currentTarget.click()
    }
  })

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({
    name: 'Switch',
    ownerState,
    recipe: switchRecipe,
  })

  const slotAriaProps = useSlotAriaProps(ownerState)

  const mergedRefs = mergeRefs(ref, inputRef)

  const rootProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.root,
    externalForwardedProps: { className, sx },
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
      as,
      onChange: handleChange,
      onClick: handleClick,
      onKeyUp: handleKeyUp,
      ref: mergedRefs,
      ...slotAriaProps.input,
    },
  })

  const trackProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.track,
    sx: styles.track,
    classNames: classes.track,
  })

  const thumbProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.thumb,
    sx: styles.thumb,
    classNames: classes.thumb,
  })

  const startIconProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.startIcon,
    sx: styles.startIcon,
    classNames: classes.startIcon,
  })

  const endIconProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.endIcon,
    sx: styles.endIcon,
    classNames: classes.endIcon,
  })

  const labelProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.label,
    sx: styles.label,
    classNames: classes.label,
    additionalProps: slotAriaProps.label,
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
      {children && <nex.span {...labelProps}>{children}</nex.span>}
    </nex.label>
  )
}

Switch.displayName = 'Switch'
