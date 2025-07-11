'use client'

import { isValidElement, useId, useMemo } from 'react'
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
import { Box } from '../box'
import { IndeterminateIcon } from './IndeterminateIcon'
import type { CheckboxOwnerState, CheckboxProps } from './types'
import type {
  ElementType,
  ChangeEvent,
  HTMLAttributes,
  KeyboardEvent,
  InputHTMLAttributes,
  MouseEvent,
} from 'react'

const useSlotClasses = (ownerState: CheckboxOwnerState) => {
  const { prefix } = useNexUI()

  const { radius, size, color, disabled, checked, classes } = ownerState

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
      ],
      input: ['input'],
      label: ['label'],
      icon: ['icon'],
    }

    return composeClasses(slots, getUtilityClass(checkboxRoot), classes)
  }, [checked, classes, color, disabled, prefix, radius, size])
}

const useSlotAriaProps = (
  ownerState: CheckboxOwnerState,
): Record<'input' | 'label', HTMLAttributes<HTMLElement>> => {
  const {
    as,
    disabled,
    type,
    checked,
    children,
    value,
    role,
    slotProps,
    tabIndex = 0,
  } = ownerState

  const ariaLabel = ownerState['aria-label']
  const ariaLabelledby = ownerState['aria-labelledby']
  const ariaChecked = ownerState['aria-checked']
  const ariaDisabled = ownerState['aria-disabled']

  const id = useId()

  return useMemo(() => {
    const labelProps = slotProps?.label
    const stringChildren = isString(children)

    const label = {
      id: labelProps?.id ?? (stringChildren ? id : undefined),
    }

    let input: InputHTMLAttributes<HTMLInputElement> = {
      'aria-labelledby': ariaLabelledby ?? label.id,
      'aria-label': ariaLabel ?? (stringChildren ? children : undefined),
      tabIndex: disabled ? -1 : tabIndex,
    }

    if (!as || as === 'input' || isFunction(as)) {
      input = {
        disabled,
        checked,
        type,
        value,
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
    value,
  ])
}

export const Checkbox = <CheckboxComponent extends ElementType = 'input'>(
  inProps: CheckboxProps<CheckboxComponent>,
) => {
  const { primaryThemeColor } = useNexUI()

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
    if (inGroup && value) {
      groupCtx.toggleValue(value)
    }

    if (!inGroup) {
      setRawChecked(event.target.checked)
    }
  })

  const handleClick = useEvent((event: MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.tagName !== 'INPUT') {
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
    a11y: {
      ...slotAriaProps.input,
      onKeyUp: handleKeyUp,
    },
    additionalProps: {
      name,
      onChange: handleChange,
      onClick: handleClick,
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
    const customIcon = icon
      ? isFunction(icon)
        ? icon(ownerState)
        : icon
      : null

    if (customIcon) {
      return isValidElement(customIcon) ? (
        <Box
          as={customIcon.type as ElementType}
          sx={styles.checkedIcon}
          key={customIcon.key}
          {...(customIcon.props ?? {})}
        />
      ) : (
        customIcon
      )
    }

    if (indeterminate) {
      return <IndeterminateIcon />
    }

    return <CheckedIcon checked={checked} />
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
