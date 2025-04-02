import type { ElementType } from 'react'
import type { OverrideProps, SxProps } from '../../types/utils'

export interface AccordionPropsOverrides {}

type AccordionOwnProps<RootComponent extends ElementType = 'div'> = {
  as?: RootComponent
  sx?: SxProps<AccordionOwnerState<RootComponent>>
}

export type AccordionProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AccordionOwnProps<RootComponent>,
    AccordionPropsOverrides
  >

export type AccordionOwnerState<RootComponent extends ElementType = 'div'> =
  AccordionProps<RootComponent>
