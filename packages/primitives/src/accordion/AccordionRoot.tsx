import { useControlledState, useEvent } from '@nex-ui/hooks'
import { __DEV__ } from '@nex-ui/utils'
import { useMemo } from 'react'
import { useCollectionStore } from 'src/collection/useCollectionStore'
import { createHook, createPrimitive } from '../utils'
import { useCollectionRoot } from '../collection'
import { AccordionRootProvider } from './AccordionContext'
import type { AccordionRootContextValue } from './AccordionContext'
import type {
  HookProps,
  HTMLElements,
  HookReturnResult,
  Orientation,
  RenderProp,
} from '../utils/types'

export const useAccordionRoot = createHook<
  <
    Element extends HTMLElements = DefaultElement,
    Value extends React.Key = DefaultValue,
  >(
    props: UseAccordionRootProps<Element, Value>,
  ) => HookReturnResult<Element, AccordionRootState<Value>>
>(function useAccordionRoot({
  defaultValue,
  onValueChange,
  multiple = false,
  disabled = false,
  orientation = 'vertical',
  loopFocus = true,
  value: valueProp,
  ...props
}: UseAccordionRootProps) {
  const [value, setValue] = useControlledState(
    valueProp,
    defaultValue,
    onValueChange,
  )

  if (__DEV__) {
    if (!multiple && value.length > 1) {
      console.warn(
        '[Nex UI] AccordionRoot: The multiple prop of the AccordionRoot is set to false, but the number of currently expanded items exceeds 1. Please check and set the appropriate props.',
      )
    }
  }

  const collectionStore = useCollectionStore()
  const collectionRoot = useCollectionRoot({
    ...props,
    store: collectionStore,
  })

  ;({ props } = collectionRoot)

  const state: AccordionRootState = {
    value,
    disabled,
    orientation,
  }

  const handleValueChange = useEvent((itemValue: DefaultValue) => {
    if (!multiple) {
      setValue([itemValue])
      return
    }

    if (value.includes(itemValue)) {
      setValue(value.filter((k) => k !== itemValue))
      return
    }
    setValue([...value, itemValue])
  })

  const contextValue: AccordionRootContextValue<DefaultValue> = useMemo(
    () => ({
      value,
      disabled,
      handleValueChange,
    }),
    [value, disabled, handleValueChange],
  )

  return {
    state,
    props,
    provider: (element: React.ReactNode) => {
      return (
        <AccordionRootProvider value={contextValue}>
          {collectionRoot.provider?.(element)}
        </AccordionRootProvider>
      )
    },
  }
})

export function AccordionRoot({ render, ...other }: AccordionRootProps) {
  const { props, state, provider } = useAccordionRoot(other)

  return createPrimitive('div', props, {
    render,
    state,
    provider,
  })
}

export type DefaultValue = string

type DefaultElement = 'div'

interface AccordionRootOwnProps<Value extends React.Key = DefaultValue> {
  value?: Value[]
  defaultValue?: Value[]
  onValueChange?: (value: Value[]) => void
  multiple?: boolean
  loopFocus?: boolean
  disabled?: boolean
  orientation?: Orientation
}

export interface AccordionRootProps<Value extends React.Key = DefaultValue>
  extends AccordionRootOwnProps<Value> {
  render?: RenderProp<AccordionRootState<Value>>
}

export interface AccordionRootState<Value extends React.Key = DefaultValue> {
  value: Value[]

  disabled: boolean

  orientation: Orientation
}

export type UseAccordionRootProps<
  Element extends HTMLElements = DefaultElement,
  Value extends React.Key = DefaultValue,
> = HookProps<Element, AccordionRootOwnProps<Value>>
