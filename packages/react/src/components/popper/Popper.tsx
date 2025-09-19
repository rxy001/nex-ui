'use client'

import { useControlledState } from '@nex-ui/hooks'
import { useMemo, useRef } from 'react'
import { PopperProvider } from './PopperContext'
import type { PopperProps } from './types'

export const Popper = (props: PopperProps) => {
  const { children, open: openProp, defaultOpen = false, onOpenChange } = props
  const triggerRef = useRef<HTMLDivElement>(null)
  const hasArrowRef = useRef<boolean>(false)

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  const ctx = useMemo(
    () => ({
      open,
      setOpen,
      defaultOpen,
      triggerRef,
      hasArrowRef,
    }),
    [open, setOpen, defaultOpen],
  )

  return <PopperProvider value={ctx}>{children}</PopperProvider>
}

Popper.displayName = 'Popper'
