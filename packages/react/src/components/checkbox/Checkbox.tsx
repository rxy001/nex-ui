'use client'

import { nex } from '@nex-ui/styled'
import { isValidElement, useId, useRef } from 'react'
import { isFunction, __DEV__, isString, mergeRefs } from '@nex-ui/utils'
import { useControlledState, useEvent, useFocusVisible } from '@nex-ui/hooks'
import type {
  ElementType,
  ChangeEvent,
  HTMLAttributes,
  KeyboardEvent,
  InputHTMLAttributes,
} from 'react'
import { checkboxRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { useCheckboxGroup } from './CheckboxGroupContext'
import {
  useDefaultProps,
  useStyles,
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

const useSlotAriaProps = (
  ownerState: CheckboxOwnerState,
): Record<'input' | 'label', HTMLAttributes<HTMLElement>> => {
  const id = useId()
  const { as, disabled, tabIndex, type, checked, children, value } = ownerState

  const childrenString = isString(children)

  let input: InputHTMLAttributes<HTMLInputElement> = {
    disabled,
    checked,
    type,
    tabIndex: disabled ? -1 : tabIndex,
  }

  if (as === 'input') {
    input = {
      ...input,
      value,
      'aria-labelledby': childrenString ? id : undefined,
      'aria-label': childrenString ? children : undefined,
    }
  } else {
    input = {
      role: 'checkbox',
      tabIndex: disabled ? -1 : tabIndex,
      'aria-checked': checked,
      'aria-disabled': disabled || undefined,
      'aria-labelledby': childrenString ? id : undefined,
      'aria-label': childrenString ? children : undefined,
    }
  }

  const label = {
    id: childrenString ? id : undefined,
  }

  return { input, label }
}

export const Checkbox = <CheckboxComponent extends ElementType = 'input'>(
  inProps: CheckboxProps<CheckboxComponent>,
) => {
  const { primaryColor } = useNexUI()
  const inputRef = useRef<HTMLInputElement>(null)

  const props = useDefaultProps<CheckboxProps>({
    name: 'Checkbox',
    props: inProps,
  })

  const groupCtx = useCheckboxGroup()

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
    ref,
    icon,
    value,
    className,
    children,
    slotProps,
    onCheckedChange,
    checked: checkedProp,
    type = 'checkbox',
    defaultChecked = false,
    as = 'input',
    tabIndex = 0,
    name = groupCtx?.name,
    color = groupCtx?.color ?? primaryColor,
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

  const [focusVisible] = useFocusVisible({ ref: inputRef })

  const checked = inGroup ? groupCtx.isChecked(value) : rawChecked

  const ownerState: CheckboxOwnerState = {
    ...props,
    defaultChecked,
    type,
    tabIndex,
    name,
    disabled,
    color,
    checked,
    size,
    radius,
    as,
    inGroup,
  }

  const handleChange = useEvent((event: ChangeEvent<HTMLInputElement>) => {
    if (inGroup && value) {
      groupCtx.toggleValue(value)
    }

    if (!inGroup) {
      setRawChecked(event.target.checked)
    }
  })

  const handleClick = useEvent(() => {
    if (isString(as) && as !== 'input') {
      if (inGroup && value) {
        groupCtx.toggleValue(value)
      }

      if (!inGroup) {
        setRawChecked(!checked)
      }
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
    name: 'Checkbox',
    ownerState,
    recipe: checkboxRecipe,
  })

  const slotAriaProps = useSlotAriaProps(ownerState)

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
    externalForwardedProps: remainingProps,
    classNames: classes.input,
    sx: styles.input,
    additionalProps: {
      as,
      name,
      onChange: handleChange,
      onClick: handleClick,
      onKeyUp: handleKeyUp,
      ref: mergedRefs,
      ...slotAriaProps.input,
    },
  })

  const iconProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.icon,
    sx: styles.icon,
    classNames: classes.icon,
  })

  const labelProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.label,
    sx: styles.label,
    classNames: classes.label,
    additionalProps: slotAriaProps.label,
  })

  const customIcon = icon ? (isFunction(icon) ? icon(ownerState) : icon) : null

  const checkedIcon = customIcon ? (
    isValidElement(customIcon) ? (
      <Box
        // @ts-ignore
        as={customIcon.type}
        sx={styles.checkedIcon}
        key={customIcon.key}
        {...(customIcon.props ?? {})}
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
}

Checkbox.displayName = 'Checkbox'
