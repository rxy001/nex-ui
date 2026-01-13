'use client'

import { cloneElement } from 'react'
import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { usePopoverContext } from './PopoverContext'
import type { PopoverCloseProps } from './types'

export const PopoverClose = ({ children }: PopoverCloseProps) => {
  const { setOpen } = usePopoverContext()

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return cloneElement(
    children,
    mergeProps(
      {
        'aria-label': 'Close',
        onClick: () => setOpen(false),
      },
      // @ts-ignore
      children.props,
    ),
  )
}
