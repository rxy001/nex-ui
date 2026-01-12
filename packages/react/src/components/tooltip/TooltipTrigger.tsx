import { useRef, cloneElement } from 'react'
import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { useTooltipContext } from './TooltipContext'
import { isFocusVisible } from '../utils'
import { PopperAnchor } from '../popper'
import type { FocusEvent, ReactElement } from 'react'

export const TooltipTrigger = ({
  children,
}: {
  children?: ReactElement<any>
}) => {
  const { delayOpen, delayClose, rootId, open } = useTooltipContext()

  const focusVisibleRef = useRef(false)

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  const handlePointerEnter = delayOpen
  const handlePointerLeave = delayClose
  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (isFocusVisible(event.currentTarget)) {
      delayOpen()
      focusVisibleRef.current = true
    }
  }

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (focusVisibleRef.current && !isFocusVisible(event.currentTarget)) {
      delayClose()
      focusVisibleRef.current = false
    }
  }

  return (
    <PopperAnchor>
      {cloneElement(
        children,
        mergeProps(
          {
            onPointerEnter: handlePointerEnter,
            onPointerLeave: handlePointerLeave,
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
