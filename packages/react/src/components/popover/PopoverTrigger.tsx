'use client'

import { useMemo } from 'react'
import { PopperTrigger, usePopper } from '../popper'
import { usePopover } from './PopoverContext'
import type { PopoverTriggerProps } from './types'

const useAriaProps = () => {
  const { id, keepMounted } = usePopover()
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
  interactive,
}: PopoverTriggerProps) => {
  const ariaProps = useAriaProps()

  return (
    <PopperTrigger
      action='click'
      interactive={interactive}
      closeOnClick={closeOnClick}
      elementProps={ariaProps}
    >
      {children}
    </PopperTrigger>
  )
}

PopoverTrigger.displayName = 'PopoverTrigger'
