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
   * Usually, CardHeader, CardBody, CardFooter, and other custom content.
   */
  children?: ReactNode

  /**
   * The component or element to render as the root.
   *
   * @default 'div'
   */
  as?: RootComponent

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The shadow of the Card.
   *
   * @default 'md'
   */
  shadow?: CardVariants['shadow']

  /**
   * The border radius of the Card.
   *
   * @default 'md'
   */
  radius?: CardVariants['radius']

  /**
   * If true, applies a backdrop filter to the Card.
   */
  blurred?: boolean

  /**
   * If true, the Card will have a hover effect.
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
   * The content of the CardHeader, which disables the avatar, action, title, and subtitle props.
   */
  children?: ReactNode

  /**
   * The component or element to render as the root.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The title of the CardHeader.
   */
  title?: ReactNode

  /**
   * The subtitle of the CardHeader.
   */
  subtitle?: ReactNode

  /**
   * The avatar of the CardHeader.
   */
  avatar?: ReactNode

  /**
   * The action area of the CardHeader.
   */
  action?: ReactNode

  /**
   * Additional class names to apply to the root.
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
   * The component or element to render as the root.
   * @default 'div'
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
   * The content of the CardBody.
   */
  children?: ReactNode
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
   * The component or element to render as the root.
   * @default 'div'
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
   * The content of the CardFooter.
   */
  children?: ReactNode
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
   * The component or element to render as the root.
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
   * Additional class names to apply to the root.
   */
  className?: ClassValue
}

export type CardActionAreaProps<RootComponent extends ElementType = 'button'> =
  OverrideProps<
    RootComponent,
    CardActionAreaOwnProps<RootComponent>,
    CardActionAreaPropsOverrides
  >
