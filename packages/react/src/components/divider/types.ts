import type { ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { Interpolation } from '@nex-ui/system'
import type { OverrideProps } from '../../types/utils'
import type { DividerVariants } from '../../theme/recipes'

export interface DividerPropsOverrides {}

type DividerOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root node.
   * @default 'hr'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root element.
   */
  className?: ClassValue

  /**
   * The orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: DividerVariants['orientation']
}

export type DividerProps<RootComponent extends ElementType = 'hr'> =
  OverrideProps<
    RootComponent,
    DividerOwnProps<RootComponent>,
    DividerPropsOverrides
  >
