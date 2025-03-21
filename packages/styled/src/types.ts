import type {
  ComponentProps as ReactComponentProps,
  ComponentType,
  JSX,
  ElementType,
} from 'react'
import type { Interpolation } from '@nex-ui/system'

type Overwrite<K, T> = Omit<K, keyof T> & T

export type GenericStyledComponentProps<E extends ElementType = ElementType> =
  Overwrite<
    ReactComponentProps<E>,
    {
      as?: E
      sx?: Interpolation<ReactComponentProps<E>>
    }
  >

export interface CreateGenericStyledComponent<C extends ElementType> {
  (
    interpolation?: Interpolation<ReactComponentProps<C>>,
  ): <E extends ElementType = C>(
    props: GenericStyledComponentProps<E>,
  ) => JSX.Element
}

export interface CreateStyledComponent<C extends ElementType> {
  (interpolation?: Interpolation<ReactComponentProps<C>>): (
    props: ReactComponentProps<C> & {
      sx: Interpolation<ReactComponentProps<C>>
    },
  ) => JSX.Element
}

type HTMLElementTagName = keyof JSX.IntrinsicElements

export interface CreateStyled {
  <Tag extends HTMLElementTagName>(tag: Tag): CreateGenericStyledComponent<Tag>
  <C extends ComponentType<ReactComponentProps<C>>>(
    component: C,
  ): CreateStyledComponent<C>
}

type StyledTags = {
  [Tag in HTMLElementTagName]: CreateGenericStyledComponent<Tag>
}

export type NexUIFactory = {
  [Tag in HTMLElementTagName]: <E extends ElementType = Tag>(
    props: Overwrite<
      ReactComponentProps<E>,
      {
        as?: E
        sx?: Interpolation
      }
    >,
  ) => JSX.Element
}

export interface Styled extends StyledTags, CreateStyled {}
