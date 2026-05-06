import { useEffect, useId, useRef } from 'react'
import { useMergeRefs } from '@nex-ui/hooks'
import { useCollectionContext } from './CollectionContext'
import { createHook, createPrimitive } from '../utils'
import type { HookProps, HTMLElements, RenderProp } from '../utils/types'

export const useCollectionItem = createHook<
  'div',
  UseCollectionItemOwnProps,
  CollectionItemState
>(function useCollectionItem({ getItem, ...props }) {
  const { addItem, removeItem } = useCollectionContext()
  const ref = useRef(null)
  const defaultId = useId()
  const id = props.id || defaultId
  const mergedRefs = useMergeRefs(ref, props.ref)

  useEffect(() => {
    addItem({
      ...getItem(),
      id,
      element: ref,
    })

    return () => removeItem(id)
  }, [addItem, removeItem, getItem, id])

  return {
    props: {
      ...props,
      ref: mergedRefs,
    },
    state: {},
  }
})

export function CollectionItem({ render, ...other }: CollectionItemProps) {
  const { props, state } = useCollectionItem(other)

  return createPrimitive('div', props, {
    state,
    render,
  })
}

export interface CollectionItemProps extends UseCollectionItemProps {
  render?: RenderProp<CollectionItemState>
}

interface UseCollectionItemOwnProps {
  getItem: () => Record<string, any>
}

export interface CollectionItemState {}

export type UseCollectionItemProps<Element extends HTMLElements = 'div'> =
  HookProps<Element, UseCollectionItemOwnProps>
