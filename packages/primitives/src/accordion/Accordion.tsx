import { useControlledState, useEvent } from '@nex-ui/hooks'
import { __DEV__ } from '@nex-ui/utils'
import { useCollectionStore } from 'src/collection/useCollectionStore'
import { createHook } from '../utils'
import { useCollection } from '../collection'
import type { HookProps, HTMLElements } from '../utils/types'

export const useAccordion = createHook<
  'div',
  AccordionOwnProps,
  AccordionState
>(function useAccordion({
  multiple,
  defaultExpandedKeys,
  onExpandedKeysChange,
  expandedKeys: expandedKeysProp,
  ...props
}: UseAccordionProps) {
  const [expandedKeys, setExpandedKeys] = useControlledState(
    expandedKeysProp,
    defaultExpandedKeys,
    onExpandedKeysChange,
  )

  const collectionStore = useCollectionStore()

  let context = {}
  ;({ props, context } = useCollection({
    store: collectionStore,
    ...props,
  }))

  if (__DEV__) {
    if (!multiple && expandedKeys.length > 1) {
      console.warn(
        '[Nex UI] Accordion: The multiple prop of the Accordion is set to false, but the number of currently expanded items exceeds 1. Please check and set the appropriate props.',
      )
    }
  }

  const toggleExpandedKey = useEvent((key: React.Key) => {
    if (expandedKeys.includes(key)) {
      setExpandedKeys(expandedKeys.filter((k: React.Key) => k !== key))
    } else {
      if (multiple) {
        setExpandedKeys([...expandedKeys, key])
        return
      }
      setExpandedKeys([key])
    }
  })

  context = {
    ...context,
    expandedKeys,
    toggleExpandedKey,
  }
})

interface AccordionOwnProps<T extends React.Key = string> {
  expandedKeys?: T[]
  defaultExpandedKeys?: T[]
  onExpandedKeysChange?: (expandedKeys: T[]) => void
  multiple?: boolean
}

export interface AccordionState {}

export type UseAccordionProps<
  Element extends HTMLElements = 'div',
  T extends React.Key = string,
> = HookProps<Element, AccordionOwnProps<T>>
