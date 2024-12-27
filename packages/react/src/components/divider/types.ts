import type { HtmlHTMLAttributes } from 'react'
import type { StyledComponentProps, ComponentUtilityClasses } from '../types'
import type { DividerVariants } from '../../theme/recipes'

export interface DividerProps
  extends StyledComponentProps<HtmlHTMLAttributes<HTMLHRElement>>,
    DividerVariants {
  // eslint-disable-next-line no-use-before-define
  classes?: ComponentUtilityClasses<DividerOwnerState, 'root'>
}

export interface DividerOwnerState extends DividerProps {}
