import type { ReactNode, ElementType, ComponentProps } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { Placement, FlipOptions, OffsetOptions } from '../utils'
import type { Overwrite } from '../../types/utils'
import type { DOMMotionComponents } from 'motion/react'

export type PopperProps = {
  /**
   * The content of the popper.
   */
  children?: ReactNode

  /**
   * If true, the popper is shown. (controlled)
   */
  open?: boolean

  /**
   * If true, the popper is shown by default. (uncontrolled)
   */
  defaultOpen?: boolean

  /**
   * Handler that is called when the popper is opened or closed.
   */
  onOpenChange?: (open: boolean) => void

  /**
   * The placement of the popper relative to the trigger element.
   *
   * @default 'top'
   */
  placement?: Placement

  /**
   * The container element in which the overlay portal will be placed.
   *
   * @default document.body
   */
  container?: HTMLElement | null | (() => HTMLElement | null)

  /**
   * Changes the placement of the popper element to keep it in view.
   *
   * @default true
   */
  flip?: FlipOptions | boolean

  /**
   * Shifts the popper element to keep it in view.
   *
   * @default true
   */
  shift?: boolean

  /**
   * Translates the popper element along the specified axes.
   *
   * @default true
   */
  offset?: OffsetOptions | boolean

  /**
   * If true, always keep the children in the DOM.
   *
   * @default false
   */
  keepMounted?: boolean

  /**
   * If true, close the popper when the escape key is pressed.
   *
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * The delay in milliseconds before the popper opens.
   *
   * @default 100
   */
  openDelay?: number

  /**
   * The delay in milliseconds before the popper closes.
   *
   * @default 100
   */
  closeDelay?: number
}

export type PopperTriggerProps = {
  /**
   * The content of the trigger element.
   */
  children?: ReactNode

  /**
   * The action that triggers the popper.
   *
   * @default 'hover'
   */
  action?: 'click' | 'hover' | 'focus'
}

type PopperSlotProps<RootComponent extends ElementType> = Overwrite<
  ComponentProps<RootComponent>,
  {
    as?: RootComponent
    sx?: Interpolation
  }
>

export type PopperRootProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = PopperSlotProps<RootComponent>

export type PopperContentProps<RootComponent extends ElementType = 'div'> =
  PopperSlotProps<RootComponent>
