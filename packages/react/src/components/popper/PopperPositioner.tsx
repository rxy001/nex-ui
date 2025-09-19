'use client'

import { defineRecipe } from '@nex-ui/system'
import { useEffect, useRef, useState } from 'react'
import { useEvent, useDebounce } from '@nex-ui/hooks'
import { ownerWindow } from '@nex-ui/utils'
import { Portal, PresenceMotion, useSlot } from '../utils'
import { usePopper } from './PopperContext'
import type { CSSProperties } from 'react'
import type { PopperPositionerProps } from './types'

const recipe = defineRecipe({
  base: {
    position: 'absolute',
    insetBlockStart: 0,
    insetInlineStart: 0,
    transform: 'translate(var(--popper-x), var(--popper-y))',
    w: 'max-content',
  },
})

const style = recipe()

type StyleVariables = {
  '--popper-x': string
  '--popper-y': string
  '--popper-arrow-x'?: string
  '--popper-arrow-y'?: string
  '--popper-arrow-transform'?: string
}

export const PopperPositioner = ({
  children,
  offset = 8,
  placement = 'top',
}: PopperPositionerProps) => {
  const { open, triggerRef, setOpen, hasArrowRef } = usePopper()
  const [styleVariables, setStyleVariables] = useState<
    StyleVariables | undefined
  >(undefined)
  const popperRef = useRef<HTMLDivElement>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null)

  // To avoid multiple calculations on the initial render,
  // because ResizeObserver is triggered when observing starts.
  const initialRender = useRef(true)

  // Portal renders asynchronously. Use this variable to avoid multiple handler registrations.
  const initialized = useRef(false)

  const [PopperPortalRoot, getPopperPortalRootProps] = useSlot({
    style,
    elementType: PresenceMotion,
    shouldForwardComponent: false,
    additionalProps: {
      open,
      ref: popperRef,
      style: styleVariables as CSSProperties,
    },
  })

  const calcPopperPos = useEvent(
    (triggerRect: DOMRect, popperRect: DOMRect) => {
      let top: number
      let left: number

      const win = ownerWindow(triggerRef.current)

      const calcTop = () =>
        triggerRect.top - popperRect.height - offset + win.scrollY
      const calcLeft = () =>
        triggerRect.left - popperRect.width - offset + win.scrollX
      const calcRight = () => triggerRect.right + offset + win.scrollX
      const calcBottom = () => triggerRect.bottom + offset + win.scrollY

      const calcHorizontalStart = () => triggerRect.left + win.scrollX
      const calcHorizontalCenter = () =>
        triggerRect.left +
        win.scrollX +
        triggerRect.width / 2 -
        popperRect.width / 2
      const calcHorizontalEnd = () =>
        triggerRect.right - popperRect.width + win.scrollX

      const calcVerticalStart = () => triggerRect.top + win.scrollY
      const calcVerticalCenter = () =>
        triggerRect.top +
        win.scrollY +
        triggerRect.height / 2 -
        popperRect.height / 2
      const calcVerticalEnd = () =>
        triggerRect.bottom - popperRect.height + win.scrollY

      switch (placement) {
        case 'top':
          top = calcPosWithFallback(calcTop, calcBottom, win.scrollY)
          left = calcPosWithFallback(calcHorizontalCenter, win.scrollX)
          break
        case 'top-start':
          top = calcPosWithFallback(calcTop, calcBottom, win.scrollY)
          left = calcPosWithFallback(calcHorizontalStart, win.scrollX)
          break
        case 'top-end':
          top = calcPosWithFallback(calcTop, calcBottom, win.scrollY)
          left = calcPosWithFallback(
            calcHorizontalEnd,
            calcHorizontalStart,
            win.scrollX,
          )
          break
        case 'left':
          left = calcPosWithFallback(calcLeft, calcRight, win.scrollX)
          top = calcPosWithFallback(calcVerticalCenter, win.scrollY)
          break
        case 'left-start':
          left = calcPosWithFallback(calcLeft, calcRight, win.scrollX)
          top = calcPosWithFallback(calcVerticalStart, win.scrollY)
          break
        case 'left-end':
          left = calcPosWithFallback(calcLeft, calcRight, win.scrollX)
          top = calcPosWithFallback(
            calcVerticalEnd,
            calcVerticalStart,
            win.scrollY,
          )
          break
        case 'right':
          left = calcPosWithFallback(calcRight, calcLeft, win.scrollX)
          top = calcPosWithFallback(calcVerticalCenter, win.scrollY)
          break
        case 'right-start':
          left = calcPosWithFallback(calcRight, calcLeft, win.scrollX)
          top = calcPosWithFallback(calcVerticalStart, win.scrollY)
          break
        case 'right-end':
          left = calcPosWithFallback(calcRight, calcLeft, win.scrollX)
          top = calcPosWithFallback(
            calcVerticalEnd,
            calcVerticalStart,
            win.scrollY,
          )
          break
        case 'bottom':
          top = calcPosWithFallback(calcBottom, calcTop, win.scrollY)
          left = calcPosWithFallback(calcHorizontalCenter, win.scrollX)
          break
        case 'bottom-start':
          top = calcPosWithFallback(calcBottom, calcTop, win.scrollY)
          left = calcPosWithFallback(calcHorizontalStart, win.scrollX)
          break
        case 'bottom-end':
          top = calcPosWithFallback(calcBottom, calcTop, win.scrollY)
          left = calcPosWithFallback(
            calcHorizontalEnd,
            calcHorizontalStart,
            win.scrollX,
          )
          break
        default:
          top = calcPosWithFallback(calcBottom, calcTop, win.scrollY)
          left = calcPosWithFallback(calcHorizontalCenter, win.scrollX)
          console.warn(
            '[Nex UI] Popper: Invalid placement value, using "bottom" instead.',
          )
          break
      }

      return {
        '--popper-x': `${left}px`,
        '--popper-y': `${top}px`,
      }
    },
  )

  const calcArrowPos = useEvent(
    (triggerRect: DOMRect, popperRect: DOMRect, popperPos: StyleVariables) => {
      const popperX = parseFloat(popperPos['--popper-x'])
      const popperY = parseFloat(popperPos['--popper-y'])

      // 计算 trigger 元素的中心点相对于 popper 的位置
      const triggerCenterX = triggerRect.left + triggerRect.width / 2
      const triggerCenterY = triggerRect.top + triggerRect.height / 2

      switch (placement) {
        case 'top':
        case 'top-start':
        case 'top-end':
          return {
            '--popper-arrow-x': `${triggerCenterX - popperX}px`,
            '--popper-arrow-y': `${popperRect.height}px`,
            '--popper-arrow-transform': 'rotate(45deg)', // 指向上方
          }
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
          return {
            '--popper-arrow-x': `${triggerCenterX - popperX}px`,
            '--popper-arrow-y': `0px`,
            '--popper-arrow-transform': 'rotate(45deg)', // 指向下方
          }
        case 'left':
        case 'left-start':
        case 'left-end':
          return {
            '--popper-arrow-x': `${popperRect.width}px`,
            '--popper-arrow-y': `${triggerCenterY - popperY}px`,
            '--popper-arrow-transform': 'rotate(135deg)', // 指向左方
          }
        case 'right':
        case 'right-start':
        case 'right-end':
          return {
            '--popper-arrow-x': `0px`,
            '--popper-arrow-y': `${triggerCenterY - popperY}px`,
            '--popper-arrow-transform': 'rotate(315deg)', // 指向右方
          }
        default:
          return {
            '--popper-arrow-x': `${triggerCenterX - popperX}px`,
            '--popper-arrow-y': `0px`,
            '--popper-arrow-transform': 'rotate(225deg)',
          }
      }
    },
  )

  const calcPos = useEvent(() => {
    const triggerRect = triggerRef.current!.getBoundingClientRect()
    const popperRect = popperRef.current!.getBoundingClientRect()

    const popperPos = calcPopperPos(triggerRect, popperRect)

    if (hasArrowRef.current) {
      const arrowPos = calcArrowPos(triggerRect, popperRect, popperPos)
      return {
        ...popperPos,
        ...arrowPos,
      }
    }

    return {
      ...popperPos,
    }
  })

  const recalcPos = useDebounce(
    () => {
      if (!triggerRef.current || !popperRef.current) {
        setStyleVariables(undefined)
        return
      }

      const updatedPos = calcPos()

      if (
        updatedPos['--popper-x'] !== styleVariables?.['--popper-x'] ||
        updatedPos['--popper-y'] !== styleVariables?.['--popper-y']
      ) {
        setStyleVariables({
          ...updatedPos,
        })
      }
    },
    {
      wait: 100,
    },
  )

  const handleMount = useEvent(() => {
    if (!triggerRef.current || !popperRef.current || initialized.current) {
      return
    }

    const newPos = calcPos()

    setStyleVariables(newPos)

    window.addEventListener('resize', recalcPos)
    window.addEventListener('scroll', recalcPos)

    const resizeObserver = new ResizeObserver((entries) => {
      if (initialRender.current) {
        initialRender.current = false
        return
      }
      for (const entry of entries) {
        if (
          entry.target === triggerRef.current ||
          entry.target === popperRef.current
        ) {
          recalcPos()
        }
      }
    })
    resizeObserver.observe(triggerRef.current)
    resizeObserver.observe(popperRef.current)
    resizeObserverRef.current = resizeObserver

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === triggerRef.current) {
            if (!entry.isIntersecting) {
              recalcPos.cancel()
              setOpen(false)
            }
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      },
    )
    intersectionObserver.observe(triggerRef.current)
    intersectionObserverRef.current = intersectionObserver

    initialized.current = true
  })

  const handleUnmount = useEvent(() => {
    if (initialized.current === false) {
      return
    }

    window.removeEventListener('resize', recalcPos)
    window.removeEventListener('scroll', recalcPos)
    resizeObserverRef.current?.disconnect()
    intersectionObserverRef.current?.disconnect()
    resizeObserverRef.current = null
    intersectionObserverRef.current = null
    recalcPos.cancel()
    setStyleVariables(undefined)
    initialized.current = false
    initialRender.current = true
  })

  const onMount = useEvent(() => {
    // Mainly handle the case where open defaults to true.
    if (open) handleMount()
  })

  const onUnmount = useEvent(() => {
    handleUnmount()
  })

  useEffect(() => {
    if (!open) {
      return
    }

    handleMount()

    return handleUnmount
  }, [handleMount, handleUnmount, open, triggerRef])

  return (
    <Portal onMount={onMount} onUnmount={onUnmount}>
      <PopperPortalRoot {...getPopperPortalRootProps()}>
        {children}
      </PopperPortalRoot>
    </Portal>
  )
}

function calcPosWithFallback(preferred: () => number, threshold: number): number
function calcPosWithFallback(
  preferred: () => number,
  fallback: () => number,
  threshold: number,
): number
function calcPosWithFallback(
  preferred: () => number,
  fallbackOrThreshold: (() => number) | number | undefined,
  threshold?: number,
): number {
  const preferredValue = preferred()

  if (typeof fallbackOrThreshold === 'number') {
    return preferredValue >= fallbackOrThreshold
      ? preferredValue
      : fallbackOrThreshold
  }

  if (
    typeof fallbackOrThreshold === 'function' &&
    typeof threshold === 'number'
  ) {
    return preferredValue >= threshold ? preferredValue : fallbackOrThreshold()
  }

  return preferredValue
}

PopperPositioner.displayName = 'PopperPositioner'
