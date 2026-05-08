import { createContext } from '@nex-ui/utils'
import type { DefaultValue } from './AccordionRoot'
import type { AccordionItemState } from './AccordionItem'

export interface AccordionRootContextValue<
  Value extends React.Key = DefaultValue,
> {
  value: Value[]
  handleValueChange: (value: Value) => void
  disabled: boolean
}

export const [AccordionRootProvider, useAccordionRootContext] =
  createContext<AccordionRootContextValue>({
    contextName: 'AccordionRootContext',
    hookName: 'useAccordionRootContext',
    providerName: 'AccordionRootProvider',
    strict: true,
  })

export interface AccordionitemContext<Value extends React.Key = DefaultValue> {
  value: Value
  disabled: boolean
  state: AccordionItemState
}

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<AccordionitemContext>({
    contextName: 'AccordionItemContext',
    hookName: 'useAccordionItemContext',
    providerName: 'AccordionItemProvider',
    strict: true,
  })
