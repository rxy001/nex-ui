'use client'

import {
  chain,
  mergeRefs,
  addEventListener,
  ownerDocument,
} from '@nex-ui/utils'
import { cloneElement, isValidElement, useEffect } from 'react'
import { usePopper } from './PopperContext'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { PopperTriggerProps } from './types'

export const PopperTrigger = (props: PopperTriggerProps) => {
  const {
    hidePopper,
    showPopper,
    referenceRef,
    open,
    popperRootRef,
    popperRootId,
  } = usePopper()
  const { children, action = 'hover' } = props

  useEffect(() => {
    if (open && action === 'click') {
      const doc = ownerDocument(referenceRef.current)
      return addEventListener(doc.body, 'click', (e) => {
        // istanbul ignore next
        if (!open) return

        if (
          !popperRootRef?.current?.contains(e.target as Node) &&
          !referenceRef?.current?.contains(e.target as Node)
        ) {
          hidePopper()
        }
      })
    }
  }, [action, hidePopper, open, popperRootRef, referenceRef])

  useEffect(() => {
    if (open && action === 'hover' && popperRootRef.current) {
      const removeMouseenter = addEventListener(
        popperRootRef.current,
        'mouseenter',
        showPopper,
      )
      const removeMouseleave = addEventListener(
        popperRootRef.current,
        'mouseleave',
        hidePopper,
      )
      return () => {
        removeMouseenter()
        removeMouseleave()
      }
    }
  }, [action, hidePopper, open, popperRootRef, showPopper])

  const renderChildren = () => {
    const element = children as React.ReactElement<any>
    const {
      ref,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onBlur,
      onFocus,
      'aria-describedby': ariaDescribedby,
    } = element.props

    const props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> = {
      ref: mergeRefs(ref, referenceRef),
      'aria-describedby': ariaDescribedby ?? (open ? popperRootId : undefined),
    }

    if (action === 'click') {
      const handleClick = chain(() => {
        if (open) {
          hidePopper()
        } else {
          showPopper()
        }
      }, onClick)

      props.onClick = handleClick
    } else if (action === 'hover') {
      const handleMouseEnter = chain(showPopper, onMouseEnter)
      const handleMouseLeave = chain(hidePopper, onMouseLeave)

      props.onMouseEnter = handleMouseEnter
      props.onMouseLeave = handleMouseLeave
    } else if (action === 'focus') {
      const handleFocus = chain(showPopper, onFocus)
      const handleBlur = chain(hidePopper, onBlur)

      props.onFocus = handleFocus
      props.onBlur = handleBlur
    }

    return cloneElement(element, {
      ...props,
    })
  }

  return isValidElement(children) ? renderChildren() : children
}
