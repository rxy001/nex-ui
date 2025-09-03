import type { ElementType, ReactNode } from 'react'
import type {
  OverrideProps,
  SxProp,
  ComponentPropsWithCommonProps,
  ComponentUtilityClasses,
} from '../../types/utils'
import type { CardVariants } from '../../theme/recipes'

type CardOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<CardOwnerState<RootComponent>>

  /**
   * The shadow of the card.
   * @default 'md
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

export interface CardPropsOverrides {}
export type CardOwnerState<RootComponent extends ElementType = 'div'> =
  CardProps<RootComponent>

type CardHeaderOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<CardHeaderOwnerState<RootComponent>>

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
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'root' | 'content' | 'title' | 'subtitle'>

  /**
   * The props used for each slot.
   */
  slotProps?: {
    content?: ComponentPropsWithCommonProps<
      'div',
      CardHeaderOwnerState<RootComponent>
    >
    title?: ComponentPropsWithCommonProps<
      'div',
      CardHeaderOwnerState<RootComponent>
    >
    subtitle?: ComponentPropsWithCommonProps<
      'div',
      CardHeaderOwnerState<RootComponent>
    >
  }
}

export type CardHeaderProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    CardHeaderOwnProps<RootComponent>,
    CardHeaderPropsOverrides
  >

export interface CardHeaderPropsOverrides {}
export type CardHeaderOwnerState<RootComponent extends ElementType = 'div'> =
  CardHeaderProps<RootComponent>

type CardBodyOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<CardBodyOwnerState<RootComponent>>
}

export type CardBodyProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    CardBodyOwnProps<RootComponent>,
    CardBodyPropsOverrides
  >

export interface CardBodyPropsOverrides {}
export type CardBodyOwnerState<RootComponent extends ElementType = 'div'> =
  CardBodyProps<RootComponent>

type CardFooterOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<CardFooterOwnerState<RootComponent>>
}

export type CardFooterProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    CardFooterOwnProps<RootComponent>,
    CardFooterPropsOverrides
  >

export interface CardFooterPropsOverrides {}
export type CardFooterOwnerState<RootComponent extends ElementType = 'div'> =
  CardFooterProps<RootComponent>

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
  sx?: SxProp<CardActionAreaOwnerState<RootComponent>>

  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean
}

export type CardActionAreaProps<RootComponent extends ElementType = 'button'> =
  OverrideProps<
    RootComponent,
    CardActionAreaOwnProps<RootComponent>,
    CardActionAreaPropsOverrides
  >

export type CardActionAreaOwnerState<
  RootComponent extends ElementType = 'button',
> = CardActionAreaProps<RootComponent>
