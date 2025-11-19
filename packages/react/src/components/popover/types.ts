import type { ElementType } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type { FocusTrapProps } from '../focusTrap'
import type {
  PopperCloseProps,
  PopperContentProps,
  PopperProps,
  PopperRootProps,
  PopperTriggerProps,
} from '../popper'
import type { OverrideProps, HTMLMotionProps } from '../../types/utils'
import type { PopoverContentVariants } from '../../theme/recipes'
import type { PopperMotionProps, PopperPortalProps } from '../popper/types'

type PopoverOwnProps<RootComponent extends ElementType> = Omit<
  PopperProps,
  'openDelay' | 'closeDelay'
> &
  Pick<
    PopperRootProps,
    | 'closeOnEscape'
    | 'placement'
    | 'offset'
    | 'flip'
    | 'shift'
    | 'closeOnDetached'
  > &
  Pick<PopperPortalProps, 'container'> &
  Pick<PopperMotionProps, 'keepMounted'> &
  Pick<FocusTrapProps, 'restoreFocus'> & {
    /**
     * The component or element to render as the root.
     *
     * @default m.div
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
     * The props to modify the framer motion animation.
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

export type PopoverProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    PopoverOwnProps<RootComponent>,
    PopoverPropsOverrides
  >

type PopoverContentOwnProps<RootComponent extends ElementType> = {
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
   * The maximum width of the popover content.
   *
   * @default 480
   */
  maxWidth?: PopperContentProps['maxWidth']

  /**
   * The maximum height of the popover content.
   */
  maxHeight?: PopperContentProps['maxHeight']
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
