import type { TooltipRecipeVariants } from '../../theme/recipes'
import type { ReactNode, ElementType } from 'react'
import type { DOMMotionComponents } from 'motion/react'
import type { PopperProps } from '../popper'
import type {
  ComponentSlotClasses,
  OverrideProps,
  ComponentPropsWithCommonProps,
} from '../../types/utils'

export interface TooltipPropsOverrides {}

type TooltipSlotProps = {
  content?: ComponentPropsWithCommonProps<'div'>
}

export type TooltipOwnProps<RootComponent extends ElementType> = {
  children?: ReactNode
  content?: ReactNode
  as?: RootComponent
  action?: 'click' | 'hover' | 'focus'
  color?: TooltipRecipeVariants['color']
  size?: TooltipRecipeVariants['size']
  radius?: TooltipRecipeVariants['radius']
  classNames?: ComponentSlotClasses<keyof TooltipSlotProps>
  slotProps?: TooltipSlotProps
} & PopperProps

export type TooltipProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = OverrideProps<
  RootComponent,
  TooltipOwnProps<RootComponent>,
  TooltipPropsOverrides
>
