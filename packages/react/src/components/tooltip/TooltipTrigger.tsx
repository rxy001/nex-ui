import { useRef, cloneElement } from 'react'
import { isValidNonFragmentElement, chain, mergeRefs } from '@nex-ui/utils'
import { usePopper } from '../popper'
import { isFocusVisible } from '../utils'
import type { ReactNode, FocusEvent, ReactElement } from 'react'

export const TooltipTrigger = ({
  children,
  'aria-describedby': ariaDescribedby,
}: {
  children?: ReactNode
  'aria-describedby'?: string
}) => {
  const { delayOpen, delayClose, referenceRef } = usePopper()

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

  return cloneElement(element, {
    onMouseEnter: chain(handleMouseEnter, element.props.onMouseEnter),
    onMouseLeave: chain(handleMouseLeave, element.props.onMouseLeave),
    onFocus: chain(handleFocus, element.props.onFocus),
    onBlur: chain(handleBlur, element.props.onBlur),
    'aria-describedby': element.props['aria-describedby'] || ariaDescribedby,
    ref: mergeRefs(referenceRef, element.props.ref),
  })
}

TooltipTrigger.displayName = 'TooltipTrigger'
