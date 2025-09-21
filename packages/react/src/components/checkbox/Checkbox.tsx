'use client'

import { cloneElement, isValidElement, useId, useMemo } from 'react'
import { isFunction, __DEV__, isString } from '@nex-ui/utils'
import { useControlledState, useEvent } from '@nex-ui/hooks'
import { checkboxRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { useCheckboxGroup } from './CheckboxGroupContext'
import { useDefaultProps, useStyles, useSlot, useSlotClasses } from '../utils'
import { InputBase } from '../inputBase'
import { CheckedIcon } from './CheckedIcon'
import { IndeterminateIcon } from './IndeterminateIcon'
import type { CSSObject } from '@emotion/react'
import type { CheckboxOwnerState, CheckboxProps } from './types'
import type { ElementType, HTMLAttributes, ReactElement } from 'react'

const slots = ['root', 'input', 'label', 'icon']

const useSlotAriaProps = (
  ownerState: CheckboxOwnerState,
): Record<'input' | 'label', HTMLAttributes<HTMLElement>> => {
  const {
    children,
    slotProps,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  } = ownerState

  const id = useId()

  return useMemo(() => {
    const labelProps = slotProps?.label
    const stringChildren = isString(children)
    const hasLabel = !!children
    const labelId = labelProps?.id ?? (hasLabel ? id : undefined)

    return {
      input: {
        'aria-labelledby': ariaLabelledBy ?? labelId,
        'aria-label': ariaLabel ?? (stringChildren ? children : undefined),
      },
      label: {
        id: labelId,
      },
    }
  }, [ariaLabel, ariaLabelledBy, children, id, slotProps?.label])
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
    classNames,
    children,
    slotProps,
    onCheckedChange,
    indeterminate = false,
    as = 'input',
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

  const checked = inGroup ? groupCtx.isChecked(value) : rawChecked

  const ownerState: CheckboxOwnerState = {
    ...props,
    as,
    defaultChecked,
    type,
    name,
    disabled,
    color,
    checked,
    size,
    radius,
    inGroup,
    indeterminate,
  }

  const handleChange = useEvent((newChecked: boolean) => {
    if (inGroup && value !== undefined) {
      groupCtx.toggleValue(value)
    }

    if (!inGroup) {
      setRawChecked(newChecked)
    }
  })

  const slotClasses = useSlotClasses({
    name: 'Checkbox',
    slots,
    classNames,
  })

  const styles = useStyles({
    ownerState,
    name: 'Checkbox',
    recipe: checkboxRecipe,
  })

  const slotAriaProps = useSlotAriaProps(ownerState)

  const [CheckboxRoot, getCheckboxRootProps] = useSlot({
    elementType: 'label',
    externalSlotProps: slotProps?.root,
    style: styles.root,
    classNames: slotClasses.root,
    additionalProps: {
      sx,
      className,
    },
    dataAttrs: {
      radius,
      size,
      color,
      disabled,
      checked,
      indeterminate,
      inGroup,
    },
  })

  const [CheckboxInput, getCheckboxInputProps] = useSlot({
    elementType: InputBase,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.input,
    style: styles.input,
    a11y: slotAriaProps.input,
    shouldForwardComponent: false,
    additionalProps: {
      as,
      type,
      name,
      disabled,
      checked,
      value,
      onCheckedChange: handleChange,
    },
  })

  const [CheckboxIcon, getCheckboxIconProps] = useSlot({
    elementType: 'span',
    externalSlotProps: slotProps?.icon,
    style: styles.icon,
    classNames: slotClasses.icon,
  })

  const [CheckboxLabel, getCheckboxLabelProps] = useSlot({
    elementType: 'span',
    externalSlotProps: slotProps?.label,
    style: styles.label,
    classNames: slotClasses.label,
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
