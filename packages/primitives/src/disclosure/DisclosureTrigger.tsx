'use client'

import { useButton } from '../button'
import { createHook, createPrimitive } from '../utils'
import { useDisclosureRootContext } from './DisclosureContext'
import { openStateAttributeMapping } from './stateAttributeMapping'
import type { HookProps, HTMLElements, RenderProp } from '../utils/types'
import type { DisclosureRootState } from './DisclosureRoot'

export const useDisclosureTrigger = createHook<
  'button',
  DisclosureTriggerOwnProps,
  DisclosureTriggerState
>(function useDisclosureTrigger(props: UseDisclosureTriggerProps) {
  const context = useDisclosureRootContext()

  const { onClick } = props
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    context.setOpen(!context.open)
  }

  props = {
    'aria-controls': context.open ? context.panelId : undefined,
    'aria-expanded': context.open,
    ...props,
    disabled: props.disabled || context.disabled,
    onClick: handleClick,
  }
  ;({ props } = useButton(props))

  return {
    props,
    state: context.state,
  }
})

export function DisclosureTrigger({
  render,
  ...other
}: DisclosureTriggerProps) {
  const { props, state } = useDisclosureTrigger(other)

  return createPrimitive('button', props, {
    render,
    state,
    stateAttributesMapping: {
      open: openStateAttributeMapping,
    },
  })
}

interface DisclosureTriggerOwnProps {}

export interface DisclosureTriggerState extends DisclosureRootState {}

export type UseDisclosureTriggerProps<Element extends HTMLElements = 'button'> =
  HookProps<Element, DisclosureTriggerOwnProps>

export interface DisclosureTriggerProps extends UseDisclosureTriggerProps {
  render?: RenderProp<DisclosureTriggerState>
}
