'use client'

import { chain } from '@nex-ui/utils'
import { cloneElement, isValidElement } from 'react'
import { useModal } from './ModalContext'
import type { ReactElement } from 'react'
import type { ModalTriggerProps } from './types'

export const ModalTrigger = (props: ModalTriggerProps) => {
  const { setOpen, open, keepMounted, modalContentId } = useModal()
  const { children } = props

  const renderChildren = () => {
    const element = children as ReactElement<any>

    const {
      onClick,
      'aria-haspopup': ariaHaspopup,
      'aria-expanded': ariaExpanded,
      'aria-controls': ariaControls,
    } = element.props

    return cloneElement<any>(element, {
      onClick: chain(() => setOpen(true), onClick),
      'aria-haspopup': ariaHaspopup || 'dialog',
      'aria-expanded': ariaExpanded || open,
      'aria-controls':
        ariaControls || (keepMounted || open ? modalContentId : undefined),
    })
  }

  return isValidElement(children) ? renderChildren() : children
}
