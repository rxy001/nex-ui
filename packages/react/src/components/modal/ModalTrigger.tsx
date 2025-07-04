import { chain } from '@nex-ui/utils'
import { cloneElement, isValidElement } from 'react'
import { useModalProps } from './ModalContext'
import type { ModalTriggerProps } from './types'

export const ModalTrigger = (props: ModalTriggerProps) => {
  const { setOpen } = useModalProps()
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
