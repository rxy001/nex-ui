import type { ReactNode, ElementType, ComponentProps } from 'react'
import type { ClassValue } from 'clsx'
import type { CSSObject, Interpolation } from '@nex-ui/system'
import type { PortalProps } from '@nex-ui/utils'
import type {
  Placement,
  FlipOptions,
  OffsetOptions,
  UseDismissHandlersProps,
} from '../utils'
import type { HTMLMotionProps, Overwrite } from '../../types/utils'

// ----------------- PopperProps -----------------
export type PopperProps = {
  /**
   * The content of the Popper.
   */
  children?: ReactNode

  /**
   * If true, the Popper is shown. (controlled)
   */
  open?: boolean

  /**
   * If true, the Popper is shown by default. (uncontrolled)
   */
  defaultOpen?: boolean

  /**
   * Handler that is called when the Popper is opened or closed.
   */
  onOpenChange?: (open: boolean) => void

  /**
   * The delay in milliseconds before the Popper opens.
   *
   * @default 100
   */
  openDelay?: number

  /**
   * The delay in milliseconds before the Popper closes.
   *
   * @default 100
   */
  closeDelay?: number

  /**
   * Callback function that is called when the Popper is closed.
   */
  onClose?: () => void
}

// ----------------- PopperTriggerProps -----------------
export type PopperTriggerProps = {
  /**
   * The content of the trigger element.
   */
  children?: ReactNode

  /**
   * If true, closes the Popper when clicking the trigger element.
   *
   * @default true
   */
  closeOnClick?: boolean

  elementProps?: Record<string, any>
}

type PopperSlotProps<RootComponent extends ElementType> = Overwrite<
  ComponentProps<RootComponent>,
  {
    as?: RootComponent
    sx?: Interpolation
    className?: ClassValue
  }
>

// ----------------- PopperRootProps -----------------
type PopperRootOwnProps = UseDismissHandlersProps & {
  /**
   * The placement of the Popper relative to the trigger element.
   *
   * @default 'top'
   */
  placement?: Placement

  /**
   * Changes the placement of the Popper to keep it in view.
   *
   * @default { mainAxis: true, crossAxis: true }
   */
  flip?: FlipOptions | false

  /**
   * Shifts the Popper to keep it in view.
   *
   * @default true
   */
  shift?: boolean

  /**
   * Translates the Popper along the specified axes.
   *
   * @default 5
   */
  offset?: OffsetOptions | false

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * If true, closes the Popper when the escape key is pressed.
   *
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * If true, closes the Popper when the reference element is detached from the viewport.
   *
   * @default true
   */
  closeOnDetached?: boolean
}

export type PopperRootProps<RootComponent extends ElementType = 'div'> =
  PopperSlotProps<RootComponent> & PopperRootOwnProps

// ----------------- PopperPortalProps -----------------
export type PopperPortalProps = Pick<PortalProps, 'container' | 'children'> & {
  /**
   * If true, keeps the popper mounted in the DOM when it's closed.
   *
   * @default false
   */
  keepMounted?: boolean

  /**
   * If true, disables the animation for the Popper.
   *
   * @default false
   */
  disableAnimation?: boolean
}

// ----------------- PopperMotionProps -----------------
export type PopperMotionProps = HTMLMotionProps<'div'>

// ----------------- PopperContentProps -----------------
type PopperContentOwnProps = {
  /**
   * The maximum width of the Popper content.
   */
  maxWidth?: CSSObject['maxWidth']

  /**
   * The maximum height of the Popper content.
   */
  maxHeight?: CSSObject['maxHeight']
}

export type PopperContentProps<RootComponent extends ElementType = 'div'> =
  PopperSlotProps<RootComponent> & PopperContentOwnProps

// ----------------- PopperCloseProps -----------------
export type PopperCloseProps = {
  children?: ReactNode
}
