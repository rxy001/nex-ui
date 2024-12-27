import type { HTMLAttributes, ReactNode } from 'react'
import type { AvatarVariants } from '../../theme/recipes'
import type { ComponentUtilityClasses, StyledComponentProps } from '../types'

export interface AvatarProps
  extends StyledComponentProps<
    HTMLAttributes<HTMLDivElement> & AvatarVariants
  > {
  children?: ReactNode
  alt?: string
  src?: string
  srcSet?: string
  // eslint-disable-next-line no-use-before-define
  classes?: ComponentUtilityClasses<AvatarOwnerState, 'root' | 'img'>
}

export interface AvatarOwnerState extends AvatarProps {}

export type UseLoadedOptions = {
  src?: string
  srcSet?: string
}
