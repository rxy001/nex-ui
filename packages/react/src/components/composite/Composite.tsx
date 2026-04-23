import { cloneElement, useMemo } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { Collection, useCollection } from './Collection'
import { CompositeProvider } from './CompositeContext'
import type { CompositeProps } from './types'
import type { CompositeContextValue } from './CompositeContext'

export function Composite<T extends string | number = string>(
  inProps: CompositeProps<T>,
) {
  const props = inProps as unknown as CompositeProps

  const {
    children,
    onActiveIdChange,
    defaultActiveId,
    activeId: activeIdProp,
    orientation = 'both',
    loop = false,
    virtualFocus = false,
    ...remainingProps
  } = props
  const collection = useCollection()

  const [activeId, setActiveId] = useControlledState(
    activeIdProp,
    defaultActiveId,
    onActiveIdChange,
  )

  const ctx = useMemo<CompositeContextValue>(
    () => ({ orientation, loop, virtualFocus, activeId, setActiveId }),
    [orientation, loop, virtualFocus, activeId, setActiveId],
  )

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return (
    <Collection collection={collection}>
      <CompositeProvider value={ctx}>
        {cloneElement(children, mergeProps(children.props, remainingProps))}
      </CompositeProvider>
    </Collection>
  )
}

Composite.displayName = 'Composite'
