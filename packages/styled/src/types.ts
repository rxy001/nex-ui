import type { ComponentProps, ComponentType, JSX, ElementType, FC } from 'react'
import type { Interpolation } from '@nex-ui/system'

type Overwrite<K, T> = Omit<K, keyof T> & T

export interface NexStyled {
  <C extends ComponentType<ComponentProps<C>>>(
    component: C,
    options?: StyledOptions,
  ): (interpolation?: Interpolation) => C
}

export interface NexComponent<T extends ElementType>
  extends FC<
    Overwrite<
      ComponentProps<T>,
      {
        as?: ElementType
        sx?: Interpolation
      }
    >
  > {
  <E extends ElementType = T>(
    props: Overwrite<
      ComponentProps<E>,
      {
        as?: E
        sx?: Interpolation
      }
    >,
  ): JSX.Element
}

export type HTMLNexComponents = {
  [Tag in keyof JSX.IntrinsicElements]: NexComponent<Tag>
}

export interface CreateNexComponent {
  <C extends ElementType>(component: C): NexComponent<C>
}

export interface NexFactory extends HTMLNexComponents, CreateNexComponent {}

export interface StyledOptions {
  shouldForwardProp?: (propName: string) => boolean
  target?: string
}

export type StyledElementType = React.ElementType & {
  defaultProps?: Partial<any>
  __emotion_real?: ElementType
  __emotion_base?: ElementType
  __emotion_forwardProp?: (propName: string) => boolean
}
