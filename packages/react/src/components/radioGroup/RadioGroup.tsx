'use client'

import { nex } from '@nex-ui/styled'
import { useCallback, useId, useMemo } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import {
  useDefaultProps,
  useSlot,
  useSlotClasses,
  useRecipeStyles,
} from '../utils'
import { radioGroupRecipe } from '../../themes/recipes'
import { RadioGroupProvider } from './RadioGroupContext'
import { RovingFocusGroup } from '../rovingFocus'
import type { ElementType } from 'react'
import type { RadioGroupProps } from './types'
import type { RadioGroupContextValue } from './RadioGroupContext'

const slots = ['root', 'label', 'wrapper'] as const

export function RadioGroup<
  T extends string | number = string | number,
  RootComponent extends ElementType = 'div',
>(inProps: RadioGroupProps<T, RootComponent>) {
  const props = useDefaultProps<RadioGroupProps>({
    name: 'RadioGroup',
    props: inProps,
  })

  // Generate a unique name for the radio group to ensure that Tab moves to the correct position.
  const defaultName = useId()

  const {
    color,
    disabled,
    defaultValue,
    onValueChange,
    children,
    label,
    slotProps,
    size,
    classNames,
    disableAnimation = false,
    value: valueProp,
    name = defaultName,
    orientation = 'horizontal',
    ...remainingProps
  } = props

  const [value, setValue] = useControlledState(
    valueProp,
    defaultValue,
    onValueChange,
  )

  const ownerState: RadioGroupProps = {
    ...props,
    orientation,
    value,
    name,
    disableAnimation,
  }

  const styles = useRecipeStyles({
    name: 'RadioGroup',
    recipe: radioGroupRecipe,
    ownerState,
  })

  const slotClasses = useSlotClasses({
    name: 'RadioGroup',
    slots,
    classNames,
  })

  const ariaId = useId()

  const slotAriaProps = useMemo(() => {
    const labelId = label ? `radio-group-${ariaId}-label` : undefined

    return {
      root: {
        role: 'radiogroup',
        'aria-labelledby': labelId,
      },
      label: {
        id: labelId,
      },
    }
  }, [ariaId, label])

  const [RadioGroupRoot, getRadioGroupRootProps] = useSlot({
    component: nex.div,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
    style: styles.root,
    ariaProps: slotAriaProps.root,
    dataAttrs: {
      orientation,
    },
  })

  const [RadioGroupLabel, getRadioGroupLabelProps] = useSlot({
    component: nex.h3,
    style: styles.label,
    classNames: slotClasses.label,
    externalSlotProps: slotProps?.label,
    ariaProps: slotAriaProps.label,
  })

  const [RadioGroupWrapper, getRadioGroupWrapperProps] = useSlot({
    component: nex.div,
    style: styles.wrapper,
    classNames: slotClasses.wrapper,
    externalSlotProps: slotProps?.wrapper,
  })

  const isChecked = useCallback(
    (v?: string | number) => {
      if (v === undefined) {
        return false
      }
      return v === value
    },
    [value],
  )

  const ctx = useMemo<RadioGroupContextValue>(() => {
    return {
      size,
      color,
      disabled,
      name,
      setValue,
      isChecked,
      disableAnimation,
    }
  }, [size, color, disabled, name, setValue, isChecked, disableAnimation])

  return (
    <RadioGroupRoot {...getRadioGroupRootProps()}>
      {label ? (
        <RadioGroupLabel {...getRadioGroupLabelProps()}>
          {label}
        </RadioGroupLabel>
      ) : null}
      <RadioGroupProvider value={ctx}>
        <RovingFocusGroup loop>
          <RadioGroupWrapper {...getRadioGroupWrapperProps()}>
            {children}
          </RadioGroupWrapper>
        </RovingFocusGroup>
      </RadioGroupProvider>
    </RadioGroupRoot>
  )
}

RadioGroup.displayName = 'RadioGroup'
