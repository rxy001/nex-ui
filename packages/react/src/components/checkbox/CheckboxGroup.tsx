'use client'

import { useMemo } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { CheckboxGroupProvider } from './CheckboxGroupContext'
import type {
  CheckboxGroupContextValue,
  CheckboxGroupProps,
  CheckboxGroupValueType,
} from './types'

export const CheckboxGroup = <
  T extends CheckboxGroupValueType = CheckboxGroupValueType,
>(
  props: CheckboxGroupProps<T>,
) => {
  const {
    name,
    onValueChange,
    children,
    disabled,
    size,
    color,
    radius,
    defaultValue = [],
    value: valueProp,
  } = props

  const [values, setValues] = useControlledState(
    valueProp,
    defaultValue,
    onValueChange,
  )

  const ctx: CheckboxGroupContextValue<T> = useMemo(
    () => ({
      disabled,
      name,
      size,
      color,
      radius,
      toggleValue: (value: T) => {
        if (disabled) {
          return
        }

        let newValues: T[]
        if (values.includes(value)) {
          newValues = values.filter((existingValue) => existingValue !== value)
        } else {
          newValues = [...values, value]
        }

        setValues(newValues)
      },
      isChecked: (value?: T) => {
        return value ? values.includes(value) : false
      },
    }),
    [color, disabled, name, radius, setValues, size, values],
  )

  return (
    <CheckboxGroupProvider value={ctx as CheckboxGroupContextValue}>
      {children}
    </CheckboxGroupProvider>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'
