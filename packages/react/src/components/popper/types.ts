import type { ReactNode, ElementType, ComponentProps } from 'react'
import type { ClassValue } from 'clsx'
import type { CSSObject, Interpolation } from '@nex-ui/system'
import type { Placement, FlipOptions, OffsetOptions } from '../utils'
import type { Overwrite } from '../../types/utils'
import type { DOMMotionComponents } from 'motion/react'

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
}

export type PopperTriggerProps = {
  /**
   * The content of the trigger element.
   */
  children?: ReactNode

  /**
   * The action that triggers the Popper.
   *
   * @default 'hover'
   */
  action?: 'click' | 'hover'

  /**
   * If true, keeps the Popper open when interacting with its content.
   *
   * @default true
   */
  interactive?: boolean

  /**
   * If true, closes the Popper when clicking the trigger element.
   *
   * @default true
   */
  closeOnClick?: boolean

  elementProps?: {
    [key: string]: any
  }
}

type PopperSlotProps<RootComponent extends ElementType> = Overwrite<
  ComponentProps<RootComponent>,
  {
    as?: RootComponent
    sx?: Interpolation
    className?: ClassValue
  }
>

type PopperRootOwnProps = {
  /**
   * The placement of the Popper relative to the trigger element.
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
   * If true, always keep the children in the DOM.
   *
   * @default false
   */
  keepMounted?: boolean

  /**
   * If true, closes the Popper when the escape key is pressed.
   *
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * If true, closes the Popper when the reference element is detached from the viewport.
   *
   * @default true
   */
  closeOnDetached?: boolean
}

export type PopperRootProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = PopperSlotProps<RootComponent> & PopperRootOwnProps

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

export type PopperCloseProps = {
  children?: ReactNode
}
