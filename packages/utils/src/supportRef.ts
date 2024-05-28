import type { ReactElement } from 'react'
import { isForwardRef, isMemo, ForwardRef } from 'react-is'

export function supportRef(nodeOrComponent: ReactElement) {
  if (typeof nodeOrComponent.type === 'string') {
    return true
  }

  if (
    isMemo(nodeOrComponent) &&
    nodeOrComponent.type &&
    typeof nodeOrComponent.type.type === 'object' &&
    nodeOrComponent.type.type.$$typeof === ForwardRef
  ) {
    return true
  }

  if (isForwardRef(nodeOrComponent)) {
    return true
  }

  return false
}
