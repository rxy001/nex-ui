'use client'

import { mergeProps } from '@nex-ui/utils'
import { cloneElement, isValidElement } from 'react'
import { useModal } from './ModalContext'
import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react'
import type { ModalTriggerProps } from './types'

export const ModalTrigger = (props: ModalTriggerProps) => {
  const { setOpen, open, modalContentId } = useModal()
  const { children } = props

  const renderChildren = () => {
    const element = children as ReactElement<any>

    const props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> = {
      onClick: () => setOpen(true),
      'aria-haspopup': 'dialog',
      'aria-expanded': open,
      'aria-controls': open ? modalContentId : undefined,
    }

    return cloneElement<any>(element, mergeProps(props, element.props))
  }

  return isValidElement(children) ? renderChildren() : children
}
