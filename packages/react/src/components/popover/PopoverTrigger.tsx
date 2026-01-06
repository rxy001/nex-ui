'use client'

import { cloneElement } from 'react'
import { chain, isValidNonFragmentElement, mergeRefs } from '@nex-ui/utils'
import { PopperAnchor } from '../popper'
import { usePopover, usePopoverProps } from './PopoverContext'
import type { PopoverTriggerProps } from './types'
import type { ReactElement } from 'react'

export const PopoverTrigger = ({
  children,
  closeOnClick = true,
}: PopoverTriggerProps) => {
  const { open, setOpen, triggerRef, rootId } = usePopover()
  const { keepMounted } = usePopoverProps()

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  const element = children as ReactElement<any>

  const handleClick = () => {
    if (!open) {
      setOpen(true)
    } else if (closeOnClick) {
      setOpen(false)
    }
  }

  return (
    <PopperAnchor>
      {cloneElement(element, {
        'aria-haspopup': element.props['aria-haspopup'] ?? 'dialog',
        'aria-expanded': element.props['aria-expanded'] ?? open,
        'aria-controls':
          element.props['aria-controls'] ??
          (open || keepMounted ? rootId : undefined),
        onClick: chain(handleClick, element.props.onClick),
        ref: mergeRefs(triggerRef, element.props.ref),
      })}
    </PopperAnchor>
  )
}

PopoverTrigger.displayName = 'PopoverTrigger'
