'use client'

import { chain } from '@nex-ui/utils'
import { cloneElement, isValidElement } from 'react'
import { useModal } from './ModalContext'
import type { ModalCloseProps } from './types'

export const ModalClose = ({ children }: ModalCloseProps) => {
  const { setOpen } = useModal()
  return isValidElement(children)
    ? cloneElement<any>(children, {
        onClick: chain(
          () => {
            setOpen(false)
          },
          (children as React.ReactElement<any>)?.props?.onClick,
        ),
      })
    : children
}
