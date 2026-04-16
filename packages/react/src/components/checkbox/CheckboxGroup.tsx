'use client'

import { nex } from '@nex-ui/styled'
import { useMemo, useId } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { CheckboxGroupProvider } from './CheckboxGroupContext'
import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { checkboxGroupRecipe } from '../../themes/recipes'
import type { ElementType } from 'react'
import type { CheckboxGroupProps } from './types'
import type { CheckboxGroupContextValue } from './CheckboxGroupContext'

const slots = ['root', 'label', 'wrapper'] as const

export function CheckboxGroup<
  T extends number | string = string,
  CheckboxGroupComponent extends ElementType = 'div',
>(inProps: CheckboxGroupProps<T, CheckboxGroupComponent>) {
  const props = useDefaultProps<CheckboxGroupProps>({
    name: 'CheckboxGroup',
    props: inProps,
  })

  const {
    name,
    children,
    disabled,
    slotProps,
    onValueChange,
    color,
    radius,
    value,
    label,
    size,
    classNames,
    disableAnimation,
    orientation = 'horizontal',
    defaultValue = [],
    ...remainingProps
  } = props

  const [values, setValues] = useControlledState(
    value,
    defaultValue,
    onValueChange,
  )

  const ownerState: CheckboxGroupProps = {
    ...props,
    orientation,
    value: values,
  }

  const slotClasses = useSlotClasses({
    name: 'CheckboxGroup',
    slots,
    classNames,
  })

  const ariaId = useId()

  const slotAriaProps = useMemo(() => {
    const labelId = label ? `checkbox-group-${ariaId}-label` : undefined
    return {
      root: {
        role: 'group',
        'aria-labelledby': labelId,
      },
      label: {
        id: labelId,
      },
    }
  }, [label, ariaId])

  const styles = useRecipeStyles({
    name: 'CheckboxGroup',
    ownerState,
    recipe: checkboxGroupRecipe,
  })

  const [CheckboxGroupRoot, getCheckboxGroupRootProps] = useSlot({
    component: nex.div,
    style: styles.root,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
    ariaProps: slotAriaProps.root,
    dataAttrs: {
      orientation,
    },
  })

  const [CheckboxGroupLabel, getCheckboxGroupLabelProps] = useSlot({
    component: nex.h3,
    classNames: slotClasses.label,
    style: styles.label,
    externalSlotProps: slotProps?.label,
    ariaProps: slotAriaProps.label,
  })

  const [CheckboxGroupWrapper, getCheckboxGroupWrapperProps] = useSlot({
    component: nex.div,
    classNames: slotClasses.wrapper,
    style: styles.wrapper,
    externalSlotProps: slotProps?.wrapper,
  })

  const ctx = useMemo<CheckboxGroupContextValue>(
    () => ({
      disabled,
      name,
      size,
      color,
      radius,
      disableAnimation,
      toggleValue: (value: string) => {
        if (disabled) {
          return
        }
        let newValues: string[]
        if (values.includes(value)) {
          newValues = values.filter((existingValue) => existingValue !== value)
        } else {
          newValues = [...values, value]
        }

        setValues(newValues)
      },
      isChecked: (value?: string) => {
        return value !== undefined ? values.includes(value) : false
      },
    }),
    [disableAnimation, color, disabled, name, radius, setValues, size, values],
  )

  return (
    <CheckboxGroupRoot {...getCheckboxGroupRootProps()}>
      {label ? (
        <CheckboxGroupLabel {...getCheckboxGroupLabelProps()}>
          {label}
        </CheckboxGroupLabel>
      ) : null}
      <CheckboxGroupWrapper {...getCheckboxGroupWrapperProps()}>
        <CheckboxGroupProvider value={ctx}>{children}</CheckboxGroupProvider>
      </CheckboxGroupWrapper>
    </CheckboxGroupRoot>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'
