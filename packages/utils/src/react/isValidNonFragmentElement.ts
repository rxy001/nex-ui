import { Fragment, isValidElement } from 'react'
import { __DEV__ } from '../shared'
import type { ReactNode, ReactElement } from 'react'

export const isValidNonFragmentElement = (
  node: ReactNode,
): node is ReactElement<any> => {
  if (!isValidElement(node)) {
    if (__DEV__) {
      console.error('[Nex UI]: The provided node is not a valid React element.')
    }
    return false
  }

  if (node.type === Fragment) {
    if (__DEV__) {
      console.error(
        "[Nex UI]: Cloning React.Fragment is not supported. Please wrap the Fragment's children in a <div> or another element.",
      )
    }
    return false
  }

  return true
}
