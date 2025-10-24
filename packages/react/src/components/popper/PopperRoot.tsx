'use client'

import { defineRecipe } from '@nex-ui/system'
import { useEffect, useRef, useState } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { addEventListener, ownerWindow } from '@nex-ui/utils'
import {
  Portal,
  PresenceMotion,
  useSlot,
  getOverflowAncestors,
  computePosition,
} from '../utils'
import { usePopper } from './PopperContext'
import type { CSSProperties, ElementType } from 'react'
import type { DOMMotionComponents } from 'motion/react'
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

export const PopperRoot = <
  RootComponent extends ElementType = DOMMotionComponents['div'],
>(
  inProps: PopperRootProps<RootComponent>,
) => {
  const { open, referenceRef, setOpen, popperRootRef, popperRootId } =
    usePopper()

  const {
    children,
    container,
    flip = { mainAxis: true, crossAxis: true },
    offset = 5,
    shift = true,
    keepMounted = false,
    closeOnEscape = true,
    placement = 'top',
    role = 'tooltip',
    id = popperRootId,
    ...props
  } = inProps as PopperRootProps

  const [styleVariables, setStyleVariables] = useState<
    StyleVariables | undefined
  >(undefined)
  const unsubscribeRef = useRef<(() => void) | undefined>(undefined)

  // To avoid multiple calculations on the initial render,
  // because ResizeObserver is triggered when observing starts.
  const initialRender = useRef(true)

  // Portal renders asynchronously. Use this variable to avoid multiple handler registrations.
  const initialized = useRef(false)

  const [Motion, getMotionProps] = useSlot({
    style,
    elementType: PresenceMotion,
    externalForwardedProps: props,
    shouldForwardComponent: false,
    additionalProps: {
      open,
      id,
      keepMounted,
      ref: popperRootRef,
      style: styleVariables as CSSProperties,
    },
    a11y: { role, 'aria-hidden': open ? undefined : true },
    dataAttrs: {
      placement,
      keepMounted,
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
  const observeReferenceIntersection = useEvent(() => {
    // istanbul ignore if
    if (!referenceRef.current) return

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

  const subscribeWindowResizeEvent = useEvent(() => {
    const win = ownerWindow(referenceRef.current)

    return addEventListener(win, 'resize', resetPosition)
  })

  const subscribeEscapeEvent = useEvent(() => {
    if (!closeOnEscape || !open) return

    const win = ownerWindow(referenceRef.current)

    return addEventListener(win, 'keydown', (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    })
  })

  const handleMount = useEvent(() => {
    // istanbul ignore if
    if (initialized.current) return

    setPosition()

    const unobserveElementResizeChanges = observeElementResizeChanges()
    const unsubscribeAncestorScrollEvents = subscribeAncestorScrollEvents()
    const unsubscribeWindowResizeEvent = subscribeWindowResizeEvent()
    const unobserveReferenceIntersection = observeReferenceIntersection()
    const unsubscribeEscapeEvent = subscribeEscapeEvent()

    unsubscribeRef.current = () => {
      unobserveElementResizeChanges?.()
      unsubscribeAncestorScrollEvents?.()
      unsubscribeWindowResizeEvent?.()
      unobserveReferenceIntersection?.()
      unsubscribeEscapeEvent?.()
    }

    initialized.current = true
  })

  const handleUnmount = useEvent(() => {
    if (initialized.current === false) return

    unsubscribeRef.current?.()

    initialized.current = false
  })

  const onMount = useEvent(() => {
    // Mainly handle the case where open defaults to true.
    if (open) handleMount()
  })

  const onUnmount = useEvent(() => {
    handleUnmount()
  })

  useEffect(() => {
    if (!open || !popperRootRef.current) return

    handleMount()

    return handleUnmount
  }, [handleMount, handleUnmount, open, popperRootRef])

  return (
    <Portal onMount={onMount} onUnmount={onUnmount} container={container}>
      <Motion {...getMotionProps()}>{children}</Motion>
    </Portal>
  )
}

PopperRoot.displayName = 'PopperRoot'
