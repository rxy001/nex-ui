'use client'

import { cloneElement, isValidElement } from 'react'
import { usePopper } from './PopperContext'
import type { ReactElement } from 'react'
import type { PopperCloseProps } from './types'

export const PopperClose = ({ children }: PopperCloseProps) => {
  const { handleClose } = usePopper()

  if (!isValidElement(children)) {
    return children
  }

  const element = children as ReactElement<any>

  return cloneElement(element, {
    'aria-label': element.props['aria-label'] || 'Close',
    onClick: () => {
      const { onClick } = element.props

      if (onClick) {
        const result = onClick()

        // Check if the result is a Promise
        if (
          result &&
          result instanceof Promise &&
          typeof result.then === 'function'
        ) {
          result.then(() => handleClose()).catch(() => {})

          return
        }
      }
      handleClose()
    },
  })
}
