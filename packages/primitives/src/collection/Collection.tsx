import { createHook, createPrimitive } from '../utils'
import { CollectionProvider, useCollectionContext } from './CollectionContext'
import type { HTMLElements, HookProps, RenderProp } from '../utils/types'
import type { CollectionStore } from './useCollectionStore'

export const useCollection = createHook<
  'div',
  UseCollectionOwnProps,
  CollectionState
>(function useCollection({ store, ...props }: UseCollectionProps) {
  const context = useCollectionContext()

  return {
    props,
    state: {
      store: store ?? context,
    },
  }
})

export function Collection({ render, ...other }: CollectionProps) {
  const { props, state } = useCollection(other)

  return (
    <CollectionProvider value={state.store}>
      {createPrimitive('div', props, {
        render,
        state,
      })}
    </CollectionProvider>
  )
}

Collection.displayName = 'Collection'

export type UseCollectionProps<Element extends HTMLElements = 'div'> =
  HookProps<Element, UseCollectionOwnProps>

export interface CollectionProps extends UseCollectionProps {
  render?: RenderProp<CollectionState>
}

export interface UseCollectionOwnProps {
  store?: CollectionStore
}

export interface CollectionState {
  store: CollectionStore
}
