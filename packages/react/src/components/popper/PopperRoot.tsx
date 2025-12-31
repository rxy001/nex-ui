'use client'

import { defineRecipe } from '@nex-ui/system'
import { useEffect, useRef, useState } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { addEventListener, ownerWindow } from '@nex-ui/utils'
import {
  useSlot,
  getOverflowAncestors,
  computePosition,
  useDismissHandlers,
} from '../utils'

import { usePopper, usePopperPortalProps } from './PopperContext'
import type { CSSProperties, ElementType } from 'react'
import type { PopperRootProps } from './types'

const recipe = defineRecipe({
  base: {
    pos: 'absolute',
    w: 'max-content',
    left: 'var(--popper-x)',
    top: 'var(--popper-y)',
  },
})

const style = recipe()

type StyleVariables = {
  '--popper-x': string
  '--popper-y': string
}

export const PopperRoot = <RootComponent extends ElementType = 'div'>(
  inProps: PopperRootProps<RootComponent>,
) => {
  const props = inProps as PopperRootProps<'div'>
  const { open, referenceRef, popperRootRef, setOpen } = usePopper()

  const { keepMounted, disableAnimation } = usePopperPortalProps()

  const {
    children,
    onEscapeKeyDown,
    onFocusOutside,
    onInteractOutside,
    onPointerDownOutside,
    closeOnDetached = true,
    closeOnEscape = true,
    flip = { mainAxis: true, crossAxis: true },
    offset = 5,
    shift = true,
    placement = 'top',
    ...remainingProps
  } = props

  const [styleVariables, setStyleVariables] = useState<
    StyleVariables | undefined
  >(undefined)

  // To avoid multiple calculations on the initial render,
  // because ResizeObserver is triggered when observing starts.
  const initialRender = useRef(true)

  const dismissHandlers = useDismissHandlers({
    onEscapeKeyDown: (event: KeyboardEvent) => {
      if (closeOnEscape && open) {
        setOpen(false)
      }
      onEscapeKeyDown?.(event)
    },
    onFocusOutside,
    onInteractOutside,
    onPointerDownOutside,
  })

  const [PopperRootRoot, getPopperRootRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    additionalProps: {
      ref: popperRootRef,
      style: {
        ...styleVariables,
        display:
          disableAnimation && keepMounted
            ? open
              ? 'block'
              : 'none'
            : undefined,
      } as CSSProperties,
      ...dismissHandlers,
    },
    a11y: { 'aria-hidden': open ? undefined : true },
    dataAttrs: {
      placement,
      keepMounted,
      disableAnimation,
      closeOnDetached,
      closeOnEscape,
      state: open ? 'open' : 'closed',
    },
  })

  const setPosition = useEvent(() => {
    // istanbul ignore if
    if (!referenceRef.current || !popperRootRef.current) return

    const { x, y } = computePosition(
      referenceRef.current,
      popperRootRef.current,
      {
        placement,
        offset,
        flip,
        shift,
      },
    )

    const newStyleVars = {
      '--popper-x': x + 'px',
      '--popper-y': y + 'px',
    }

    setStyleVariables(newStyleVars)
  })

  // istanbul ignore next
  const resetPosition = useEvent(() => {
    if (!referenceRef.current || !popperRootRef.current) {
      setStyleVariables(undefined)
      return
    }

    setPosition()
  })

  // istanbul ignore next
  const observeElementResizeChanges = useEvent(() => {
    // istanbul ignore if
    if (!referenceRef.current || !popperRootRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      if (initialRender.current) {
        initialRender.current = false
        return
      }
      for (const entry of entries) {
        if (
          entry.target === referenceRef.current ||
          entry.target === popperRootRef.current
        ) {
          resetPosition()
        }
      }
    })

    resizeObserver.observe(referenceRef.current)
    resizeObserver.observe(popperRootRef.current)
    return () => {
      resizeObserver.disconnect()
      initialRender.current = true
    }
  })

  // istanbul ignore next
  const subscribeAncestorScrollEvents = useEvent(() => {
    if (!popperRootRef.current) return

    const ancestors = getOverflowAncestors(popperRootRef.current)

    const unsubscribeScroll = ancestors.map((ancestor) => {
      return addEventListener(ancestor, 'scroll', resetPosition)
    })

    return () => {
      unsubscribeScroll.forEach((unsub) => unsub())
    }
  })

  // istanbul ignore next
  const observeReferenceIntersection = useEvent(() => {
    // istanbul ignore if
    if (!referenceRef.current || !closeOnDetached) return

    function handleIntersect(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setOpen(false)
        }
      })
    }
    const observer = new IntersectionObserver(handleIntersect)

    observer.observe(referenceRef.current)
    return () => {
      observer.disconnect()
    }
  })

  const subscribeWindowResizeEvent = useEvent(() => {
    const win = ownerWindow(referenceRef.current)

    return addEventListener(win, 'resize', resetPosition)
  })

  useEffect(() => {
    if (!open || !popperRootRef.current) return

    setPosition()

    const unobserveElementResizeChanges = observeElementResizeChanges()
    const unsubscribeAncestorScrollEvents = subscribeAncestorScrollEvents()
    const unsubscribeWindowResizeEvent = subscribeWindowResizeEvent()
    const unobserveReferenceIntersection = observeReferenceIntersection()

    return () => {
      unobserveElementResizeChanges?.()
      unsubscribeAncestorScrollEvents?.()
      unsubscribeWindowResizeEvent?.()
      unobserveReferenceIntersection?.()
    }
  }, [
    open,
    popperRootRef,
    setPosition,
    observeElementResizeChanges,
    subscribeAncestorScrollEvents,
    subscribeWindowResizeEvent,
    observeReferenceIntersection,
  ])

  return (
    <PopperRootRoot {...getPopperRootRootProps()}>{children}</PopperRootRoot>
  )
}

PopperRoot.displayName = 'PopperRoot'
