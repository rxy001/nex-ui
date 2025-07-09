'use client'

import { chain } from '@nex-ui/utils'
import { cloneElement, isValidElement } from 'react'
import { useModal } from './ModalContext'
import type { ModalTriggerProps } from './types'

export const ModalTrigger = (props: ModalTriggerProps) => {
  const { setOpen } = useModal()
  const { children } = props

  return isValidElement(children)
    ? cloneElement<any>(children, {
        onClick: chain(
          () => setOpen(true),
          (children as React.ReactElement<any>)?.props?.onClick,
        ),
      })
    : children
}
