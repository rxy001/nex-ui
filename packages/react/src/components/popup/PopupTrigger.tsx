'use client'

import { chain, mergeRefs } from '@nex-ui/utils'
import { cloneElement, isValidElement } from 'react'
import { usePopup } from './PopupContext'
import type { PopupTriggerProps } from './types'

export const PopupTrigger = (props: PopupTriggerProps) => {
  const { setOpen, triggerRef, open } = usePopup()
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
