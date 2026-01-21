import { useRef, cloneElement } from 'react'
import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { useTooltipContext } from './TooltipContext'
import { isFocusVisible } from '../utils'
import { PopperAnchor } from '../popper'
import type { FocusEvent } from 'react'
import type { PopperAnchorProps } from '../popper'

export const TooltipTrigger = ({ children }: PopperAnchorProps) => {
  const { delayOpen, delayClose, rootId, open, setOpen } = useTooltipContext()

  const focusVisibleRef = useRef(false)

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (isFocusVisible(event.currentTarget)) {
      setOpen(true)
      focusVisibleRef.current = true
    }
  }

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (focusVisibleRef.current && !isFocusVisible(event.currentTarget)) {
      setOpen(false)
      focusVisibleRef.current = false
    }
  }

  return (
    <PopperAnchor>
      {cloneElement(
        children,
        mergeProps(
          {
            onPointerEnter: delayOpen,
            onPointerLeave: delayClose,
            onFocus: handleFocus,
            onBlur: handleBlur,
            'aria-describedby': open ? rootId : undefined,
          },
          children.props,
        ),
      )}
    </PopperAnchor>
  )
}

TooltipTrigger.displayName = 'TooltipTrigger'
