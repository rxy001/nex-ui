import { createHook, createPrimitive } from '../utils'
import { useAccordionItemContext } from './AccordionContext'
import type { HTMLElements, HookProps, RenderProp } from '../utils/types'
import type { AccordionItemState } from './AccordionItem'

export const useAccordionHeader = createHook<
  'h3',
  AccordionHeaderOwnProps,
  AccordionHeaderState
>(function useAccordionHeader(props: UseAccordionHeaderProps) {
  const { state } = useAccordionItemContext()

  return {
    props,
    state,
  }
})

export function AccordionHeader({ render, ...other }: AccordionHeaderProps) {
  const { props, state } = useAccordionHeader(other)

  return createPrimitive('h3', props, {
    render,
    state,
  })
}

interface AccordionHeaderOwnProps {}

export interface AccordionHeaderState extends AccordionItemState {}

export type UseAccordionHeaderProps<Element extends HTMLElements = 'h3'> =
  HookProps<Element, AccordionHeaderOwnProps>

export interface AccordionHeaderProps extends UseAccordionHeaderProps {
  render?: RenderProp<AccordionHeaderState>
}
