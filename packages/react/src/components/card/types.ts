import type { ElementType, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type {
  OverrideProps,
  ComponentPropsWithCommonProps,
  ComponentSlotClasses,
} from '../../types/utils'
import type { CardVariants } from '../../theme/recipes'

export interface CardPropsOverrides {}

type CardOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * Additional class names to apply to the root element.
   */
  className?: ClassValue

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The shadow of the card.
   * @default 'md'
   */
  shadow?: CardVariants['shadow']

  /**
   * The border radius of the card.
   * @default 'md'
   */
  radius?: CardVariants['radius']

  /**
   * If true, applies a backdrop filter to the card.
   */
  blurred?: boolean

  /**
   * If true, the card will have a hover effect.
   */
  hoverable?: boolean
}

export type CardProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<RootComponent, CardOwnProps<RootComponent>, CardPropsOverrides>

type CardHeaderSlotProps = {
  content?: ComponentPropsWithCommonProps<'div'>
  title?: ComponentPropsWithCommonProps<'div'>
  subtitle?: ComponentPropsWithCommonProps<'div'>
}

type CardHeaderOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The title of the card header.
   */
  title?: ReactNode

  /**
   * The subtitle of the card header.
   */
  subtitle?: ReactNode

  /**
   * The avatar of the card header.
   */
  avatar?: ReactNode

  /**
   * The action element of the card header.
   */
  action?: ReactNode

  /**
   * Additional class names to apply to the root element.
   */
  className?: ClassValue

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof CardHeaderSlotProps>

  /**
   * The props used for each slot.
   */
  slotProps?: CardHeaderSlotProps
}

export interface CardHeaderPropsOverrides {}

export type CardHeaderProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    CardHeaderOwnProps<RootComponent>,
    CardHeaderPropsOverrides
  >

type CardBodyOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
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
}

export interface CardBodyPropsOverrides {}

export type CardBodyProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    CardBodyOwnProps<RootComponent>,
    CardBodyPropsOverrides
  >

type CardFooterOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
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
}

export interface CardFooterPropsOverrides {}

export type CardFooterProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    CardFooterOwnProps<RootComponent>,
    CardFooterPropsOverrides
  >

export interface CardActionAreaPropsOverrides {}

type CardActionAreaOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'button'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean

  /**
   * Additional class names to apply to the root element.
   */
  className?: ClassValue
}

export type CardActionAreaProps<RootComponent extends ElementType = 'button'> =
  OverrideProps<
    RootComponent,
    CardActionAreaOwnProps<RootComponent>,
    CardActionAreaPropsOverrides
  >
