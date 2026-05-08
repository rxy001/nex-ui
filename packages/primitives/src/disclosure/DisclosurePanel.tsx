'use client'

import { useId, useLayoutEffect } from 'react'
import { createHook, createPrimitive } from '../utils'
import { useDisclosureRootContext } from './DisclosureContext'
import type { HookProps, HTMLElements, RenderProp } from '../utils/types'
import type { DisclosureRootState } from './DisclosureRoot'

export const useDisclosurePanel = createHook<
  'div',
  DisclosurePanelOwnProps,
  DisclosurePanelState
>(function useDisclosurePanel(props: UseDisclosurePanelProps) {
  const context = useDisclosureRootContext()
  const defaultId = useId()

  const { setPanelId } = context

  useLayoutEffect(() => {
    setPanelId(props.id || defaultId)

    return () => setPanelId(undefined)
  }, [setPanelId, defaultId, props.id])

  props = {
    id: context.panelId,
    ...props,
  }

  return {
    props,
    state: context.state,
  }
})

export function DisclosurePanel({
  render,
  keepMounted = false,
  ...other
}: DisclosurePanelProps) {
  const { props, state } = useDisclosurePanel(other)

  if (!keepMounted && !state.open) return null

  return createPrimitive('div', props, {
    render,
    state,
  })
}

interface DisclosurePanelOwnProps {
  keepMounted?: boolean
}

export interface DisclosurePanelProps extends UseDisclosurePanelProps {
  render?: RenderProp<DisclosurePanelState>
}

export interface DisclosurePanelState extends DisclosureRootState {}

export type UseDisclosurePanelProps<Element extends HTMLElements = 'div'> =
  HookProps<Element, DisclosurePanelOwnProps>
