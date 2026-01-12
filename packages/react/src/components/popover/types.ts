import type { ElementType, ReactElement } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type { FocusTrapProps } from '../utils'
import type {
  PopperContentProps,
  PopperProps,
  PopperRootProps,
} from '../popper'
import type { OverrideProps } from '../../types/utils'
import type { PopoverContentVariants } from '../../theme/recipes'
import type { PopperMotionProps, PopperPortalProps } from '../popper/types'

// ------------------- PopoverProps -------------------
type PopoverOwnProps<RootComponent extends ElementType> = PopperProps &
  Pick<
    PopperRootProps,
    | 'placement'
    | 'offset'
    | 'flip'
    | 'shift'
    | 'onEscapeKeyDown'
    | 'onFocusOutside'
    | 'onInteractOutside'
    | 'onPointerDownOutside'
    | 'closeOnDetached'
    | 'closeOnEscape'
  > &
  Omit<PopperPortalProps, 'children'> &
  Pick<FocusTrapProps, 'restoreFocus' | 'loop'> & {
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
     * The props to modify the framer motion animation.
     */
    motionProps?: PopperMotionProps

    /**
     * If true, the Popover is shown by default. (uncontrolled)
     */
    defaultOpen?: boolean
  }

export interface PopoverPropsOverrides {}

export type PopoverProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    PopoverOwnProps<RootComponent>,
    PopoverPropsOverrides
  >

// ------------------- PopoverContentProps -------------------
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

// ------------------- PopoverTriggerProps -------------------
export interface PopoverTriggerProps {
  /**
   * The content of the trigger element.
   */
  children?: ReactElement<any>

  /**
   * If true, closes the Popper when clicking the trigger element.
   *
   * @default true
   */
  closeOnClick?: boolean
}

// ------------------- PopoverCloseProps -------------------
export interface PopoverCloseProps {
  children?: ReactElement<any>
}
