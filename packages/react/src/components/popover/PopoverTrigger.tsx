'use client'

import { useMemo } from 'react'
import { PopperTrigger, usePopper } from '../popper'
import { usePopoverProps } from './PopoverContext'
import type { PopoverTriggerProps } from './types'

const useAriaProps = () => {
  const { id, keepMounted } = usePopoverProps()
  const { open } = usePopper()

  return useMemo(
    () => ({
      'aria-haspopup': 'dialog',
      'aria-expanded': open,
      'aria-controls': open || keepMounted ? id : undefined,
    }),
    [id, keepMounted, open],
  )
}

export const PopoverTrigger = ({
  children,
  closeOnClick,
}: PopoverTriggerProps) => {
  const ariaProps = useAriaProps()

  return (
    <PopperTrigger closeOnClick={closeOnClick} elementProps={ariaProps}>
      {children}
    </PopperTrigger>
  )
}

PopoverTrigger.displayName = 'PopoverTrigger'
