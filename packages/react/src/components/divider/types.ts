import type { ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { Interpolation } from '@nex-ui/system'
import type { OverrideProps } from '../../types/utils'
import type { DividerVariants } from '../../theme/recipes'

export interface DividerPropsOverrides {}

type DividerOwnProps<RootComponent extends ElementType> = {
  /**
   * The component or element to render as the root.
   *
   * @default 'hr'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * The orientation of the Divider.
   *
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
