'use client'

import { useControlledState } from '@nex-ui/hooks'
import { useMemo, useState } from 'react'
import { createHook, createPrimitive } from '../utils'
import { DisclosureRootProvider } from './DisclosureContext'
import { openStateAttributeMapping } from './stateAttributeMapping'
import type { HookProps, HTMLElements, RenderProp } from '../utils/types'

export const useDisclosureRoot = createHook<
  'div',
  DisclosureRootOwnProps,
  DisclosureRootState
>(function useDisclosureRoot({
  disabled = false,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: UseDisclosureRootProps) {
  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  const [panelId, setPanelId] = useState<string>()

  const state: DisclosureRootState = useMemo(
    () => ({ open, disabled }),
    [open, disabled],
  )

  const context = useMemo(
    () => ({ open, disabled, setOpen, panelId, setPanelId, state }),
    [disabled, open, panelId, setOpen, state],
  )

  return {
    props,
    state,
    provider: (element: React.ReactNode) => (
      <DisclosureRootProvider value={context}>{element}</DisclosureRootProvider>
    ),
  }
})

export function DisclosureRoot({ render, ...other }: DisclosureRootProps) {
  const { props, state, provider } = useDisclosureRoot(other)

  return createPrimitive('div', props, {
    render,
    state,
    provider,
    stateAttributesMapping: {
      open: openStateAttributeMapping,
    },
  })
}

interface DisclosureRootOwnProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
}

export type UseDisclosureRootProps<Element extends HTMLElements = 'div'> =
  HookProps<Element, DisclosureRootOwnProps>

export interface DisclosureRootState {
  open: boolean
  disabled: boolean
}

export interface DisclosureRootProps extends UseDisclosureRootProps {
  render?: RenderProp<DisclosureRootState>
}
