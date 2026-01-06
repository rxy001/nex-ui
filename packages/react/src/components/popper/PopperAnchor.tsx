'use client'

import { isValidNonFragmentElement, mergeRefs } from '@nex-ui/utils'
import { cloneElement } from 'react'
import { usePopper } from './PopperContext'
import type { ReactElement } from 'react'
import type { PopperAnchorProps } from './types'

export const PopperAnchor = ({ children }: PopperAnchorProps) => {
  const { referenceRef } = usePopper()

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  const element = children as ReactElement<any>

  return cloneElement(element, {
    ref: mergeRefs(referenceRef, element.props.ref),
  })
}
