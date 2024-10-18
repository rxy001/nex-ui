import type { FunctionComponent, ElementType, ComponentProps } from 'react'
import type { StyleObject, RawCSSProperties } from '@nex-ui/system'

export type HTMLElementTagName = keyof JSX.IntrinsicElements

export type ExtraComponentProps = {
  as?: HTMLElementTagName
  sx?: StyleObject
  colorPalette?: RawCSSProperties['color']
}

type StyledComponent<
  P extends Record<string, any>,
  JSXProps extends Record<string, any> = NonNullable<unknown>,
> = FunctionComponent<P & ExtraComponentProps & JSXProps>

export type StyledElements = {
  [Tag in HTMLElementTagName]: StyledComponent<JSX.IntrinsicElements[Tag]>
}

export type CreateStyledComponent = {
  <T extends ElementType>(tag: T): StyledComponent<ComponentProps<T>>
}

export type NexStyled = StyledElements & CreateStyledComponent
