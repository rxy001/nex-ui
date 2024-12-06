import type { HtmlHTMLAttributes, ReactNode } from 'react'
import type { FlexVariants } from '../../theme/recipes'
import type { NexCSSProperties } from '../../theme/types/generated/cssProperties'
import type { ComponentUtilityClasses, StyledComponentProps } from '../types'

export interface FlexProps
  extends StyledComponentProps<
    HtmlHTMLAttributes<HTMLDivElement> & FlexVariants
  > {
  children?: ReactNode
  justify?: NexCSSProperties['justifyContent']
  align?: NexCSSProperties['alignItems']
  direction?: NexCSSProperties['flexDirection']
  wrap?: NexCSSProperties['flexWrap']
  gap?: NexCSSProperties['gap']
  // eslint-disable-next-line no-use-before-define
  classes?: ComponentUtilityClasses<FlexOwnerState, 'root'>
}

export interface FlexOwnerState extends FlexProps {}
