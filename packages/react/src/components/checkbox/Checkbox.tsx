'use client'

import { cloneElement, isValidElement, useId, useMemo } from 'react'
import { isFunction, __DEV__, isString } from '@nex-ui/utils'
import { useControlledState, useEvent, useFocusRing } from '@nex-ui/hooks'
import { checkboxRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { useCheckboxGroup } from './CheckboxGroupContext'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { CheckedIcon } from './CheckedIcon'
import { IndeterminateIcon } from './IndeterminateIcon'
import type { CSSObject } from '@emotion/react'
import type { CheckboxOwnerState, CheckboxProps } from './types'
import type {
  ElementType,
  ChangeEvent,
  HTMLAttributes,
  KeyboardEvent,
  InputHTMLAttributes,
  MouseEvent,
  ReactElement,
} from 'react'

const useSlotClasses = (ownerState: CheckboxOwnerState) => {
  const { prefix } = useNexUI()

  const { radius, size, color, disabled, checked, classes, indeterminate } =
    ownerState

  return useMemo(() => {
    const checkboxRoot = `${prefix}-checkbox`

    const slots = {
      root: [
        'root',
        `radius-${radius}`,
        `size-${size}`,
        `color-${color}`,
        disabled && 'disabled',
        checked && 'checked',
        indeterminate && 'indeterminate',
      ],
      input: ['input'],
      label: ['label'],
      icon: ['icon'],
    }

    return composeClasses(slots, getUtilityClass(checkboxRoot), classes)
  }, [checked, classes, color, disabled, indeterminate, prefix, radius, size])
}

const useSlotAriaProps = (
  ownerState: CheckboxOwnerState,
): Record<'input' | 'label', HTMLAttributes<HTMLElement>> => {
  const {
    disabled,
    type,
    checked,
    children,
    value,
    name,
    role,
    slotProps,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-checked': ariaChecked,
    'aria-disabled': ariaDisabled,
    as = 'input',
    tabIndex = 0,
  } = ownerState

  const labelId = useId()

  return useMemo(() => {
    const labelProps = slotProps?.label
    const stringChildren = isString(children)

    const label = {
      id: labelProps?.id ?? (stringChildren ? labelId : undefined),
    }

    let input: InputHTMLAttributes<HTMLInputElement> = {
      'aria-labelledby': ariaLabelledBy ?? label.id,
      'aria-label': ariaLabel ?? (stringChildren ? children : undefined),
      tabIndex: disabled ? -1 : tabIndex,
    }

    if (as === 'input' || isFunction(as)) {
      input = {
        disabled,
        checked,
        role,
        type,
        value,
        name,
        ...input,
      }
    } else {
      input = {
        role: role ?? 'checkbox',
        'aria-checked': ariaChecked ?? checked,
        'aria-disabled': ariaDisabled ?? (disabled || undefined),
        ...input,
      }
    }

    return { input, label }
  }, [
    ariaChecked,
    ariaDisabled,
    ariaLabel,
    ariaLabelledBy,
    as,
    checked,
    children,
    disabled,
    labelId,
    name,
    role,
    slotProps?.label,
    tabIndex,
    type,
    value,
  ])
}

export const Checkbox = <CheckboxComponent extends ElementType = 'input'>(
  inProps: CheckboxProps<CheckboxComponent>,
) => {
  const { primaryThemeColor, css } = useNexUI()

  const props = useDefaultProps<CheckboxProps>({
    name: 'Checkbox',
    props: inProps,
  })

  const groupCtx = useCheckboxGroup()

  const inGroup = !!groupCtx

  if (__DEV__ && inGroup) {
    if ('checked' in props) {
      console.warn(
        '[Nex UI] Checkbox: The CheckboxGroup is being used, `checked` will be ignored. Use the `value` of the CheckboxGroup instead.',
      )
    }
    if ('defaultChecked' in props) {
      console.warn(
        '[Nex UI] Checkbox: The CheckboxGroup is being used, `defaultChecked` will be ignored. Use the `defaultValue` of the CheckboxGroup instead.',
      )
    }

    if (!('value' in props)) {
      console.error(
        '[Nex UI] Checkbox: The `value` prop is required when using Checkbox inside a CheckboxGroup.',
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
    onCheckedChange,
    indeterminate,
    checked: checkedProp,
    type = 'checkbox',
    defaultChecked = false,
    name = groupCtx?.name,
    color = groupCtx?.color ?? primaryThemeColor,
    disabled = groupCtx?.disabled ?? false,
    size = groupCtx?.size ?? 'md',
    radius = groupCtx?.radius ?? groupCtx?.size ?? size,
    ...remainingProps
  } = props

  const [rawChecked, setRawChecked] = useControlledState(
    checkedProp,
    defaultChecked,
    onCheckedChange,
  )

  const { focusVisible, focusProps } = useFocusRing()

  const checked = inGroup ? groupCtx.isChecked(value) : rawChecked

  const ownerState: CheckboxOwnerState = {
    ...props,
    defaultChecked,
    type,
    name,
    disabled,
    color,
    checked,
    size,
    radius,
    inGroup,
  }

  const handleChange = useEvent((event: ChangeEvent<HTMLInputElement>) => {
    if (inGroup && value !== undefined) {
      groupCtx.toggleValue(value)
    }

    if (!inGroup) {
      setRawChecked(event.target.checked)
    }
  })

  const handleClick = useEvent((event: MouseEvent<HTMLInputElement>) => {
    if (
      event.currentTarget.tagName !== 'INPUT' &&
      event.currentTarget === event.target
    ) {
      if (inGroup && value !== undefined) {
        groupCtx.toggleValue(value)
      }

      if (!inGroup) {
        setRawChecked(!checked)
      }
    }
  })

  const handleKeyUp = useEvent((event: KeyboardEvent<HTMLInputElement>) => {
    // Keyboard accessibility for non interactive elements
    if (
      focusVisible &&
      event.key === ' ' &&
      event.target === event.currentTarget &&
      event.currentTarget.tagName !== 'INPUT'
    ) {
      event.currentTarget.click()
    }
  })

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({
    ownerState,
    name: 'Checkbox',
    recipe: checkboxRecipe,
  })

  const slotAriaProps = useSlotAriaProps(ownerState)

  const [CheckboxRoot, getCheckboxRootProps] = useSlot({
    ownerState,
    elementType: 'label',
    externalSlotProps: slotProps?.root,
    style: styles.root,
    classNames: classes.root,
    additionalProps: {
      sx,
      className,
    },
  })

  const [CheckboxInput, getCheckboxInputProps] = useSlot({
    ownerState,
    elementType: 'input',
    externalForwardedProps: remainingProps,
    classNames: classes.input,
    style: styles.input,
    a11y: slotAriaProps.input,
    additionalProps: {
      onChange: handleChange,
      onClick: handleClick,
      onKeyUp: handleKeyUp,
      'data-focus-visible': focusVisible || undefined,
      ...focusProps,
    },
  })

  const [CheckboxIcon, getCheckboxIconProps] = useSlot({
    ownerState,
    elementType: 'span',
    externalSlotProps: slotProps?.icon,
    style: styles.icon,
    classNames: classes.icon,
  })

  const [CheckboxLabel, getCheckboxLabelProps] = useSlot({
    ownerState,
    elementType: 'span',
    externalSlotProps: slotProps?.label,
    style: styles.label,
    classNames: classes.label,
    a11y: slotAriaProps.label,
  })

  const renderCheckedIcon = () => {
    if (indeterminate) {
      return <IndeterminateIcon />
    }

    const customIcon = icon
      ? isFunction(icon)
        ? icon(ownerState)
        : icon
      : null

    if (!customIcon) {
      return <CheckedIcon checked={checked} />
    }

    if (isValidElement(customIcon)) {
      const element = customIcon as ReactElement<any>

      return cloneElement(element, {
        ...element.props,
        style: {
          ...element.props.style,
          ...(css(styles.checkedIcon) as CSSObject),
        },
      })
    }
    return customIcon
  }

  return (
    <CheckboxRoot {...getCheckboxRootProps()}>
      <CheckboxInput {...getCheckboxInputProps()} />
      <CheckboxIcon {...getCheckboxIconProps()}>
        {renderCheckedIcon()}
      </CheckboxIcon>
      {children && (
        <CheckboxLabel {...getCheckboxLabelProps()}>{children}</CheckboxLabel>
      )}
    </CheckboxRoot>
  )
}

Checkbox.displayName = 'Checkbox'
