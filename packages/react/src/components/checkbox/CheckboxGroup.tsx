'use client'

import { useMemo } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { CheckboxGroupProvider } from './CheckboxGroupContext'
import {
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  useStyles,
  useSlot,
} from '../utils'
import { useNexUI } from '../provider'
import { checkboxGroupRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type {
  CheckboxGroupContextValue,
  CheckboxGroupProps,
  CheckboxGroupValueType,
  CheckboxGroupOwnerState,
} from './types'

const useSlotClasses = <T extends number | string>(
  ownerState: CheckboxGroupOwnerState<T>,
) => {
  const { prefix } = useNexUI()

  const { orientation } = ownerState

  return useMemo(() => {
    const dividerRoot = `${prefix}-checkbox-group`

    const slots = {
      root: ['root', orientation],
    }

    return composeClasses(slots, getUtilityClass(dividerRoot))
  }, [prefix, orientation])
}

export const CheckboxGroup = <
  T extends CheckboxGroupValueType = CheckboxGroupValueType,
  CheckboxGroupComponent extends ElementType = 'div',
>(
  inProps: CheckboxGroupProps<T, CheckboxGroupComponent>,
) => {
  const props = useDefaultProps<CheckboxGroupProps<T>>({
    name: 'CheckboxGroup',
    props: inProps,
  })

  const {
    name,
    children,
    disabled,
    onValueChange,
    size,
    color,
    radius,
    value,
    role = 'group',
    orientation = 'horizontal',
    defaultValue = [],
    ...remainingProps
  } = props

  const [values, setValues] = useControlledState<T[]>(
    value,
    defaultValue,
    onValueChange,
  )

  const ownerState: CheckboxGroupOwnerState<T> = {
    ...props,
    orientation,
    value: values,
  }

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({
    name: 'CheckboxGroup',
    ownerState,
    recipe: checkboxGroupRecipe,
  })

  const [CheckboxGroupRoot, getCheckboxGroupRootProps] = useSlot({
    ownerState,
    elementType: 'div',
    style: styles,
    classNames: classes.root,
    externalForwardedProps: remainingProps,
    a11y: {
      role,
    },
  })

  const ctx: CheckboxGroupContextValue<T> = useMemo(
    () => ({
      disabled,
      name,
      size,
      color,
      radius,
      toggleValue: (value: T) => {
        // istanbul ignore next
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
    <CheckboxGroupRoot {...getCheckboxGroupRootProps()}>
      <CheckboxGroupProvider value={ctx as CheckboxGroupContextValue}>
        {children}
      </CheckboxGroupProvider>
    </CheckboxGroupRoot>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'
