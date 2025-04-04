'use client'

import { nex } from '@nex-ui/styled'
import { useState, isValidElement, useId, useRef } from 'react'
import { isFunction, __DEV__, isString, mergeRefs } from '@nex-ui/utils'
import { useEvent, useFocusVisible } from '@nex-ui/hooks'
import type {
  Ref,
  ElementType,
  ChangeEvent,
  HTMLAttributes,
  MouseEvent,
  KeyboardEvent,
} from 'react'
import { checkboxRecipe } from '../../theme/slotRecipes'
import { useNexUI } from '../provider'
import { useCheckboxGroupContext } from './CheckboxGroupContext'
import {
  forwardRef,
  useDefaultProps,
  useSlotStyles,
  composeClasses,
  getUtilityClass,
  useSlotProps,
} from '../utils'
import type { CheckboxOwnerState, CheckboxProps } from './types'
import { CheckedIcon } from './CheckedIcon'
import { Box } from '../box'

const useSlotClasses = (ownerState: CheckboxOwnerState) => {
  const { prefix } = useNexUI()

  const checkboxRoot = `${prefix}-checkbox`

  const { radius, size, color, disabled, checked, classes } = ownerState

  const slots = {
    root: [
      'root',
      `radius-${radius}`,
      `size-${size}`,
      `color-${color}`,
      disabled && 'disabled',
      checked && 'checked',
    ],
    input: ['input'],
    label: ['label'],
    icon: ['icon'],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(checkboxRoot),
    classes,
  )

  return composedClasses
}

const useAriaProps = (
  ownerState: CheckboxOwnerState,
): Record<'input' | 'icon' | 'label', HTMLAttributes<HTMLElement>> => {
  const id = useId()
  const { as, disabled, tabIndex, type, value, checked, children } = ownerState

  const childrenString = isString(children)

  let input = {}

  if (as === 'input') {
    input = {
      disabled,
      checked,
      type,
      value,
      tabIndex: disabled ? -1 : tabIndex,
      'aria-labelledby': childrenString ? id : undefined,
      'aria-label': childrenString ? children : undefined,
    }
  } else if (isFunction(as)) {
    input = {
      tabIndex,
      disabled,
      checked,
      type,
      value,
    }
  } else {
    input = {
      role: 'checkbox',
      tabIndex: disabled ? -1 : tabIndex,
      'aria-checked': checked,
      'aria-disabled': disabled || undefined,
      'aria-labelledby': childrenString ? id : undefined,
      'aria-label': childrenString ? children : undefined,
      'data-disabled': disabled || undefined,
    }
  }

  const icon = {
    'aria-hidden': true,
    focusable: false,
  }

  const label = {
    id: childrenString ? id : undefined,
  }

  return { input, icon, label }
}

export const Checkbox = forwardRef(
  <CheckboxComponent extends ElementType = 'input'>(
    inProps: CheckboxProps<CheckboxComponent>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const { primaryColor } = useNexUI()
    const inputRef = useRef<HTMLInputElement>(null)

    const props = useDefaultProps<CheckboxProps>({
      name: 'Checkbox',
      props: inProps,
    })

    const groupCtx = useCheckboxGroupContext()

    const inGroup = !!groupCtx

    if (__DEV__ && inGroup) {
      if ('checked' in props) {
        console.warn(
          '[Nex UI] Checkbox: The Checkbox.Group is being used, `checked` will be ignored. Use the `value` of the Checkbox.Group instead.',
        )
      }
      if ('defaultChecked' in props) {
        console.warn(
          '[Nex UI] Checkbox: The Checkbox.Group is being used, `defaultChecked` will be ignored. Use the `defaultValue` of the Checkbox.Group instead.',
        )
      }
    }

    const {
      sx,
      icon,
      value,
      className,
      children,
      slotProps,
      defaultChecked,
      onCheckedChange,
      type = 'checkbox',
      onClick: onClickProp,
      onChange: onChangeProp,
      onKeyUp: onKeyUpProp,
      as = 'input',
      tabIndex = 0,
      name = groupCtx?.name,
      color = groupCtx?.color ?? primaryColor,
      disabled = groupCtx?.disabled ?? false,
      size = groupCtx?.size ?? 'md',
      radius = groupCtx?.radius ?? groupCtx?.size ?? size,
      checked: checkedProp,
      ...remainingProps
    } = props

    const [rawChecked, setRawChecked] = useState(
      () => checkedProp ?? defaultChecked ?? false,
    )

    const [focusVisible] = useFocusVisible({ ref: inputRef })

    const checkedInProps = checkedProp !== undefined

    if (!inGroup && checkedInProps && checkedProp !== rawChecked) {
      setRawChecked(checkedProp)
    }

    const checked = inGroup ? groupCtx.isChecked(value) : rawChecked

    const ownerState = {
      ...props,
      type,
      tabIndex,
      name,
      disabled,
      color,
      checked,
      size,
      radius,
      as,
    }

    const classes = useSlotClasses(ownerState)

    const onChange = useEvent((event: ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return
      }

      if (inGroup && value) {
        groupCtx.toggleValue(value)
      }

      if (!inGroup && !checkedInProps) {
        setRawChecked(event.target.checked)
      }

      onCheckedChange?.(event.target.checked)
      onChangeProp?.(event)
    })

    const onClick = useEvent((event: MouseEvent<HTMLInputElement>) => {
      // Compatible with non interactive elements
      if (disabled) {
        event.preventDefault()
        return
      }

      if (isString(as) && as !== 'input') {
        if (inGroup && value) {
          groupCtx.toggleValue(value)
        }

        if (!inGroup && !checkedInProps) {
          setRawChecked((c) => !c)
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

    const styles = useSlotStyles({
      name: 'Checkbox',
      ownerState,
      slotRecipe: checkboxRecipe,
    })

    const {
      input: inputAriaProps,
      icon: iconAriaProps,
      label: labelAriaProps,
    } = useAriaProps(ownerState)

    const mergedRefs = mergeRefs(ref, inputRef)

    const rootProps = useSlotProps({
      ownerState,
      externalSlotProps: slotProps?.root,
      externalForwardedProps: {
        sx,
        className,
      },
      sx: styles.root,
      classNames: classes.root,
    })

    const inputProps = useSlotProps({
      ownerState,
      externalSlotProps: slotProps?.input,
      externalForwardedProps: remainingProps,
      classNames: classes.input,
      sx: styles.input,
      additionalProps: {
        as,
        name,
        onChange,
        onClick,
        onKeyUp,
        ref: mergedRefs,
        ...inputAriaProps,
      },
    })

    const iconProps = useSlotProps({
      ownerState,
      externalSlotProps: slotProps?.icon,
      sx: styles.icon,
      classNames: classes.icon,
      additionalProps: iconAriaProps,
    })

    const labelProps = useSlotProps({
      ownerState,
      externalSlotProps: slotProps?.label,
      sx: styles.label,
      classNames: classes.label,
      additionalProps: labelAriaProps,
    })

    const customIcon = icon
      ? isFunction(icon)
        ? icon(ownerState)
        : icon
      : null

    const checkedIcon = customIcon ? (
      isValidElement(customIcon) ? (
        <Box
          as={customIcon.type}
          sx={styles.checkedIcon}
          key={customIcon.key}
          {...customIcon.props}
        />
      ) : (
        customIcon
      )
    ) : (
      <CheckedIcon checked={checked} />
    )

    return (
      <nex.label {...rootProps}>
        <nex.input {...inputProps} />
        <nex.span {...iconProps}>{checkedIcon}</nex.span>
        {children && <nex.span {...labelProps}>{children}</nex.span>}
      </nex.label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
