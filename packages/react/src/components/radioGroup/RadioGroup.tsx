'use client'

import { useId, useMemo, useRef } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { useDefaultProps, useSlot, useSlotClasses, useStyles } from '../utils'
import { radioGroupRecipe } from '../../theme/recipes'
import { RadioGroupProvider } from './RadioGroupContext'
import type { ElementType, KeyboardEvent } from 'react'
import type { RadioGroupProps, RadioState } from './types'
import type { RadioGroupContextValue } from './RadioGroupContext'

const slots = ['root', 'label', 'wrapper']

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

  const styles = useStyles({
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

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowDown':
      case 'ArrowRight':
        e.stopPropagation()
        e.preventDefault()
        break
    }
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
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

    const { value } = radioGroupStateRef.current[nextIndex]

    if (value !== undefined) {
      nextElement.focus()
      setValue(value)
    }
  }

  const [RadioGroupRoot, getRadioGroupRootProps] = useSlot({
    elementType: 'div',
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
    style: styles.root,
    additionalProps: {
      ref: rootRef,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
    },
    ariaProps: slotAriaProps.root,
    dataAttrs: {
      orientation,
    },
  })

  const [RadioGroupLabel, getRadioGroupLabelProps] = useSlot({
    elementType: 'h3',
    style: styles.label,
    classNames: slotClasses.label,
    externalSlotProps: slotProps?.label,
    ariaProps: slotAriaProps.label,
  })

  const [RadioGroupWrapper, getRadioGroupWrapperProps] = useSlot({
    elementType: 'div',
    style: styles.wrapper,
    classNames: slotClasses.wrapper,
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
      disableAnimation,
    }
  }, [size, color, disabled, name, setValue, disableAnimation, value])

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
