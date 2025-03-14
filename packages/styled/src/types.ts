import type {
  ComponentProps as ReactComponentProps,
  ComponentType,
  JSX,
  ElementType,
  ReactNode,
  ComponentPropsWithRef,
} from 'react'
import type { CssFnParams } from '@nex-ui/system'

type CommonProps<E extends ElementType = ElementType> = {
  as?: E
  sx?: CssFnParams
}

type Overwrite<K, T> = Omit<K, keyof T> & T

export type StyledComponentProps<
  E extends ElementType = ElementType,
  Props = object,
> = Overwrite<ComponentPropsWithRef<E>, Overwrite<Props, CommonProps<E>>>

export interface CreateStyledComponent<Tag extends ElementType> {
  (
    styles?: CssFnParams,
  ): <E extends ElementType = Tag>(props: StyledComponentProps<E>) => ReactNode
}

type HTMLElementTagName = keyof JSX.IntrinsicElements

export interface CreateStyled {
  <Tag extends HTMLElementTagName>(tag: Tag): CreateStyledComponent<Tag>
  <C extends ComponentType<ReactComponentProps<C>>>(
    component: C,
  ): CreateStyledComponent<C>
}

type StyledTags = {
  [Tag in HTMLElementTagName]: CreateStyledComponent<Tag>
}

export type NexFactory = {
  [Tag in HTMLElementTagName]: <E extends ElementType = Tag>(
    props: StyledComponentProps<E>,
  ) => ReactNode
}

export interface Styled extends StyledTags, CreateStyled {}
