'use client'

import { useMemo, useId } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { isString } from '@nex-ui/utils'
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
  CheckboxGroupOwnerState,
} from './types'

const useSlotClasses = (ownerState: CheckboxGroupOwnerState) => {
  const { prefix } = useNexUI()

  const { orientation, classes, size } = ownerState

  return useMemo(() => {
    const dividerRoot = `${prefix}-checkbox-group`

    const slots = {
      root: ['root', `orientation-${orientation}`, `size-${size}`],
      label: ['label'],
      wrapper: ['wrapper'],
    }

    return composeClasses(slots, getUtilityClass(dividerRoot), classes)
  }, [prefix, orientation, size, classes])
}

const useSlotAriaProps = (ownerState: CheckboxGroupOwnerState) => {
  const id = useId()

  const {
    slotProps,
    label,
    role = 'group',
    'aria-labelledby': labelledBy,
  } = ownerState
  const stringLabel = isString(label)

  const labelId = slotProps?.label?.id || (stringLabel ? id : undefined)

  return useMemo(
    () => ({
      root: {
        role,
        'aria-labelledby': labelledBy ?? labelId,
      },
      label: {
        id: labelId,
      },
    }),
    [role, labelledBy, labelId],
  )
}

export const CheckboxGroup = <
  T extends number | string = number | string,
  CheckboxGroupComponent extends ElementType = 'div',
>(
  inProps: CheckboxGroupProps<T, CheckboxGroupComponent>,
) => {
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
    size = 'md',
    orientation = 'horizontal',
    defaultValue = [],
    ...remainingProps
  } = props

  const [values, setValues] = useControlledState(
    value,
    defaultValue,
    onValueChange,
  )

  const ownerState: CheckboxGroupOwnerState = {
    ...props,
    orientation,
    size,
    value: values,
  }

  const classes = useSlotClasses(ownerState)

  const slotAriaProps = useSlotAriaProps(ownerState)

  const styles = useStyles({
    name: 'CheckboxGroup',
    ownerState,
    recipe: checkboxGroupRecipe,
  })

  const [CheckboxGroupRoot, getCheckboxGroupRootProps] = useSlot({
    ownerState,
    elementType: 'div',
    style: styles.root,
    classNames: classes.root,
    externalForwardedProps: remainingProps,
    a11y: slotAriaProps.root,
  })

  const [CheckboxGroupLabel, getCheckboxGroupLabelProps] = useSlot({
    ownerState,
    elementType: 'h3',
    classNames: classes.label,
    style: styles.label,
    externalSlotProps: slotProps?.label,
    a11y: slotAriaProps.label,
  })

  const [CheckboxGroupWrapper, getCheckboxGroupWrapperProps] = useSlot({
    ownerState,
    elementType: 'div',
    classNames: classes.wrapper,
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
      toggleValue: (value: number | string) => {
        // istanbul ignore next
        if (disabled) {
          return
        }
        let newValues: (number | string)[]
        if (values.includes(value)) {
          newValues = values.filter((existingValue) => existingValue !== value)
        } else {
          newValues = [...values, value]
        }

        setValues(newValues)
      },
      isChecked: (value?: number | string) => {
        return value !== undefined ? values.includes(value) : false
      },
    }),
    [color, disabled, name, radius, setValues, size, values],
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
