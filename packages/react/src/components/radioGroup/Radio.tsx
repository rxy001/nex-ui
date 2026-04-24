'use client'

import { nex } from '@nex-ui/styled'
import { useControlledState, useLatest, useUnmount } from '@nex-ui/hooks'
import { __DEV__, addEventListener } from '@nex-ui/utils'
import { useEffect, useId, useMemo, useRef } from 'react'
import { useNexUI } from '../provider'
import { InputBase } from '../inputBase'
import { useRadioGroupContext } from './RadioGroupContext'
import { CollectionItem } from './Collection'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { radioRecipe } from '../../themes/recipes'
import { CompositeItem } from '../composite'
import type { ElementType, FocusEvent } from 'react'
import type { RadioOwnerState, RadioProps } from './types'

const slots = ['root', 'input', 'indicator', 'label'] as const

const arrowKeys = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Home',
  'End',
]

export function Radio<
  T extends string | number = string,
  InputComponent extends ElementType = 'input',
>(inProps: RadioProps<T, InputComponent>) {
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

  const isArrowKeyPressed = useRef(false)

  const checked = inGroup ? groupCtx.isChecked(value) : rawChecked
  const checkedRef = useLatest(checked)

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

  const styles = useRecipeStyles({
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
    component: nex.label,
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
    component: InputBase,
    externalForwardedProps: remainingProps,
    style: styles.input,
    classNames: slotClasses.input,
    ariaProps: slotAriaProps.input,
    additionalProps: {
      as,
      disabled,
      type,
      name,
      checked,
      value,
      onCheckedChange: handleChange,
      onFocus: (event: FocusEvent<HTMLElement>) => {
        if (disabled) {
          event.preventDefault()
          event.stopPropagation()
          return
        }
        if (isArrowKeyPressed.current) {
          handleChange(true)
        }
      },
    },
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (arrowKeys.includes(event.key)) {
        isArrowKeyPressed.current = true
      }
    }
    const handleKeyUp = () => (isArrowKeyPressed.current = false)
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

  const [RadioLabel, getRadioLabelProps] = useSlot({
    component: nex.span,
    style: styles.label,
    externalSlotProps: slotProps?.label,
    classNames: slotClasses.label,
    ariaProps: slotAriaProps.label,
  })

  const [RadioIndicator, getRadioIndicatorProps] = useSlot({
    component: nex.span,
    externalSlotProps: slotProps?.indicator,
    style: styles.indicator,
    classNames: slotClasses.indicator,
  })

  useUnmount(() => {
    if (inGroup && checkedRef.current) {
      groupCtx.setValue('')
    }
  })

  return (
    <RadioRoot {...getRadioRootProps()}>
      {inGroup ? (
        <CollectionItem disabled={disabled} id={value ?? ariaId}>
          <CompositeItem disabled={disabled} id={value ?? ariaId}>
            <RadioInput {...getRadioInputProps()} />
          </CompositeItem>
        </CollectionItem>
      ) : (
        <RadioInput {...getRadioInputProps()} />
      )}
      <RadioIndicator {...getRadioIndicatorProps()} />
      {children && (
        <RadioLabel {...getRadioLabelProps()}>{children}</RadioLabel>
      )}
    </RadioRoot>
  )
}

Radio.displayName = 'Radio'
