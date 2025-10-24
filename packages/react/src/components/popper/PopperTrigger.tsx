'use client'

import {
  chain,
  mergeRefs,
  addEventListener,
  ownerDocument,
  isFocusVisible,
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
    action = 'hover',
    interactive = true,
    closeOnClick = true,
    ...remainingProps
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
    const { ref, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur } =
      element.props

    const props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> = {
      ...remainingProps,
      ...element.props,
      ref: mergeRefs(ref, referenceRef),
      onFocus: chain(onFocus, (event: FocusEvent<HTMLElement>) => {
        if (isFocusVisible(event.currentTarget)) {
          handleOpen()
          focusVisibleRef.current = true
        }
      }),
      onBlur: chain(onBlur, (event: FocusEvent<HTMLElement>) => {
        if (focusVisibleRef.current && !isFocusVisible(event.currentTarget)) {
          handleClose()
          focusVisibleRef.current = false
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
