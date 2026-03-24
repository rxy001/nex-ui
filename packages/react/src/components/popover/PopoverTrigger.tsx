'use client'

import { cloneElement } from 'react'
import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { PopperAnchor } from '../popper'
import { usePopoverContext } from './PopoverContext'
import type { PopoverTriggerProps } from './types'

export function PopoverTrigger({
  children,
  closeOnClick = true,
}: PopoverTriggerProps) {
  const { open, setOpen, triggerRef, rootId } = usePopoverContext()

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  const handleClick = () => {
    if (!open) {
      setOpen(true)
    } else if (closeOnClick) {
      setOpen(false)
    }
  }

  return (
    <PopperAnchor>
      {cloneElement(
        children,
        mergeProps(
          {
            'aria-haspopup': 'dialog',
            'aria-expanded': open,
            'aria-controls': open ? rootId : undefined,
            onClick: handleClick,
            ref: triggerRef,
          },
          children.props,
        ),
      )}
    </PopperAnchor>
  )
}

PopoverTrigger.displayName = 'PopoverTrigger'
