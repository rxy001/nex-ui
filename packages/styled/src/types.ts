import type { FunctionComponent, ElementType, ComponentProps } from 'react'
import type { StyleObject, RawCSSProperties } from '@nex-ui/system'

export type HTMLElementTagName = keyof JSX.IntrinsicElements

export type NexStyledComponentProps<T = NonNullable<unknown>> = {
  as?: HTMLElementTagName
  sx?: StyleObject
  colorPalette?: RawCSSProperties['color']
} & T

export type NexStyledComponent<JSXProps extends Record<string, any>> =
  FunctionComponent<NexStyledComponentProps<JSXProps>>

export type NexStyledElements = {
  [Tag in HTMLElementTagName]: NexStyledComponent<JSX.IntrinsicElements[Tag]>
}

export type CreateStyledComponent = {
  <T extends ElementType>(tag: T): NexStyledComponent<ComponentProps<T>>
}

export type NexStyled = CreateStyledComponent & NexStyledElements
