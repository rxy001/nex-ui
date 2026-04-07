import type { ElementType, ReactElement, ReactNode } from 'react'
import type { CSSObject, Interpolation } from '@nex-ui/system'
import type { HTMLMotionProps } from 'motion/react'
import type { ClassValue } from 'clsx'
import type { FocusTrapProps } from '../focusTrap'
import type { PopperContentProps, PopperProps } from '../popper'
import type {
  ComponentSlotClasses,
  OverrideProps,
  SlotProps,
} from '../../types/utils'
import type { PopoverContentVariants } from '../../themes/recipes'
import type { PopperAnchorProps, PopperPortalProps } from '../popper/types'
import type { Placement } from '../utils'

// ------------------- PopoverProps -------------------
interface PopoverOwnProps extends PopperProps {
  /**
   * If true, the Popover is shown by default. (uncontrolled)
   */
  defaultOpen?: boolean
}

export interface PopoverPropsOverrides {}

export interface PopoverProps extends PopoverOwnProps, PopoverPropsOverrides {}

// ------------------- PopoverContentProps -------------------
interface PopoverContentSlotProps {
  paper: SlotProps<'div'>
}

interface PopoverContentOwnProps<RootComponent extends ElementType = 'div'>
  extends Pick<FocusTrapProps, 'restoreFocus' | 'autoFocus'>,
    Pick<PopperPortalProps, 'container'>,
    Pick<
      PopperContentProps,
      | 'closeOnEscape'
      | 'closeOnDetached'
      | 'placement'
      | 'offset'
      | 'flip'
      | 'shift'
    > {
  /**
   * The component or element to render as the root.
   *
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * The border radius of the Popover.
   *
   * @default 'md'
   */
  radius?: PopoverContentVariants['radius']

  /**
   * The size of the Popover.
   *
   * @default 'md'
   */
  size?: PopoverContentVariants['size']

  /**
   * The color of the Popover.
   *
   * @default 'default'
   */
  color?: PopoverContentVariants['color']

  /**
   * If true, disables the animation for the Popover.
   *
   * @default false
   */
  disableAnimation?: boolean

  /**
   * The props to modify the framer motion animation.
   */
  motionProps?: HTMLMotionProps<'div'>

  /**
   * The props used for each slot.
   */
  slotProps?: PopoverContentSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof PopoverContentSlotProps>

  /**
   * If true, traps focus within the Popover when open.
   *
   * @default true
   */
  loopFocus?: boolean

  /**
   * The maximum width of the Popover.
   *
   * @default 300
   */
  maxWidth?: CSSObject['maxWidth']

  /**
   * The width of the Popover.
   */
  width?: CSSObject['width']

  /**
   * The minimum width of the Popover.
   */
  minWidth?: CSSObject['minWidth']

  /**
   * If true, keeps the Popover mounted in the DOM when not open.
   *
   * @default false
   */
  keepMounted?: boolean
}

export interface PopoverContentPropsOverrides {}

export type PopoverContentProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    PopoverContentOwnProps<RootComponent>,
    PopoverContentPropsOverrides
  >

// ------------------- PopoverTriggerProps -------------------
export interface PopoverTriggerProps {
  /**
   * The trigger element that opens the Popover when clicked.
   */
  children?: PopperAnchorProps['children']

  /**
   * If true, closes the Popover when the trigger is clicked while the Popover is open.
   *
   * @default true
   */
  closeOnClick?: boolean
}

// ------------------- PopoverCloseProps -------------------
export interface PopoverCloseProps {
  children?: ReactElement<{}>
}

export type PopoverPaperMotionProps = {
  children?: ReactNode
  motionProps?: PopoverContentOwnProps['motionProps']
  placement: Placement
  onAnimationComplete?: HTMLMotionProps<'div'>['onAnimationComplete']
  onAnimationStart?: HTMLMotionProps<'div'>['onAnimationStart']
}
