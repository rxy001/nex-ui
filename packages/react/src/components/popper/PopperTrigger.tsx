'use client'

import { chain, mergeRefs } from '@nex-ui/utils'
import { cloneElement, isValidElement } from 'react'
import { usePopper } from './PopperContext'
import type { PopperTriggerProps } from './types'

export const PopperTrigger = (props: PopperTriggerProps) => {
  const { setOpen, triggerRef, open } = usePopper()
  const { children } = props

  const renderChildren = () => {
    const element = children as React.ReactElement<any>

    const { onClick, ref } = element.props

    return cloneElement<any>(element, {
      onClick: chain(() => setOpen(!open), onClick),
      ref: mergeRefs(ref, triggerRef),
    })
  }

  return isValidElement(children) ? renderChildren() : children
}
