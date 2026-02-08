'use client'

import { useControlledState } from '@nex-ui/hooks'
import { __DEV__, addEventListener } from '@nex-ui/utils'
import { useId, useEffect, useMemo, useRef } from 'react'
import { useNexUI } from '../provider'
import { InputBase } from '../inputBase'
import { useRadioGroupContext } from './RadioGroupContext'
import { useDefaultProps, useSlot, useStyles, useSlotClasses } from '../utils'
import { radioRecipe } from '../../theme/recipes'
import { RovingFocusItem } from '../rovingFocus'
import type { ElementType, FocusEvent } from 'react'
import type { RadioOwnerState, RadioProps } from './types'

const slots = ['root', 'input', 'dot', 'label']

export const Radio = <InputComponent extends ElementType = 'input'>(
  inProps: RadioProps<InputComponent>,
) => {
  const props = useDefaultProps<RadioProps>({
    name: 'Radio',
    props: inProps,
  })

  const groupCtx = useRadioGroupContext()

  const inGroup = !!groupCtx

  const { primaryThemeColor } = useNexUI()

  const {
    children,
    value,
    onCheckedChange,
    sx,
    className,
    classNames,
    slotProps,
    disableAnimation = groupCtx?.disableAnimation ?? false,
    checked: checkedProp,
    as = 'input',
    type = 'radio',
    disabled = groupCtx?.disabled ?? false,
    name = groupCtx?.name,
    size = groupCtx?.size ?? 'md',
    defaultChecked = false,
    color = groupCtx?.color ?? primaryThemeColor,
    ...remainingProps
  } = props

  if (__DEV__ && inGroup) {
    if ('checked' in props) {
      console.warn(
        '[Nex UI] Radio: The RadioGroup is being used, `checked` will be ignored. Use the `value` of the RadioGroup instead.',
      )
    }

    if ('defaultChecked' in props) {
      console.warn(
        '[Nex UI] Radio: The RadioGroup is being used, `defaultChecked` will be ignored. Use the `defaultValue` of the RadioGroup instead.',
      )
    }

    if (!('value' in props)) {
      console.error(
        '[Nex UI] Radio: The `value` prop is required when using Radio inside a RadioGroup',
      )
    }
  }

  const [rawChecked, setRawChecked] = useControlledState(
    checkedProp,
    defaultChecked,
    onCheckedChange,
  )
  const arrowKeyPressedRef = useRef(false)

  const checked = inGroup ? groupCtx.isChecked(value) : rawChecked

  const ownerState: RadioOwnerState = {
    ...props,
    as,
    inGroup,
    disabled,
    type,
    name,
    color,
    size,
    checked,
    defaultChecked,
    disableAnimation,
  }

  const styles = useStyles({
    name: 'Radio',
    recipe: radioRecipe,
    ownerState,
  })

  const slotClasses = useSlotClasses({
    name: 'Radio',
    slots,
    classNames,
  })

  const ariaId = useId()

  const slotAriaProps = useMemo(() => {
    const hasLabel = !!children
    const stringChildren = typeof children === 'string'
    const labelId = hasLabel ? `radio-${ariaId}-label` : undefined

    return {
      input: {
        'aria-label': stringChildren ? children : undefined,
        'aria-labelledby': labelId,
        role: as !== 'input' && type === 'radio' ? 'radio' : undefined,
      },
      label: {
        id: labelId,
      },
    }
  }, [children, as, type, ariaId])

  const handleChange = (newChecked: boolean) => {
    if (inGroup && value !== undefined) {
      groupCtx.setValue(value)
    }

    if (!inGroup) {
      setRawChecked(newChecked)
    }
  }

  const [RadioRoot, getRadioRootProps] = useSlot({
    elementType: 'label',
    style: styles.root,
    externalSlotProps: slotProps?.root,
    classNames: slotClasses.root,
    additionalProps: {
      sx,
      className,
    },
    dataAttrs: {
      color,
      size,
      checked,
      disabled,
      disableAnimation,
    },
  })

  const [RadioInput, getRadioInputProps] = useSlot({
    elementType: InputBase,
    externalForwardedProps: remainingProps,
    style: styles.input,
    classNames: slotClasses.input,
    ariaProps: slotAriaProps.input,
    shouldForwardComponent: false,
    additionalProps: {
      as,
      disabled,
      type,
      name,
      checked,
      value,
      onCheckedChange: handleChange,
      onFocus: (event: FocusEvent<HTMLInputElement>) => {
        /**
         * Our `RovingFocusGroup` will focus the radio when navigating with arrow keys
         * and we need to "check" it in that case. We click it to "check" it (instead
         * of updating `context.value`) so that the radio change event fires.
         */
        if (arrowKeyPressedRef.current) {
          event.currentTarget.click()
        }
      },
    },
  })

  const [RadioLabel, getRadioLabelProps] = useSlot({
    elementType: 'span',
    style: styles.label,
    externalSlotProps: slotProps?.label,
    classNames: slotClasses.label,
    ariaProps: slotAriaProps.label,
  })

  const [RadioDot, getRadioDotProps] = useSlot({
    elementType: 'span',
    externalSlotProps: slotProps?.dot,
    style: styles.dot,
    classNames: slotClasses.dot,
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ) {
        arrowKeyPressedRef.current = true
      }
    }
    const handleKeyUp = () => (arrowKeyPressedRef.current = false)
    const removeKeyDownListener = addEventListener(
      document,
      'keydown',
      handleKeyDown,
      {
        capture: true,
      },
    )
    const removeKeyUpListener = addEventListener(
      document,
      'keyup',
      handleKeyUp,
      {
        capture: true,
      },
    )
    return () => {
      removeKeyDownListener()
      removeKeyUpListener()
    }
  }, [])

  return (
    <RadioRoot {...getRadioRootProps()}>
      <RovingFocusItem
        focusable={!disabled}
        id={value}
        active={inGroup ? checked : true}
      >
        <RadioInput {...getRadioInputProps()} />
      </RovingFocusItem>
      <RadioDot {...getRadioDotProps()} />
      {children && (
        <RadioLabel {...getRadioLabelProps()}>{children}</RadioLabel>
      )}
    </RadioRoot>
  )
}

Radio.displayName = 'Radio'
