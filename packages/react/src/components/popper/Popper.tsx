'use client'

import { useControlledState, useDebounce, useUnmount } from '@nex-ui/hooks'
import { useCallback, useMemo, useRef, useId, useEffect } from 'react'
import { PopperProvider } from './PopperContext'
import { PopperManager } from './PopperManager'
import type { PopperProps } from './types'
import type { PopperContextValue } from './PopperContext'

const popperManager = new PopperManager()

export const Popper = (props: PopperProps) => {
  const {
    children,
    onOpenChange,
    container,
    shift,
    flip,
    offset,
    open: openProp,
    openDelay = 100,
    closeDelay = 100,
    keepMounted = false,
    defaultOpen = false,
    closeOnEscape = true,
    placement = 'top',
  } = props
  const referenceRef = useRef<HTMLDivElement>(null)
  const popperRootRef = useRef<HTMLDivElement>(null)
  const id = useId()

  const popperRootId = `nui-popper-${id}`

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  const debouncedOpenPopper = useDebounce(
    () => {
      if (!open) setOpen(true)
    },
    {
      wait: openDelay,
    },
  )

  const debouncedClosePopper = useDebounce(
    () => {
      if (open) setOpen(false)
    },
    {
      wait: closeDelay,
    },
  )

  const handleOpen = useCallback(() => {
    debouncedClosePopper.cancel()
    debouncedOpenPopper()
    popperManager.flush(id)
  }, [debouncedClosePopper, debouncedOpenPopper, id])

  const handleClose = useCallback(() => {
    debouncedOpenPopper.cancel()
    debouncedClosePopper()
  }, [debouncedClosePopper, debouncedOpenPopper])

  useUnmount(() => {
    debouncedClosePopper.cancel()
    debouncedOpenPopper.cancel()
  })

  const ctx = useMemo<PopperContextValue>(
    () => ({
      open,
      setOpen,
      referenceRef,
      popperRootRef,
      container,
      offset,
      placement,
      flip,
      shift,
      keepMounted,
      closeOnEscape,
      openDelay,
      closeDelay,
      handleOpen,
      handleClose,
      popperRootId,
    }),
    [
      open,
      setOpen,
      container,
      offset,
      placement,
      flip,
      shift,
      keepMounted,
      closeOnEscape,
      openDelay,
      closeDelay,
      handleOpen,
      handleClose,
      popperRootId,
    ],
  )

  useEffect(() => {
    if (open) {
      popperManager.register(id, debouncedClosePopper.flush)

      return () => popperManager.unregister(id)
    }
  }, [debouncedClosePopper.flush, id, open])

  return <PopperProvider value={ctx}>{children}</PopperProvider>
}

Popper.displayName = 'Popper'
