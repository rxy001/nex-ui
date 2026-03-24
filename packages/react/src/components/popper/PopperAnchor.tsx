'use client'

import { isValidNonFragmentElement, mergeRefs } from '@nex-ui/utils'
import { cloneElement } from 'react'
import { usePopperContext } from './PopperContext'
import type { PopperAnchorProps } from './types'

export function PopperAnchor({ children }: PopperAnchorProps) {
  const { triggerRef } = usePopperContext()

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return cloneElement(children, {
    ref: mergeRefs(triggerRef, children.props.ref),
  })
}

PopperAnchor.displayName = 'PopperAnchor'
