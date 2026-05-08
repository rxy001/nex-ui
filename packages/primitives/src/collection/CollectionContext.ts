import { createContext } from '@nex-ui/utils'
import type { CollectionStore } from './useCollectionStore'

export const [CollectionRootProvider, useCollectionRootContext] =
  createContext<CollectionStore>({
    contextName: 'CollectionRootContext',
    hookName: 'useCollectionRootContext',
    providerName: 'CollectionRootProvider',
    strict: false,
  })
