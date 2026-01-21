import type { ElementType, ReactElement } from 'react'
import type { CSSObject, Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type { FocusTrapProps } from '../focusTrap'
import type { PopperContentProps, PopperProps } from '../popper'
import type { HTMLMotionProps, OverrideProps } from '../../types/utils'
import type { PopoverContentVariants } from '../../theme/recipes'
import type { PopperAnchorProps, PopperPortalProps } from '../popper/types'

// ------------------- PopoverProps -------------------
type PopoverOwnProps<RootComponent extends ElementType> = PopperProps &
  Pick<PopperPortalProps, 'keepMounted' | 'container'> & {
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
    motionProps?: HTMLMotionProps<'div'>

    /**
     * If true, the Popover is shown by default. (uncontrolled)
     */
    defaultOpen?: boolean

    /**
     * If true, disables the animation for the Popover.
     */
    disableAnimation?: boolean
  } & Pick<
    PopperContentProps,
    | 'closeOnEscape'
    | 'closeOnDetached'
    | 'onPointerDownOutside'
    | 'onEscapeKeyDown'
    | 'onFocusOutside'
    | 'onInteractOutside'
    | 'placement'
    | 'offset'
    | 'flip'
    | 'shift'
  >

export interface PopoverPropsOverrides {}

export type PopoverProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    PopoverOwnProps<RootComponent>,
    PopoverPropsOverrides
  >

// ------------------- PopoverContentProps -------------------
type PopoverContentOwnProps<RootComponent extends ElementType> = Pick<
  FocusTrapProps,
  'restoreFocus' | 'loop' | 'autoFocus'
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
   * The maximum width of the popover content.
   *
   * @default 480
   */
  maxWidth?: CSSObject['maxWidth']

  /**
   * The maximum height of the popover content.
   */
  maxHeight?: CSSObject['maxHeight']
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
  children?: ReactElement
}
