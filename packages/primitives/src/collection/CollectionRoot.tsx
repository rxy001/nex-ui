import { createHook, createPrimitive } from '../utils'
import {
  CollectionRootProvider,
  useCollectionRootContext,
} from './CollectionContext'
import type { HTMLElements, HookProps, RenderProp } from '../utils/types'
import type { CollectionStore } from './useCollectionStore'

export const useCollectionRoot = createHook<
  'div',
  UseCollectionRootOwnProps,
  CollectionRootState
>(function useCollection({ store, ...props }: UseCollectionRootProps) {
  const context = useCollectionRootContext()

  return {
    props,
    state: {},
    provider: (element: React.ReactNode) => (
      <CollectionRootProvider value={store ?? context}>
        {element}
      </CollectionRootProvider>
    ),
  }
})

export function CollectionRoot({ render, ...other }: CollectionRootProps) {
  const { props, state, provider } = useCollectionRoot(other)

  return createPrimitive('div', props, {
    render,
    state,
    provider,
  })
}

CollectionRoot.displayName = 'CollectionRoot'

export type UseCollectionRootProps<Element extends HTMLElements = 'div'> =
  HookProps<Element, UseCollectionRootOwnProps>

export interface CollectionRootProps extends UseCollectionRootProps {
  render?: RenderProp<CollectionRootState>
}

export interface UseCollectionRootOwnProps {
  store?: CollectionStore
}

export interface CollectionRootState {}
