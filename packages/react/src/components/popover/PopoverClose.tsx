'use client'

import { cloneElement } from 'react'
import { chain, isValidNonFragmentElement } from '@nex-ui/utils'
import { usePopover } from './PopoverContext'
import type { ReactElement } from 'react'
import type { PopoverCloseProps } from './types'

export const PopoverClose = ({ children }: PopoverCloseProps) => {
  const { setOpen } = usePopover()

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  const element = children as ReactElement<any>

  return cloneElement(element, {
    'aria-label': element.props['aria-label'] || 'Close',
    onClick: chain(() => setOpen(false), element.props.onClick),
  })
}
