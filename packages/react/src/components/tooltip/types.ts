import type { ReactNode, ElementType } from 'react'
import type { CSSObject, Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type { HTMLMotionProps } from 'motion/react'
import type { PopperContentProps, PopperProps } from '../popper'
import type { TooltipRecipeVariants } from '../../themes/recipes'
import type {
  ComponentSlotClasses,
  OverrideProps,
  SlotProps,
} from '../../types/utils'
import type { PopperAnchorProps, PopperPortalProps } from '../popper/types'
import type { Placement } from '../utils'

export interface TooltipPropsOverrides {}

interface TooltipSlotProps {
  paper?: SlotProps<'div'>
}

export interface TooltipOwnProps<RootComponent extends ElementType = 'div'>
  extends PopperProps,
    Pick<PopperPortalProps, 'container'>,
    Pick<
      PopperContentProps,
      | 'closeOnEscape'
      | 'closeOnDetached'
      | 'placement'
      | 'offset'
      | 'shift'
      | 'flip'
    > {
  /**
   * The trigger element of Tooltip.
   */
  children?: PopperAnchorProps['children']

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The content shown by Tooltip.
   */
  content?: ReactNode

  /**
   * The component or element to render as the root.
   *
   * @default 'div'
   */
  as?: RootComponent

  /**
   * If true, keeps the Tooltip open when interacting with its content.
   *
   * @default false
   */
  interactive?: boolean

  /**
   * The color of the Tooltip.
   *
   * @default 'default'
   */
  color?: TooltipRecipeVariants['color']

  /**
   * The size of the Tooltip.
   *
   * @default 'md'
   */
  size?: TooltipRecipeVariants['size']

  /**
   * The border radius of the Tooltip.
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

  /**
   * The maximum width of the Tooltip.
   *
   * @default 300
   */
  maxWidth?: CSSObject['maxWidth']

  /**
   * The width of the Tooltip.
   *
   * @default 'max-content'
   */
  width?: CSSObject['width']

  /**
   * The minimum width of the Tooltip.
   */
  minWidth?: CSSObject['minWidth']

  /**
   * If true, opens the Tooltip by default. (uncontrolled)
   */
  defaultOpen?: boolean

  /**
   * Delay in milliseconds before showing Tooltip.
   *
   * @default 100
   */
  openDelay?: number

  /**
   * Delay in milliseconds before hiding Tooltip.
   *
   * @default 100
   */
  closeDelay?: number

  /**
   * If true, disables the animation for the Tooltip.
   *
   * @default false
   */
  disableAnimation?: boolean

  /**
   * The props to modify the framer motion animation.
   */
  motionProps?: HTMLMotionProps<'div'>

  /**
   * If true, keeps the Tooltip mounted in the DOM when not open.
   *
   * @default false
   */
  keepMounted?: boolean

  /**
   * If true, closes the Tooltip when the trigger is clicked while the Tooltip is open.
   *
   * @default true
   */
  closeOnClick?: boolean
}

export type TooltipProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    TooltipOwnProps<RootComponent>,
    TooltipPropsOverrides
  >

export interface TooltipPaperMotionProps {
  children?: ReactNode
  motionProps?: TooltipOwnProps['motionProps']
  placement: Placement
  onAnimationComplete?: HTMLMotionProps<'div'>['onAnimationComplete']
  onAnimationStart?: HTMLMotionProps<'div'>['onAnimationStart']
}
