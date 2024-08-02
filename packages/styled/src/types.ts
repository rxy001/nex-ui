import type { FunctionComponent } from 'react'
import type { CSSInterpolation } from '@emotion/serialize'

type StyledComponent<
  ComponentProps extends Record<string, any>,
  SpecificComponentProps extends Record<string, any> = Record<string, any>,
> = FunctionComponent<ComponentProps & SpecificComponentProps>

export type HTMLElementTagName = keyof JSX.IntrinsicElements

export type StyledTags = {
  [Tag in HTMLElementTagName]: StyledComponent<
    {
      as?: HTMLElementTagName
      css?: CSSInterpolation
    },
    JSX.IntrinsicElements[Tag]
  >
}

export interface NexStyled extends StyledTags {}
