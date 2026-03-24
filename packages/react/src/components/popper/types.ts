import type { ReactNode, ReactElement, Ref } from 'react'
import type { PortalProps } from '@nex-ui/utils'
import type { HTMLMotionProps } from 'motion/react'
import type { DismissibleLayerProps } from '../dismissibleLayer'
import type { Placement, FlipOptions, OffsetOptions } from '../utils'
import type { SlotProps } from '../../types/utils'

// ----------------- PopperProps -----------------
export interface PopperProps {
  /**
   * The content of the Popper.
   */
  children?: ReactNode

  /**
   * If true, the Popper is shown. (controlled)
   */
  open?: boolean

  /**
   * Callback fired when the Popper is opened or closed.
   */
  onOpenChange?: (open: boolean) => void

  /**
   * Callback function that is called when the Popper is closed.
   */
  onClose?: () => void
}

// ----------------- PopperAnchorProps -----------------
export interface PopperAnchorProps {
  /**
   * The content of the trigger element.
   */
  children?: ReactElement<{
    ref?: Ref<HTMLElement>
  }>
}

// ----------------- PopperContentProps -----------------
interface PopperContentOwnProps
  extends Omit<DismissibleLayerProps, 'children' | 'onDismiss'> {
  /**
   * If true, closes the Popper when the escape key is pressed.
   *
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * If true, closes the Popper when the trigger element is detached from the viewport.
   *
   * @default true
   */
  closeOnDetached?: boolean

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
}

export interface PopperContentProps
  extends SlotProps<'div', PopperContentOwnProps> {}

// ----------------- PopperPortalProps -----------------
export interface PopperPortalProps extends PortalProps {
  /**
   * If true, keeps the popper mounted in the DOM.
   *
   * @default false
   */
  forceMount?: boolean
}

// ----------------- PopperMotionProps -----------------
export interface PopperMotionProps extends HTMLMotionProps<'div'> {}
