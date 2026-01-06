import { useRef, cloneElement } from 'react'
import { isValidNonFragmentElement, chain } from '@nex-ui/utils'
import { useTooltip } from './TooltipContext'
import { isFocusVisible } from '../utils'
import { PopperAnchor } from '../popper'
import type { ReactNode, FocusEvent, ReactElement } from 'react'

export const TooltipTrigger = ({
  children,
  'aria-describedby': ariaDescribedby,
}: {
  children?: ReactNode
  'aria-describedby'?: string
}) => {
  const { delayOpen, delayClose } = useTooltip()

  const focusVisibleRef = useRef(false)

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  const handleMouseEnter = delayOpen
  const handleMouseLeave = delayClose
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

  const element = children as ReactElement<any>

  return (
    <PopperAnchor>
      {cloneElement(element, {
        onMouseEnter: chain(handleMouseEnter, element.props.onMouseEnter),
        onMouseLeave: chain(handleMouseLeave, element.props.onMouseLeave),
        onFocus: chain(handleFocus, element.props.onFocus),
        onBlur: chain(handleBlur, element.props.onBlur),
        'aria-describedby':
          element.props['aria-describedby'] || ariaDescribedby,
      })}
    </PopperAnchor>
  )
}

TooltipTrigger.displayName = 'TooltipTrigger'
