'use client'

import { nex } from '@nex-ui/styled'
import { defineRecipe } from '@nex-ui/system'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { addEventListener, ownerWindow, chain } from '@nex-ui/utils'
import { useSlot, getOverflowAncestors, computePosition } from '../utils'
import { DismissibleLayer } from '../dismissibleLayer'
import { usePopperContext } from './PopperContext'
import type { CSSProperties } from 'react'
import type { PopperContentProps } from './types'
import type { Placement } from '../utils'

const recipe = defineRecipe({
  base: {
    pos: 'absolute',
    left: 'var(--popper-x)',
    top: 'var(--popper-y)',
  },
})

const style = recipe()

type StyleVariables = {
  '--popper-x': string
  '--popper-y': string
}

const DEFAULT_VARS = {
  '--popper-x': '-9999px',
  '--popper-y': '-9999px',
}

const DEFAULT_FLIP_OPTIONS = { mainAxis: true, crossAxis: true }

const transformOrigins = {
  top: 'bottom center',
  right: 'center left',
  bottom: 'top center',
  left: 'center right',
  'top-start': 'bottom left',
  'right-end': 'bottom left',
  'right-start': 'top left',
  'bottom-start': 'top left',
  'bottom-end': 'top right',
  'left-start': 'top right',
  'left-end': 'bottom right',
  'top-end': 'bottom right',
} as const

export const PopperContent = (props: PopperContentProps) => {
  const { open, triggerRef, popperRootRef, setOpen } = usePopperContext()

  const {
    children,
    onEscapeKeyDown,
    onFocusOutside,
    onInteractOutside,
    onPointerDownOutside,
    closeOnEscape = true,
    closeOnDetached = true,
    flip = DEFAULT_FLIP_OPTIONS,
    offset = 5,
    shift = true,
    placement = 'top',
    ...remainingProps
  } = props

  const [styleVariables, setStyleVariables] =
    useState<StyleVariables>(DEFAULT_VARS)

  const [computedPlacement, setComputedPlacement] =
    useState<Placement>(placement)

  // To avoid multiple calculations on the initial render,
  // because ResizeObserver is triggered when observing starts.
  const initialRender = useRef(true)

  const [PopperContentRoot, getPopperContentRootProps] = useSlot({
    style,
    component: nex.div,
    externalForwardedProps: remainingProps,
    additionalProps: {
      ref: popperRootRef,
      style: {
        ...styleVariables,
        '--popper-transform-origin': transformOrigins[computedPlacement],
      } as CSSProperties,
    },
    dataAttrs: {
      closeOnDetached,
      closeOnEscape,
      placement: computedPlacement,
      state: open ? 'open' : 'closed',
    },
  })

  const setPosition = useCallback(() => {
    if (!triggerRef.current || !popperRootRef.current) return

    const {
      x,
      y,
      placement: newComputedPlacement,
    } = computePosition(triggerRef.current, popperRootRef.current, {
      placement,
      offset,
      flip,
      shift,
    })

    const newStyleVars = {
      '--popper-x': x + 'px',
      '--popper-y': y + 'px',
    }
    setComputedPlacement(newComputedPlacement)
    setStyleVariables(newStyleVars)
  }, [triggerRef, popperRootRef, placement, offset, flip, shift])

  const resetPosition = useEvent(() => {
    if (!triggerRef.current || !popperRootRef.current) {
      setStyleVariables(DEFAULT_VARS)
      return
    }

    setPosition()
  })

  const observeElementResizeChanges = useEvent(() => {
    if (!triggerRef.current || !popperRootRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      if (initialRender.current) {
        initialRender.current = false
        return
      }
      for (const entry of entries) {
        if (
          entry.target === triggerRef.current ||
          entry.target === popperRootRef.current
        ) {
          resetPosition()
        }
      }
    })

    resizeObserver.observe(triggerRef.current)
    resizeObserver.observe(popperRootRef.current)
    return () => {
      resizeObserver.disconnect()
      initialRender.current = true
    }
  })

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
    if (!triggerRef.current) return

    const win = ownerWindow(triggerRef.current)

    return addEventListener(win, 'resize', resetPosition)
  })

  useEffect(() => {
    if (!open) return

    setPosition()
  }, [setPosition, open])

  useEffect(() => {
    if (!triggerRef.current || !closeOnDetached || !open) return

    function handleIntersect(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setOpen(false)
        }
      })
    }
    const observer = new IntersectionObserver(handleIntersect)
    observer.observe(triggerRef.current)
    return () => {
      observer.disconnect()
    }
  }, [open, closeOnDetached, triggerRef, setOpen])

  useEffect(() => {
    if (!open) return

    const unobserveElementResizeChanges = observeElementResizeChanges()
    const unsubscribeAncestorScrollEvents = subscribeAncestorScrollEvents()
    const unsubscribeWindowResizeEvent = subscribeWindowResizeEvent()

    return () => {
      unobserveElementResizeChanges?.()
      unsubscribeAncestorScrollEvents?.()
      unsubscribeWindowResizeEvent?.()
    }
  }, [
    open,
    observeElementResizeChanges,
    subscribeAncestorScrollEvents,
    subscribeWindowResizeEvent,
  ])

  return (
    <DismissibleLayer
      onEscapeKeyDown={chain(onEscapeKeyDown, (event) => {
        if (!closeOnEscape) event.preventDefault()
      })}
      onFocusOutside={onFocusOutside}
      onInteractOutside={onInteractOutside}
      onPointerDownOutside={onPointerDownOutside}
      onDismiss={() => setOpen(false)}
    >
      <PopperContentRoot {...getPopperContentRootProps()}>
        {children}
      </PopperContentRoot>
    </DismissibleLayer>
  )
}

PopperContent.displayName = 'PopperContent'
