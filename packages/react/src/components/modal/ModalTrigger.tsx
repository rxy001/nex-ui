'use client'

import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { cloneElement } from 'react'
import { useModal } from './ModalContext'
import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react'
import type { ModalTriggerProps } from './types'

export const ModalTrigger = (props: ModalTriggerProps) => {
  const { setOpen, open, modalContentId } = useModal()
  const { children } = props

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  const elementProps: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement
  > = {
    onClick: () => setOpen(true),
    'aria-haspopup': 'dialog',
    'aria-expanded': open,
    'aria-controls': open ? modalContentId : undefined,
  }

  const element = children as ReactElement<any>

  return cloneElement(element, mergeProps(elementProps, element.props))
}
