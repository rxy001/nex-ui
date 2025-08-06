'use client'

import { cloneElement, isValidElement } from 'react'
import { useModal } from './ModalContext'
import type { ModalCloseProps } from './types'

export const ModalClose = ({ children }: ModalCloseProps) => {
  const { setOpen } = useModal()

  return isValidElement(children)
    ? cloneElement<any>(children, {
        onClick: () => {
          const onClick = (children as React.ReactElement<any>)?.props?.onClick

          if (onClick) {
            const result = onClick()

            // Check if the result is a Promise
            if (
              result &&
              result instanceof Promise &&
              typeof result.then === 'function'
            ) {
              result.then(() => setOpen(false)).catch(() => {})

              return
            }
          }
          setOpen(false)
        },
      })
    : children
}
