'use client'

import {
  chain,
  mergeRefs,
  addEventListener,
  ownerDocument,
  isFocusVisible,
} from '@nex-ui/utils'
import { cloneElement, isValidElement, useEffect } from 'react'
import { usePopper } from './PopperContext'
import type { DetailedHTMLProps, HTMLAttributes, FocusEvent } from 'react'
import type { PopperTriggerProps } from './types'

export const PopperTrigger = (props: PopperTriggerProps) => {
  const {
    open,
    setOpen,
    handleClose,
    handleOpen,
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
          handleClose()
        }
      })
    }
  }, [action, handleClose, interactive, open, popperRootRef, referenceRef])

  useEffect(() => {
    if (open && interactive && action === 'hover' && popperRootRef.current) {
      const removeMouseenter = addEventListener(
        popperRootRef.current,
        'mouseenter',
        handleOpen,
      )
      const removeMouseleave = addEventListener(
        popperRootRef.current,
        'mouseleave',
        handleClose,
      )
      return () => {
        removeMouseenter()
        removeMouseleave()
      }
    }
  }, [action, handleClose, interactive, open, popperRootRef, handleOpen])

  const renderChildren = () => {
    const element = children as React.ReactElement<any>
    const {
      ref,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      'aria-describedby': ariaDescribedby,
    } = element.props

    const props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> = {
      ref: mergeRefs(ref, referenceRef),
      'aria-describedby': ariaDescribedby ?? (open ? popperRootId : undefined),
      onFocus: chain(onFocus, (event: FocusEvent<HTMLElement>) => {
        if (isFocusVisible(event.currentTarget)) {
          handleOpen()
        }
      }),
      onBlur: chain(onBlur, (event: FocusEvent<HTMLElement>) => {
        if (!isFocusVisible(event.currentTarget)) {
          handleClose()
        }
      }),
    }

    if (action === 'click') {
      const handleClick = chain(() => {
        if (!open) {
          handleOpen()
        } else if (closeOnClick) {
          handleClose()
        }
      }, onClick)

      props.onClick = handleClick
    } else if (action === 'hover') {
      const handleMouseEnter = chain(handleOpen, onMouseEnter)
      const handleMouseLeave = chain(handleClose, onMouseLeave)
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
