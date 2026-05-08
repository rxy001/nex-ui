import { useEvent } from '@nex-ui/hooks'
import { createHook, createPrimitive } from '../utils'
import {
  useAccordionItemContext,
  useAccordionRootContext,
} from './AccordionContext'
import { useButton } from '../button'
import type { HTMLElements, HookProps, RenderProp } from '../utils/types'
import type { AccordionItemState } from './AccordionItem'

export const useAccordionTrigger = createHook<
  'button',
  AccordionTriggerOwnProps,
  AccordionTriggerState
>(function useAccordionTrigger(props: UseAccordionTriggerProps) {
  const itemContext = useAccordionItemContext()
  const rootContext = useAccordionRootContext()

  const { onClick } = props
  const handleClick = useEvent((event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    rootContext.handleValueChange(itemContext.value)
  })

  ;({ props } = useButton(props))

  props = {
    ...props,
    onClick: handleClick,
  }

  const state: AccordionTriggerState = {
    ...itemContext.state,
  }

  return {
    props,
    state,
  }
})

export function AccordionTrigger({ render, ...other }: AccordionTriggerProps) {
  const { props, state } = useAccordionTrigger(other)

  return createPrimitive('button', props, {
    render,
    state,
  })
}

interface AccordionTriggerOwnProps {}

export interface AccordionTriggerState extends AccordionItemState {}

export type UseAccordionTriggerProps<Element extends HTMLElements = 'button'> =
  HookProps<Element, AccordionTriggerOwnProps>

export interface AccordionTriggerProps extends UseAccordionTriggerProps {
  render?: RenderProp<AccordionTriggerState>
}
