'use client'

import { useId, useMemo, useRef } from 'react'
import { useControlledState, useEvent } from '@nex-ui/hooks'
import { isString } from '@nex-ui/utils'
import { useNexUI } from '../provider'
import {
  useDefaultProps,
  useSlot,
  composeClasses,
  getUtilityClass,
  useStyles,
} from '../utils'
import { radioGroupRecipe } from '../../theme/recipes'
import { RadioGroupProvider } from './RadioGroupContext'
import type { ElementType, KeyboardEvent } from 'react'
import type {
  RadioGroupProps,
  RadioGroupContextValue,
  RadioState,
} from './types'

const useSlotClasses = (ownerState: RadioGroupProps) => {
  const { prefix } = useNexUI()
  const { orientation, classes } = ownerState

  return useMemo(() => {
    const radioGroupRoot = `${prefix}-radio-group`

    const slots = {
      root: ['root', `orientation-${orientation}`],
      label: ['label'],
      wrapper: ['wrapper'],
    }

    return composeClasses(slots, getUtilityClass(radioGroupRoot), classes)
  }, [prefix, orientation, classes])
}

const useSlotAriaProps = (ownerState: RadioGroupProps) => {
  const id = useId()

  const {
    slotProps,
    label,
    role = 'radiogroup',
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

export const RadioGroup = <
  T extends string | number = string | number,
  RootComponent extends ElementType = 'div',
>(
  inProps: RadioGroupProps<T, RootComponent>,
) => {
  const props = useDefaultProps<RadioGroupProps>({
    name: 'RadioGroup',
    props: inProps,
  })

  const rootRef = useRef<HTMLDivElement>(null)

  // Generate a unique name for the radio group to ensure that Tab moves to the correct position.
  const defaultName = useId()

  // The DOM API casts value to a string, so need to record the original value.
  const radioGroupStateRef = useRef<RadioState[]>([])

  radioGroupStateRef.current = []

  const {
    color,
    disabled,
    defaultValue,
    onValueChange,
    children,
    label,
    slotProps,
    role,
    size,
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
    role,
    orientation,
    value,
    name,
  }

  const styles = useStyles({
    name: 'RadioGroup',
    recipe: radioGroupRecipe,
    ownerState,
  })

  const classes = useSlotClasses(ownerState)

  const slotAriaProps = useSlotAriaProps(ownerState)

  const handleKeyDown = useEvent((e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowDown':
      case 'ArrowRight':
        e.stopPropagation()
        e.preventDefault()
        break
    }
  })

  const handleKeyUp = useEvent((e: KeyboardEvent<HTMLDivElement>) => {
    let nextDirection: 'next' | 'prev' | null = null
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        nextDirection = 'prev'
        break

      case 'ArrowDown':
      case 'ArrowRight':
        nextDirection = 'next'
        break
    }

    if (!nextDirection) return

    e.preventDefault()
    e.stopPropagation()

    const rootElement = rootRef.current

    // istanbul ignore if
    if (!rootElement) return

    const radioNodes = Array.from(
      rootElement.querySelectorAll<HTMLElement>(
        "input[type='radio'], [role='radio']",
      ),
    )

    let nextIndex = radioNodes.findIndex((node) => node === e.target)

    let nextElement = null
    while (!nextElement) {
      if (nextDirection === 'next') {
        nextIndex = (nextIndex + 1) % radioNodes.length
      } else {
        nextIndex = (nextIndex - 1 + radioNodes.length) % radioNodes.length
      }

      const element = radioNodes[nextIndex]

      if (element === e.target) {
        return
      }

      const currentRadioState = radioGroupStateRef.current[nextIndex]
      if (currentRadioState && !currentRadioState.disabled) {
        nextElement = element
      }
    }

    const value = radioGroupStateRef.current[nextIndex].value

    if (value !== undefined) {
      nextElement.focus()
      setValue(value)
    }
  })

  const [RadioGroupRoot, getRadioGroupRootProps] = useSlot({
    elementType: 'div',
    classNames: classes.root,
    externalForwardedProps: remainingProps,
    style: styles.root,
    additionalProps: {
      ref: rootRef,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
    },
    a11y: slotAriaProps.root,
  })

  const [RadioGroupLabel, getRadioGroupLabelProps] = useSlot({
    elementType: 'h3',
    style: styles.label,
    classNames: classes.label,
    externalSlotProps: slotProps?.label,
    a11y: slotAriaProps.label,
  })

  const [RadioGroupWrapper, getRadioGroupWrapperProps] = useSlot({
    elementType: 'div',
    style: styles.wrapper,
    classNames: classes.wrapper,
    externalSlotProps: slotProps?.wrapper,
  })

  const ctx = useMemo<RadioGroupContextValue>(() => {
    const isChecked = (v?: string | number) => {
      if (v === undefined) {
        return false
      }
      return v === value
    }

    const isTabbable = (v?: string | number) => {
      if (value === undefined) {
        const first = radioGroupStateRef.current.find(
          (state) => state.value !== undefined && !state.disabled,
        )

        return v === first?.value
      }
      return isChecked(v)
    }

    const setGroupState = (state: RadioState) => {
      if (radioGroupStateRef.current.some((s) => s === state)) return
      radioGroupStateRef.current.push(state)
    }

    return {
      size,
      color,
      disabled,
      name,
      setValue,
      isChecked,
      isTabbable,
      setGroupState,
    }
  }, [setValue, size, color, disabled, name, value])

  return (
    <RadioGroupRoot {...getRadioGroupRootProps()}>
      {label ? (
        <RadioGroupLabel {...getRadioGroupLabelProps()}>
          {label}
        </RadioGroupLabel>
      ) : null}
      <RadioGroupProvider value={ctx}>
        <RadioGroupWrapper {...getRadioGroupWrapperProps()}>
          {children}
        </RadioGroupWrapper>
      </RadioGroupProvider>
    </RadioGroupRoot>
  )
}

RadioGroup.displayName = 'RadioGroup'
