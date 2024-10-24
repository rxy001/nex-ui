import type { HtmlHTMLAttributes, ReactNode } from 'react'
import type { FlexVariants } from '../../theme/styles'
import type {
  NexStyledComponentProps,
  NexCSSProperties,
} from '../../theme/types'
import type { ComponentUtilityClasses } from '../type'

export interface FlexOwnerState
  extends HtmlHTMLAttributes<HTMLDivElement>,
    FlexVariants {
  children?: ReactNode
  justify?: NexCSSProperties['justifyContent']
  align?: NexCSSProperties['alignItems']
  direction?: NexCSSProperties['flexDirection']
  wrap?: NexCSSProperties['flexWrap']
  gap?: NexCSSProperties['gap']
  classes?: ComponentUtilityClasses<FlexOwnerState, 'root'>
}

export interface FlexProps extends NexStyledComponentProps<FlexOwnerState> {}
