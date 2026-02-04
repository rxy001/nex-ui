'use client'

import { cloneElement } from 'react'
import { isValidNonFragmentElement } from '@nex-ui/utils'
import { useModalContext } from './ModalContext'
import type { ModalCloseProps } from './types'

export const ModalClose = ({ children }: ModalCloseProps) => {
  const { setOpen } = useModalContext()

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return cloneElement(children, {
    'aria-label': children.props?.['aria-label'] || 'Close',
    onClick: () => {
      const { onClick } = children.props

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
}

ModalClose.displayName = 'ModalClose'
