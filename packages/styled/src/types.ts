import type { ComponentProps, ComponentType, JSX, ElementType, FC } from 'react'
import type { Interpolation } from '@nex-ui/system'

export interface NexStyled {
  <C extends ComponentType<ComponentProps<C>>>(
    component: C,
    options?: StyledOptions,
  ): (interpolation?: Interpolation) => C
}

type Overwrite<K, T> = Omit<K, keyof T> & T

export interface NexElementConstructor<T extends ElementType>
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

export type NexIntrinsicElements = {
  [Tag in keyof JSX.IntrinsicElements]: NexElementConstructor<Tag>
}

export type NexIntrinsicElementsProps = {
  [Tag in keyof JSX.IntrinsicElements]: ComponentProps<
    NexElementConstructor<Tag>
  >
}

export interface CreateNexComponent {
  <C extends ElementType>(component: C): NexElementConstructor<C>
}

export interface NexFactory extends NexIntrinsicElements, CreateNexComponent {}

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
