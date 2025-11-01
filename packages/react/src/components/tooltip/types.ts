import type { ReactNode, ElementType } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { DOMMotionComponents } from 'motion/react'
import type { ClassValue } from 'clsx'
import type {
  PopperContentProps,
  PopperProps,
  PopperRootProps,
} from '../popper'
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

export type TooltipOwnProps<RootComponent extends ElementType> = PopperProps &
  Pick<
    PopperRootProps,
    | 'placement'
    | 'offset'
    | 'shift'
    | 'flip'
    | 'keepMounted'
    | 'container'
    | 'closeOnEscape'
    | 'closeOnDetached'
  > & {
    /**
     * The children to render. Usually a trigger element.
     */
    children?: ReactNode

    /**
     * Additional class names to apply to the root.
     */
    className?: ClassValue

    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: Interpolation

    /**
     * The content to render inside the Tooltip.
     */
    content?: ReactNode

    /**
     * The component or element to render as the root.
     *
     * @default m.div
     */
    as?: RootComponent

    /**
     * If true, keeps the Tooltip open when interacting with its content.
     *
     * @default true
     */
    interactive?: boolean

    /**
     * If true, closes the Tooltip when clicking the trigger element.
     *
     * @default true
     */
    closeOnClick?: boolean

    /**
     * The props to modify the framer motion animation.
     */
    motionProps?: HTMLMotionProps<'div'>

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
     * @default 360
     */
    maxWidth?: PopperContentProps['maxWidth']

    /**
     * The maximum height of the Tooltip.
     */
    maxHeight?: PopperContentProps['maxHeight']
  }

export type TooltipProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = OverrideProps<
  RootComponent,
  TooltipOwnProps<RootComponent>,
  TooltipPropsOverrides
>
