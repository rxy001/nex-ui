'use client'

import { useMemo, useRef } from 'react'
import { useControlledState, useEvent } from '@nex-ui/hooks'
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
  RadioValueType,
  RadioGroupProps,
  RadioGroupOwnerState,
  RadioGroupContextValue,
  RadioState,
} from './types'

const useSlotClasses = (ownerState: RadioGroupOwnerState) => {
  const { prefix } = useNexUI()
  const { orientation } = ownerState

  return useMemo(() => {
    const dividerRoot = `${prefix}-radio-group`

    const slots = {
      root: ['root', orientation],
    }

    return composeClasses(slots, getUtilityClass(dividerRoot))
  }, [prefix, orientation])
}

export const RadioGroup = <
  T extends RadioValueType = RadioValueType,
  RootComponent extends ElementType = 'div',
>(
  inProps: RadioGroupProps<T, RootComponent>,
) => {
  const props = useDefaultProps<RadioGroupProps>({
    name: 'RadioGroup',
    props: inProps,
  })

  const rootRef = useRef<HTMLDivElement>(null)

  // The DOM API casts value to a string, so need to record the original value.
  const RadioGroupStateRef = useRef<RadioState[]>([])

  RadioGroupStateRef.current = []

  const {
    color,
    size,
    disabled,
    name,
    defaultValue,
    onValueChange,
    children,
    value: valueProp,
    orientation = 'horizontal',
    role = 'radiogroup',
    ...remainingProps
  } = props

  const [value, setValue] = useControlledState(
    valueProp,
    defaultValue,
    onValueChange,
  )

  const ownerState: RadioGroupOwnerState = {
    ...props,
    role,
    orientation,
    value,
  }

  const style = useStyles({
    name: 'RadioGroup',
    recipe: radioGroupRecipe,
    ownerState,
  })

  const classes = useSlotClasses(ownerState)

  const handleKeydown = useEvent((e: KeyboardEvent<HTMLDivElement>) => {
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

      default:
        nextDirection = null
    }

    if (!nextDirection) return

    e.preventDefault()

    const rootElement = rootRef.current

    const radioNodes = Array.from(
      rootElement!.querySelectorAll<HTMLElement>(
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

      const currentRadioState = RadioGroupStateRef.current[nextIndex]
      if (!currentRadioState.disabled) {
        nextElement = element
      }
    }

    const value = RadioGroupStateRef.current[nextIndex].value
    if (value) {
      nextElement.focus()
      setValue(value)
    }
  })

  const [RadioGroupRoot, getRadioGroupRootProps] = useSlot({
    ownerState,
    elementType: 'div',
    classNames: classes.root,
    externalForwardedProps: remainingProps,
    style,
    additionalProps: {
      ref: rootRef,
      onKeyDown: handleKeydown,
    },
    a11y: {
      role,
    },
  })

  const ctx = useMemo<RadioGroupContextValue>(
    () => ({
      setValue,
      size,
      color,
      disabled,
      name,
      isChecked: (v?: RadioValueType) => v === value,
      isNullValue: () => value === undefined,
      setGroupState: (state: RadioState) => {
        RadioGroupStateRef.current.push(state)
      },
    }),
    [setValue, size, color, disabled, name, value],
  )

  return (
    <RadioGroupRoot {...getRadioGroupRootProps()}>
      <RadioGroupProvider value={ctx}>{children}</RadioGroupProvider>
    </RadioGroupRoot>
  )
}

RadioGroup.displayName = 'RadioGroup'
