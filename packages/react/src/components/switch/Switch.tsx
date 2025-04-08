'use client'

import { useId, useRef, useState } from 'react'
import { nex } from '@nex-ui/styled'
import type {
  ChangeEvent,
  ElementType,
  Ref,
  HTMLAttributes,
  MouseEvent,
  KeyboardEvent,
} from 'react'
import { isFunction, isString, mergeRefs } from '@nex-ui/utils'
import { useEvent, useFocusVisible } from '@nex-ui/hooks'
import { useNexUI } from '../provider'
import { switchRecipe } from '../../theme/recipes'
import {
  forwardRef,
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

const useAriaProps = (
  ownerState: SwitchOwnerState,
): Record<'input' | 'track' | 'label', HTMLAttributes<HTMLElement>> => {
  const { checked, disabled, as, tabIndex, type, children } = ownerState

  const childrenString = isString(children)

  const id = useId()

  let input = {}

  if (as === 'input') {
    input = {
      checked,
      disabled,
      type,
      role: 'switch',
      tabIndex: disabled ? -1 : tabIndex,
      'aria-labelledby': childrenString ? id : undefined,
      'aria-label': childrenString ? children : undefined,
    }
  } else if (isFunction(as)) {
    input = { checked, disabled, type, tabIndex }
  } else {
    input = {
      role: 'switch',
      tabIndex: disabled ? -1 : tabIndex,
      'aria-checked': checked,
      'aria-disabled': disabled || undefined,
      'aria-labelledby': childrenString ? id : undefined,
      'aria-label': childrenString ? children : undefined,
      'data-disabled': disabled || undefined,
    }
  }

  const track = {
    'aria-hidden': true,
    focusable: false,
  }

  const label = {
    id: childrenString ? id : undefined,
  }

  return { input, track, label }
}

export const Switch = forwardRef(
  <SwitchComponent extends ElementType = 'input'>(
    inProps: SwitchProps<SwitchComponent>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const { primaryColor } = useNexUI()

    const inputRef = useRef<HTMLInputElement>(null)

    const props = useDefaultProps<SwitchProps>({
      name: 'Switch',
      props: inProps,
    })

    const {
      sx,
      children,
      slotProps,
      className,
      startIcon,
      endIcon,
      defaultChecked,
      onCheckedChange,
      thumbIcon: thumbIconProp,
      checked: checkdeProp,
      disabled = false,
      size = 'md',
      type = 'checkbox',
      tabIndex = 0,
      as = 'input',
      onKeyDown: onKeyUpProp,
      onChange: onChangeProp,
      onClick: onClickProp,
      color = primaryColor,
      ...remainingProps
    } = props

    const [focusVisible] = useFocusVisible({ ref: inputRef })

    const [checked, setChecked] = useState(
      checkdeProp ?? defaultChecked ?? false,
    )

    const checkedInProps = checkdeProp !== undefined

    if (checkedInProps && checkdeProp !== checked) {
      setChecked(checkdeProp)
    }

    const ownerState = {
      ...props,
      as,
      color,
      checked,
      disabled,
      size,
      type,
      tabIndex,
    }

    const classes = useSlotClasses(ownerState)

    const styles = useStyles({
      name: 'Switch',
      ownerState,
      recipe: switchRecipe,
    })

    const onChange = useEvent((e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return
      }

      if (!checkedInProps) {
        setChecked(e.target.checked)
      }
      onCheckedChange?.(e.target.checked)
      onChangeProp?.(e)
    })

    const onClick = useEvent((event: MouseEvent<HTMLInputElement>) => {
      // Compatible with non interactive elements
      if (disabled) {
        event.preventDefault()
        return
      }

      if (isString(as) && as !== 'input') {
        if (!checkedInProps) {
          setChecked((c: boolean) => !c)
        }
        onCheckedChange?.(!checked)
      }

      onClickProp?.(event)
    })

    const onKeyUp = useEvent((event: KeyboardEvent<HTMLInputElement>) => {
      // Keyboard accessibility for non interactive elements
      if (
        focusVisible &&
        !disabled &&
        as !== 'input' &&
        event.code === 'Space'
      ) {
        inputRef.current?.click()
      }

      onKeyUpProp?.(event)
    })

    const {
      input: inputAriaProps,
      track: trackAriaProps,
      label: labelAriaProps,
    } = useAriaProps(ownerState)

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
        onChange,
        onClick,
        onKeyUp,
        ref: mergedRefs,
        ...inputAriaProps,
      },
    })

    const trackProps = useSlotProps({
      ownerState,
      externalSlotProps: slotProps?.track,
      sx: styles.track,
      classNames: classes.track,
      additionalProps: trackAriaProps,
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
      additionalProps: labelAriaProps,
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
  },
)

Switch.displayName = 'Switch'
