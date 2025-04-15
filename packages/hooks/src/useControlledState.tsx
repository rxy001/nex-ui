'use client'

import { useState, useEffect, useRef } from 'react'
import { __DEV__, isFunction } from '@nex-ui/utils'
import { useEvent } from './useEvent'

export function useControlledState<T>(
  value: T | undefined,
  defaultValue: T | undefined,
  onChange?: (v: T) => void,
): [T, (v: T) => void]
export function useControlledState<T>(
  value: T,
  defaultValue: T | undefined,
  onChange?: (v: T) => void,
): [T, (v: T) => void]
export function useControlledState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (v: T) => void,
): [T, (v: T) => void]
export function useControlledState<T>(
  value: T,
  defaultValue: T,
  onChange?: (v: T) => void,
): [T, (v: T) => void] {
  const [state, setState] = useState(value ?? defaultValue)
  const controlled = value !== undefined
  const prevControlledRef = useRef(value !== undefined)

  useEffect(() => {
    const prevControlled = prevControlledRef.current
    if (__DEV__ && prevControlled !== controlled) {
      console.error(
        `Warning: A component changed from ${
          prevControlled ? 'controlled' : 'uncontrolled'
        } to ${controlled ? 'controlled' : 'uncontrolled'}.`,
      )
    }
    prevControlledRef.current = controlled
  }, [controlled])

  const setValue = useEvent((newValue: T) => {
    if (isFunction(newValue)) {
      console.error(
        "Warning: useControlledState doesn't support function updates, which can cause unexpected behavior. https://github.com/facebook/react/issues/18178#issuecomment-595846312",
      )
    }
    if (!controlled) {
      setState(newValue)
    }
    onChange?.(newValue)
  })

  const currentValue = controlled ? value : state

  return [currentValue, setValue]
}
