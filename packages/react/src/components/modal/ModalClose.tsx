import { chain } from '@nex-ui/utils'
import { cloneElement, isValidElement } from 'react'
import { useModalProps } from './ModalContext'
import type { ModalCloseProps } from './types'

export const ModalClose = ({ children }: ModalCloseProps) => {
  const { setOpen } = useModalProps()

  return isValidElement(children)
    ? cloneElement<any>(children, {
        onClick: chain(
          () => setOpen(false),
          (children as React.ReactElement<any>)?.props?.onClick,
        ),
      })
    : children
}
