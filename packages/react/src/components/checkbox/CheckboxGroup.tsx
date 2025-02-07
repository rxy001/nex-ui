'use client'

import { useState } from 'react'
import { CheckboxGroupProvider } from './CheckboxGroupContext'
import type {
  CheckboxGroupContext,
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
    defaultValue,
    onChange,
    children,
    disabled,
    size,
    color,
    radius,
    value: valueProp,
  } = props

  const [values, setValues] = useState<T[]>(valueProp ?? defaultValue ?? [])

  if (valueProp !== undefined && valueProp !== values) {
    setValues(valueProp)
  }

  const ctx: CheckboxGroupContext<T> = {
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

      if (valueProp === undefined) {
        setValues(newValues)
      }

      onChange?.(newValues)
    },
    isChecked: (value?: T) => {
      return value ? values.includes(value) : false
    },
  }

  // @ts-ignore
  return <CheckboxGroupProvider value={ctx}>{children}</CheckboxGroupProvider>
}
