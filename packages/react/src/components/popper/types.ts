import type { ReactNode, ReactElement, Ref } from 'react'
import type { PortalProps } from '@nex-ui/utils'
import type { DismissibleLayerProps } from '../dismissibleLayer'
import type { Placement, FlipOptions, OffsetOptions } from '../utils'
import type { HTMLMotionProps, SlotProps } from '../../types/utils'

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
   * Handler that is called when the Popper is opened or closed.
   */
  onOpenChange?: (open: boolean) => void

  /**
   * Callback function that is called when the Popper is closed.
   */
  onClose?: () => void
}

// ----------------- PopperAnchorProps -----------------
export type PopperAnchorProps = {
  /**
   * The content of the trigger element.
   */
  children?: ReactElement<{
    ref?: Ref<HTMLElement>
  }>
}

// ----------------- PopperContentProps -----------------
type PopperContentOwnProps = Omit<
  DismissibleLayerProps,
  'children' | 'onDismiss'
> & {
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

export type PopperContentProps = SlotProps<'div', PopperContentOwnProps>

// ----------------- PopperPortalProps -----------------
export type PopperPortalProps = PortalProps & {
  /**
   * If true, keeps the popper mounted in the DOM when it's closed.
   *
   * @default false
   */
  keepMounted?: boolean

  /**
   * If true, disables AnimatePresence for the popper.
   *
   * @default false
   */
  disablePresence?: boolean
}

// ----------------- PopperMotionProps -----------------
export type PopperMotionProps = HTMLMotionProps<'div'>
