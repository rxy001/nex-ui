import type { ElementType } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { DOMMotionComponents } from 'motion/react'
import type { ClassValue } from 'clsx'
import type {
  PopperProps,
  PopperRootProps,
  PopperTriggerProps,
} from '../popper'
import type { OverrideProps, HTMLMotionProps } from '../../types/utils'
import type { PopoverContentVariants } from '../../theme/recipes'

type PopoverOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: Interpolation
  className?: ClassValue
  motionProps?: HTMLMotionProps<'div'>
} & Pick<
  PopperRootProps,
  | 'container'
  | 'keepMounted'
  | 'closeOnEscape'
  | 'placement'
  | 'offset'
  | 'flip'
  | 'shift'
> &
  PopperProps

export interface PopoverPropsOverrides {}

export type PopoverProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = OverrideProps<
  RootComponent,
  PopoverOwnProps<RootComponent>,
  PopoverPropsOverrides
>

type PopoverContentOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: Interpolation
  className?: ClassValue
  radius?: PopoverContentVariants['radius']
  color?: PopoverContentVariants['color']
}

export interface PopoverContentPropsOverrides {}

export type PopoverContentProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    PopoverContentOwnProps<RootComponent>,
    PopoverContentPropsOverrides
  >

export type PopoverTriggerProps = Omit<PopperTriggerProps, 'action'>
