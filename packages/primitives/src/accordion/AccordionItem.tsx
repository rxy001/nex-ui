import { useCallback, useId, useMemo } from 'react'
import { useCollectionItem } from '../collection'
import { createHook } from '../utils'
import {
  AccordionItemProvider,
  useAccordionRootContext,
} from './AccordionContext'
import type { AccordionitemContext } from './AccordionContext'
import type { DefaultValue } from './AccordionRoot'
import type { HookProps, HTMLElements } from '../utils/types'

export const useAccordionItem = createHook(function useAccordionItem({
  disabled: disabledProp,
  value: valueProp,
  ...props
}: UseAccordionItemProps) {
  const rootContext = useAccordionRootContext()

  const defaultValue = useId()

  const disabled = disabledProp || rootContext.disabled

  const value = valueProp ?? defaultValue

  const open = useMemo(() => {
    if (rootContext.value.length === 0) return false
    return rootContext.value.includes(value)
  }, [value, rootContext.value])

  const getItem = useCallback(
    () => ({
      value,
      disabled,
    }),
    [disabled, value],
  )

  ;({ props } = useCollectionItem({
    ...props,
    getItem,
  }))

  const state = useMemo<AccordionItemState>(
    () => ({
      disabled,
      open,
    }),
    [disabled, open],
  )

  const itemContext = useMemo<AccordionitemContext>(
    () => ({
      value,
      disabled,
      state,
    }),
    [value, disabled, state],
  )

  return {
    props,
    state,
    provider: (element) => (
      <AccordionItemProvider value={itemContext}>
        {element}
      </AccordionItemProvider>
    ),
  }
})

interface UseAccordionItemOwnProps<Value extends React.Key = DefaultValue> {
  disabled?: boolean

  value: Value
}

type DefaultElement = 'div'

export interface AccordionItemState {
  disabled: boolean

  open: boolean
}

export type UseAccordionItemProps<
  Element extends HTMLElements = DefaultElement,
  Value extends React.Key = DefaultValue,
> = HookProps<Element, UseAccordionItemOwnProps<Value>>
