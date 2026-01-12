'use client'

import { isValidNonFragmentElement, mergeRefs } from '@nex-ui/utils'
import { cloneElement } from 'react'
import { usePopperContext } from './PopperContext'
import type { PopperAnchorProps } from './types'

export const PopperAnchor = ({ children }: PopperAnchorProps) => {
  const { referenceRef } = usePopperContext()

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return cloneElement(children, {
    ref: mergeRefs(referenceRef, children.props.ref),
  })
}
