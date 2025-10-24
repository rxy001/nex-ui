'use client'

import {
  mergeRefs,
  addEventListener,
  ownerDocument,
  isFocusVisible,
  mergeProps,
} from '@nex-ui/utils'
import { cloneElement, isValidElement, useEffect, useRef } from 'react'
import { usePopper } from './PopperContext'
import type { DetailedHTMLProps, HTMLAttributes, FocusEvent } from 'react'
import type { PopperTriggerProps } from './types'

export const PopperTrigger = (props: PopperTriggerProps) => {
  const focusVisibleRef = useRef(false)

  const {
    open,
    setOpen,
    handleClose,
    handleOpen,
    referenceRef,
    popperRootRef,
  } = usePopper()

  const {
    children,
    elementProps,
    action = 'hover',
    interactive = true,
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

    const props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> = {
      ref: referenceRef,
      onFocus: (event: FocusEvent<HTMLElement>) => {
        if (isFocusVisible(event.currentTarget)) {
          handleOpen()
          focusVisibleRef.current = true
        }
      },
      onBlur: (event: FocusEvent<HTMLElement>) => {
        if (focusVisibleRef.current && !isFocusVisible(event.currentTarget)) {
          handleClose()
          focusVisibleRef.current = false
        }
      },
    }

    if (action === 'click') {
      const handleClick = () => {
        if (!open) {
          handleOpen()
        } else if (closeOnClick) {
          handleClose()
        }
      }

      props.onClick = handleClick
    } else if (action === 'hover') {
      const handleMouseEnter = handleOpen
      const handleMouseLeave = handleClose
      const handleClick = () => {
        if (closeOnClick && open) setOpen(false)
      }

      props.onMouseEnter = handleMouseEnter
      props.onMouseLeave = handleMouseLeave
      props.onClick = handleClick
    }

    return cloneElement(element, {
      ...mergeProps(elementProps, element.props, props),
      ref: mergeRefs(elementProps?.ref, element.props.ref, props.ref),
    })
  }

  return isValidElement(children) ? renderChildren() : children
}
