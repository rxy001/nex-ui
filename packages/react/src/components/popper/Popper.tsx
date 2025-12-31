'use client'

import {
  useControlledState,
  useDebounce,
  useEvent,
  useUnmount,
} from '@nex-ui/hooks'
import { useCallback, useMemo, useRef, useId, useEffect } from 'react'
import { PopperProvider } from './PopperContext'
import { PopperManager } from './PopperManager'
import type { PopperProps } from './types'
import type { PopperContextValue } from './PopperContext'

const popperManager = new PopperManager()

/**
 * Popper is a lower-level construct that is leveraged by the following components:
 *
 * - Tooltip
 * - Popover
 * - Menu
 */

export const Popper = (props: PopperProps) => {
  const {
    children,
    onOpenChange,
    onClose,
    open: openProp,
    openDelay = 100,
    closeDelay = 100,
    defaultOpen = false,
  } = props
  const referenceRef = useRef<HTMLDivElement>(null)
  const popperRootRef = useRef<HTMLDivElement>(null)
  const id = useId()

  const [open, setOpenImpl] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )
  const previousOpenRef = useRef(open)

  const setOpen = useEvent((value: boolean) => {
    setOpenImpl(value)
    if (previousOpenRef.current && !value) {
      onClose?.()
    }
    previousOpenRef.current = value
  })

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

  const delayOpen = useCallback(() => {
    debouncedClosePopper.cancel()
    popperManager.flush(id)
    debouncedOpenPopper()
  }, [debouncedClosePopper, debouncedOpenPopper, id])

  const delayClose = useCallback(() => {
    debouncedOpenPopper.cancel()
    debouncedClosePopper()
  }, [debouncedClosePopper, debouncedOpenPopper])

  useUnmount(() => {
    debouncedClosePopper.cancel()
    debouncedOpenPopper.cancel()
  })

  const handleOpen = useEvent((value: boolean) => {
    debouncedClosePopper.cancel()
    debouncedOpenPopper.cancel()
    setOpen(value)
  })

  const ctx = useMemo<PopperContextValue>(
    () => ({
      open,
      referenceRef,
      popperRootRef,
      delayOpen,
      delayClose,
      setOpen: handleOpen,
    }),
    [delayClose, delayOpen, open, handleOpen],
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
