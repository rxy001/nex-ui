'use client'

import { nex } from '@nex-ui/styled'
import { cloneElement, isValidElement, useId, useMemo } from 'react'
import { __DEV__, isFunction, isString } from '@nex-ui/utils'
import { useControlledState } from '@nex-ui/hooks'
import { checkboxRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { useCheckboxGroupContext } from './CheckboxGroupContext'
import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { InputBase } from '../inputBase'
import { CheckedIcon } from './CheckedIcon'
import { IndeterminateIcon } from './IndeterminateIcon'
import type { CSSObject } from '@emotion/react'
import type { CheckboxOwnerState, CheckboxProps } from './types'
import type { ElementType, ReactElement } from 'react'

const slots = ['root', 'input', 'label', 'icon'] as const

export function Checkbox<CheckboxComponent extends ElementType = 'input'>(
  inProps: CheckboxProps<CheckboxComponent>,
) {
  const { primaryThemeColor, css } = useNexUI()

  const props = useDefaultProps<CheckboxProps>({
    name: 'Checkbox',
    props: inProps,
  })

  const groupCtx = useCheckboxGroupContext()

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
    disableAnimation = groupCtx?.disableAnimation ?? false,
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
    disableAnimation,
  }

  const handleChange = (newChecked: boolean) => {
    if (inGroup && value !== undefined) {
      groupCtx.toggleValue(value)
    }

    if (!inGroup) {
      setRawChecked(newChecked)
    }
  }

  const slotClasses = useSlotClasses({
    name: 'Checkbox',
    slots,
    classNames,
  })

  const styles = useRecipeStyles({
    ownerState,
    name: 'Checkbox',
    recipe: checkboxRecipe,
  })

  const ariaId = useId()

  const slotAriaProps = useMemo(() => {
    const stringChildren = isString(children)
    const hasLabel = !!children
    const labelId = hasLabel ? `checkbox-${ariaId}-label` : undefined

    return {
      input: {
        'aria-labelledby': labelId,
        'aria-label': stringChildren ? children : undefined,
      },
      label: {
        id: labelId,
      },
    }
  }, [children, ariaId])

  const [CheckboxRoot, getCheckboxRootProps] = useSlot({
    component: nex.label,
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
      disableAnimation,
    },
  })

  const [CheckboxInput, getCheckboxInputProps] = useSlot({
    component: InputBase,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.input,
    style: styles.input,
    ariaProps: slotAriaProps.input,
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
    component: nex.span,
    externalSlotProps: slotProps?.icon,
    style: styles.icon,
    classNames: slotClasses.icon,
  })

  const [CheckboxLabel, getCheckboxLabelProps] = useSlot({
    component: nex.span,
    externalSlotProps: slotProps?.label,
    style: styles.label,
    classNames: slotClasses.label,
    ariaProps: slotAriaProps.label,
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
      return (
        <CheckedIcon checked={checked} disableAnimation={disableAnimation} />
      )
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
