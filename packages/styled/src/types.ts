import type { ComponentProps, ComponentType, JSX, ElementType } from 'react'
import type { Interpolation } from '@nex-ui/system'

type Overwrite<K, T> = Omit<K, keyof T> & T

interface CreateStyledComponent<C extends ElementType> {
  (
    interpolation?:
      | Interpolation
      | ((props: ComponentProps<C>) => Interpolation),
  ): C
}

type HTMLElementTagName = keyof JSX.IntrinsicElements

export interface NexUIStyled {
  <C extends ComponentType<ComponentProps<C>>>(
    component: C,
    options?: StyledOptions,
  ): CreateStyledComponent<C>
}

export type NexUIFactory = {
  [Tag in HTMLElementTagName]: <E extends ElementType = Tag>(
    props: Overwrite<
      ComponentProps<E>,
      {
        as?: E
        sx?: Interpolation
      }
    >,
  ) => JSX.Element
}

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
