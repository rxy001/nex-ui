'use client'

import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { cloneElement } from 'react'
import { useModalContext } from './ModalContext'
import type { ModalTriggerProps } from './types'

export const ModalTrigger = (props: ModalTriggerProps) => {
  const { setOpen, open, modalContentId } = useModalContext()
  const { children } = props

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return cloneElement(
    children,
    mergeProps(
      {
        onClick: () => setOpen(true),
        'aria-haspopup': 'dialog',
        'aria-expanded': open,
        'aria-controls': open ? modalContentId : undefined,
      },
      children.props,
    ),
  )
}
