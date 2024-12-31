import type {
  ComponentProps as ReactComponentProps,
  ComponentType,
  FunctionComponent,
  JSX,
  ElementType,
} from 'react'
import type { StyleObject } from '@nex-ui/system'

export interface StyledComponentProps {
  as?: ElementType
  sx?: StyleObject | StyleObject[]
}

export interface CreateStyledComponent<
  ComponentProps extends NonNullable<unknown>,
  SpecificComponentProps extends NonNullable<unknown> = NonNullable<unknown>,
> {
  (
    styles?: StyleObject | StyleObject[],
  ): FunctionComponent<ComponentProps & SpecificComponentProps>
}

type HTMLElementTagName = keyof JSX.IntrinsicElements

export interface CreateStyled {
  <Tag extends HTMLElementTagName>(
    tag: Tag,
  ): CreateStyledComponent<StyledComponentProps, JSX.IntrinsicElements[Tag]>

  <C extends ComponentType<ReactComponentProps<C>>>(
    component: C,
  ): CreateStyledComponent<StyledComponentProps & ReactComponentProps<C>>
}

type StyledTags = {
  [Tag in HTMLElementTagName]: CreateStyledComponent<
    StyledComponentProps,
    JSX.IntrinsicElements[Tag]
  >
}

export type Nex = {
  [Tag in HTMLElementTagName]: FunctionComponent<
    StyledComponentProps & JSX.IntrinsicElements[Tag]
  >
}

export interface Styled extends StyledTags, CreateStyled {}
