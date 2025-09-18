'use client'

import { useControlledState } from '@nex-ui/hooks'
import { useMemo, useRef } from 'react'
import { PopupProvider } from './PopupContext'
import type { PopupProps } from './types'

export const Popup = (props: PopupProps) => {
  const { children, open: openProp, defaultOpen = false, onOpenChange } = props
  const triggerRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  const ctx = useMemo(
    () => ({ open, setOpen, defaultOpen, onOpenChange, triggerRef }),
    [open, setOpen, defaultOpen, onOpenChange],
  )

  return <PopupProvider value={ctx}>{children}</PopupProvider>
}

Popup.displayName = 'Popup'
