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
    open,
    setOpen,
    hidePopper,
    showPopper,
    referenceRef,
    popperRootRef,
    popperRootId,
  } = usePopper()
  const {
    children,
    interactive = true,
    action = 'hover',
    closeOnClick = true,
  } = props

  useEffect(() => {
    if (open && action === 'click') {
      const doc = ownerDocument(referenceRef.current)
      return addEventListener(doc.body, 'click', (e) => {
        // istanbul ignore next
        if (!open) return

        const target = e.target as Node

        if (
          !interactive ||
          (!popperRootRef?.current?.contains(target) &&
            !referenceRef?.current?.contains(target))
        ) {
          hidePopper()
        }
      })
    }
  }, [action, hidePopper, interactive, open, popperRootRef, referenceRef])

  useEffect(() => {
    if (open && interactive && action === 'hover' && popperRootRef.current) {
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
  }, [action, hidePopper, interactive, open, popperRootRef, showPopper])

  const renderChildren = () => {
    const element = children as React.ReactElement<any>
    const {
      ref,
      onClick,
      onMouseEnter,
      onMouseLeave,
      'aria-describedby': ariaDescribedby,
    } = element.props

    const props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> = {
      ref: mergeRefs(ref, referenceRef),
      'aria-describedby': ariaDescribedby ?? (open ? popperRootId : undefined),
    }

    if (action === 'click') {
      const handleClick = chain(() => {
        if (!open) {
          showPopper()
        } else if (closeOnClick) {
          hidePopper()
        }
      }, onClick)

      props.onClick = handleClick
    } else if (action === 'hover') {
      const handleMouseEnter = chain(showPopper, onMouseEnter)
      const handleMouseLeave = chain(hidePopper, onMouseLeave)
      const handleClick = chain(() => {
        if (closeOnClick && open) setOpen(false)
      }, onClick)

      props.onMouseEnter = handleMouseEnter
      props.onMouseLeave = handleMouseLeave
      props.onClick = handleClick
    }

    return cloneElement(element, {
      ...props,
    })
  }

  return isValidElement(children) ? renderChildren() : children
}
