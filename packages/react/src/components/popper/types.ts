import type { ReactNode, ElementType, ComponentProps } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { Placement, FlipOptions, OffsetOptions } from '../utils'
import type { Overwrite } from '../../types/utils'
import type { DOMMotionComponents } from 'motion/react'

export type PopperProps = {
  children?: ReactNode
  /**
   * If true, the popper is open.
   */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: Placement
  container?: HTMLElement | null | (() => HTMLElement | null)
  flip?: FlipOptions | boolean
  shift?: boolean
  offset?: OffsetOptions | boolean
  keepMounted?: boolean
  closeOnEscape?: boolean
  openDelay?: number
  closeDelay?: number
}

export type PopperTriggerProps = {
  children?: ReactNode
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
