import type { ReactNode, ElementType } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { DOMMotionComponents } from 'motion/react'
import type { PopperProps } from '../popper'
import type { TooltipRecipeVariants } from '../../theme/recipes'
import type {
  ComponentSlotClasses,
  OverrideProps,
  ComponentPropsWithCommonProps,
  HTMLMotionProps,
} from '../../types/utils'

export interface TooltipPropsOverrides {}

type TooltipSlotProps = {
  content?: ComponentPropsWithCommonProps<'div'>
}

export type TooltipOwnProps<RootComponent extends ElementType> = {
  /**
   * The children to render. Usually a trigger element.
   */
  children?: ReactNode

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The content to render inside the tooltip.
   */
  content?: ReactNode

  /**
   * The component used for the root element.
   * @default m.div
   */
  as?: RootComponent

  /**
   * If true, keeps the tooltip open when interacting with its content.
   *
   * @default true
   */
  interactive?: boolean

  /**
   * If true, closes the tooltip when clicking the trigger element.
   *
   * @default true
   */
  closeOnClick?: boolean

  /**
   * The motion properties of the tooltip.
   */
  motionProps?: HTMLMotionProps<'div'>

  /**
   * The color of the tooltip.
   *
   * @default 'default'
   */
  color?: TooltipRecipeVariants['color']

  /**
   * The size of the tooltip.
   *
   * @default 'md'
   */
  size?: TooltipRecipeVariants['size']

  /**
   * The radius of the tooltip.
   *
   * @default 'md'
   */
  radius?: TooltipRecipeVariants['radius']

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof TooltipSlotProps>

  /**
   * The props used for each slot.
   */
  slotProps?: TooltipSlotProps
} & PopperProps

export type TooltipProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = OverrideProps<
  RootComponent,
  TooltipOwnProps<RootComponent>,
  TooltipPropsOverrides
>
