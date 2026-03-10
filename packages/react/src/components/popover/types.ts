import type { ElementType, ReactElement, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { HTMLMotionProps } from 'motion/react'
import type { ClassValue } from 'clsx'
import type { FocusTrapProps } from '../focusTrap'
import type { PopperContentProps, PopperProps } from '../popper'
import type {
  ComponentSlotClasses,
  OverrideProps,
  SlotProps,
} from '../../types/utils'
import type { PopoverContentVariants } from '../../theme/recipes'
import type { PopperAnchorProps, PopperPortalProps } from '../popper/types'
import type { Placement } from '../utils'

// ------------------- PopoverProps -------------------
type PopoverOwnProps = PopperProps & {
  /**
   * If true, the Popover is shown by default. (uncontrolled)
   */
  defaultOpen?: boolean
}

export interface PopoverPropsOverrides {}

export type PopoverProps = PopoverOwnProps & PopoverPropsOverrides

// ------------------- PopoverContentProps -------------------
type PopoverContentSlotProps = {
  paper: SlotProps<'div'>
}

type PopoverContentOwnProps<RootComponent extends ElementType = 'div'> = Pick<
  FocusTrapProps,
  'restoreFocus' | 'autoFocus'
> &
  Pick<PopperPortalProps, 'container'> &
  Pick<
    PopperContentProps,
    | 'closeOnEscape'
    | 'closeOnDetached'
    | 'placement'
    | 'offset'
    | 'flip'
    | 'shift'
  > & {
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
     * The radius of the Popover content.
     *
     * @default 'md'
     */
    radius?: PopoverContentVariants['radius']

    /**
     * The color of the Popover content.
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
     * Use the `variants` API to create your own animation.
     */
    motionProps?:
      | ((placement: Placement) => HTMLMotionProps<'div'>)
      | HTMLMotionProps<'div'>

    /**
     * The props used for each slot.
     */
    slotProps?: PopoverContentSlotProps

    /**
     * The className used for each slot.
     */
    classNames?: ComponentSlotClasses<keyof PopoverContentSlotProps>

    /**
     * If true, the focus will loop within the Popover content.
     *
     * @default true
     */
    loopFocus?: boolean

    /**
     * The maximum width of the popover content.
     *
     * @default 360
     */
    maxWidth?: string | number

    /**
     * The width of the popover content.
     *
     * @default 'auto'
     */
    width?: string | number

    /**
     * If true, keeps the Popover mounted in the DOM when it's closed.
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
   * The content of the trigger element.
   */
  children?: PopperAnchorProps['children']

  /**
   * If true, closes the Popper when clicking the trigger element.
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
