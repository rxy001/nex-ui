import type { ElementType } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type { DOMMotionComponents } from 'motion/react'
import type { FocusTrapProps } from '../focusTrap'
import type {
  PopperCloseProps,
  PopperProps,
  PopperRootProps,
  PopperTriggerProps,
} from '../popper'
import type { OverrideProps, HTMLMotionProps } from '../../types/utils'
import type { PopoverContentVariants } from '../../theme/recipes'

type PopoverOwnProps<RootComponent extends ElementType> = Pick<
  PopperRootProps,
  | 'container'
  | 'keepMounted'
  | 'closeOnEscape'
  | 'placement'
  | 'offset'
  | 'flip'
  | 'shift'
  | 'closeOnDetached'
> &
  Omit<PopperProps, 'openDelay' | 'closeDelay'> &
  Pick<FocusTrapProps, 'restoreFocus'> & {
    /**
     * The component used for the root element.
     * @default m.div
     */
    as?: RootComponent

    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: Interpolation

    /**
     * Additional class names to apply to the root element.
     */
    className?: ClassValue

    /**
     * The motion properties of the popover.
     */
    motionProps?: HTMLMotionProps<'div'>

    /**
     * The delay in milliseconds before the popover opens.
     *
     * @default 0
     */
    openDelay?: number

    /**
     * The delay in milliseconds before the popover closes.
     *
     * @default 0
     */
    closeDelay?: number
  }

export interface PopoverPropsOverrides {}

export type PopoverProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = OverrideProps<
  RootComponent,
  PopoverOwnProps<RootComponent>,
  PopoverPropsOverrides
>

type PopoverContentOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root element.
   */
  className?: ClassValue

  /**
   * The radius of the popover.
   *
   * @default 'md'
   */
  radius?: PopoverContentVariants['radius']

  /**
   * The color of the popover.
   *
   * @default 'default'
   */
  color?: PopoverContentVariants['color']
}

export interface PopoverContentPropsOverrides {}

export type PopoverContentProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    PopoverContentOwnProps<RootComponent>,
    PopoverContentPropsOverrides
  >

export type PopoverTriggerProps = Omit<
  PopperTriggerProps,
  'action' | 'elementProps' | 'interactive'
>

export type PopoverCloseProps = PopperCloseProps
