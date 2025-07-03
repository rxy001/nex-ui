'use client'

import { useId, useMemo } from 'react'
import { isFunction, isString } from '@nex-ui/utils'
import { useControlledState, useEvent, useFocusRing } from '@nex-ui/hooks'
import { useNexUI } from '../provider'
import { switchRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import type {
  ChangeEvent,
  ElementType,
  HTMLAttributes,
  KeyboardEvent,
  InputHTMLAttributes,
  MouseEvent,
} from 'react'
import type { SwitchOwnerState, SwitchProps } from './types'

const useSlotClasses = (ownerState: SwitchOwnerState) => {
  const { prefix } = useNexUI()

  const { size, color, disabled, checked, classes } = ownerState

  return useMemo(() => {
    const switchRoot = `${prefix}-switch`

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

    return composeClasses(slots, getUtilityClass(switchRoot), classes)
  }, [checked, classes, color, disabled, size, prefix])
}

const useSlotAriaProps = (
  ownerState: SwitchOwnerState,
): Record<'input' | 'label', HTMLAttributes<HTMLElement>> => {
  const {
    as,
    checked,
    disabled,
    children,
    slotProps,
    role = 'switch',
    tabIndex = 0,
    type = 'checkbox',
  } = ownerState

  const id = useId()

  const ariaLabelledby = ownerState['aria-labelledby']
  const ariaLabel = ownerState['aria-label']
  const ariaChecked = ownerState['aria-checked']
  const ariaDisabled = ownerState['aria-disabled']

  return useMemo(() => {
    const stringChildren = isString(children)
    const labelProps = slotProps?.label ?? {}
    const labelId = labelProps.id ?? (stringChildren ? id : undefined)

    let input: InputHTMLAttributes<HTMLInputElement> = {
      checked,
      disabled,
      role,
      tabIndex: disabled ? -1 : tabIndex,
      'aria-labelledby': ariaLabelledby ?? labelId,
      'aria-label': ariaLabel ?? (stringChildren ? children : undefined),
    }

    if (!as || as === 'input' || isFunction(as)) {
      input = {
        ...input,
        type,
      }
    } else {
      input = {
        ...input,
        'aria-checked': ariaChecked ?? checked,
        'aria-disabled': ariaDisabled ?? (disabled || undefined),
      }
    }

    const label = {
      id: labelId,
    }

    return { input, label }
  }, [
    ariaChecked,
    ariaDisabled,
    ariaLabel,
    ariaLabelledby,
    as,
    checked,
    children,
    disabled,
    id,
    role,
    slotProps?.label,
    tabIndex,
    type,
  ])
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
    startIcon,
    endIcon,
    onCheckedChange,
    thumbIcon: thumbIconProp,
    checked: checkdeProp,
    disabled = false,
    size = 'md',
    defaultChecked = false,
    color = primaryThemeColor,
    ...remainingProps
  } = props

  const { focusVisible, focusProps } = useFocusRing()

  const [checked, setChecked] = useControlledState(
    checkdeProp,
    defaultChecked,
    onCheckedChange,
  )

  const ownerState: SwitchOwnerState = {
    ...props,
    color,
    checked,
    disabled,
    size,
    defaultChecked,
  }

  const handleChange = useEvent((e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  })

  const handleClick = useEvent((event: MouseEvent<HTMLInputElement>) => {
    // Compatible with non interactive elements
    if (event.currentTarget.tagName !== 'INPUT') {
      setChecked(!checked)
    }
  })

  const handleKeyUp = useEvent((event: KeyboardEvent<HTMLInputElement>) => {
    // Keyboard accessibility for non interactive elements
    if (
      focusVisible &&
      event.code === 'Space' &&
      event.target === event.currentTarget &&
      event.currentTarget.tagName !== 'INPUT'
    ) {
      event.currentTarget.click()
    }
  })

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({
    ownerState,
    name: 'Switch',
    recipe: switchRecipe,
  })

  const slotAriaProps = useSlotAriaProps(ownerState)

  const [SwitchRoot, getSwitchRootProps] = useSlot({
    ownerState,
    elementType: 'label',
    externalSlotProps: slotProps?.root,
    style: styles.root,
    classNames: classes.root,
    additionalProps: {
      className,
      sx,
    },
  })

  const [SwitchInput, getSwitchInputProps] = useSlot({
    ownerState,
    elementType: 'input',
    externalForwardedProps: remainingProps,
    style: styles.input,
    classNames: classes.input,
    a11y: slotAriaProps.input,
    additionalProps: {
      onChange: handleChange,
      onClick: handleClick,
      onKeyUp: handleKeyUp,
      ...focusProps,
    },
  })

  const [SwitchTrack, getSwitchTrackProps] = useSlot({
    ownerState,
    elementType: 'span',
    externalSlotProps: slotProps?.track,
    style: styles.track,
    classNames: classes.track,
  })

  const [SwitchThumb, getSwitchThumbProps] = useSlot({
    ownerState,
    elementType: 'span',
    externalSlotProps: slotProps?.thumb,
    style: styles.thumb,
    classNames: classes.thumb,
  })

  const [SwitchStartIcon, getSwitchStartIconProps] = useSlot({
    ownerState,
    elementType: 'span',
    externalSlotProps: slotProps?.startIcon,
    style: styles.startIcon,
    classNames: classes.startIcon,
  })

  const [SwitchEndIcon, getSwitchEndIconProps] = useSlot({
    ownerState,
    elementType: 'span',
    externalSlotProps: slotProps?.endIcon,
    style: styles.endIcon,
    classNames: classes.endIcon,
  })

  const [SwitchLabel, getSwitchLabelProps] = useSlot({
    ownerState,
    elementType: 'span',
    externalSlotProps: slotProps?.label,
    style: styles.label,
    classNames: classes.label,
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
