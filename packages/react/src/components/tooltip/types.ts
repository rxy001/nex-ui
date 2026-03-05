import type { ReactNode, ElementType } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type { PopperContentProps, PopperProps } from '../popper'
import type { TooltipRecipeVariants } from '../../theme/recipes'
import type {
  ComponentSlotClasses,
  OverrideProps,
  SlotProps,
} from '../../types/utils'
import type { PopperAnchorProps, PopperPortalProps } from '../popper/types'
import type { ScaleFloatingMotionProps } from '../scaleFloatingMotion'

export interface TooltipPropsOverrides {}

type TooltipSlotProps = {
  paper?: SlotProps<'div'>
}

export type TooltipOwnProps<RootComponent extends ElementType> = PopperProps &
  Pick<PopperPortalProps, 'container' | 'keepMounted'> &
  Pick<
    PopperContentProps,
    | 'closeOnEscape'
    | 'closeOnDetached'
    | 'placement'
    | 'offset'
    | 'shift'
    | 'flip'
  > & {
    /**
     * The children to render. Usually a trigger element.
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
     * The content to render inside the Tooltip.
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
     * The props to modify the framer motion animation.
     */
    motionProps?: ScaleFloatingMotionProps['motionProps']

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
     */
    maxWidth?: string | number

    /**
     * If true, the Tooltip is shown by default. (uncontrolled)
     */
    defaultOpen?: boolean

    /**
     * The delay in milliseconds before the Tooltip opens.
     *
     * @default 100
     */
    openDelay?: number

    /**
     * The delay in milliseconds before the Tooltip closes.
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
  }

export type TooltipProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    TooltipOwnProps<RootComponent>,
    TooltipPropsOverrides
  >
