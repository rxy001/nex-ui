import { isFunction, kebabCase, mergeProps } from '@nex-ui/utils'
import { cloneElement, createElement, isValidElement } from 'react'
import type { HTMLProps, HTMLElements } from './types'

export type CreatePrimitiveParams<
  T extends HTMLElements,
  State extends Record<string, any>,
> = {
  state: State
  render?:
    | ((props: HTMLProps<T>, state: State) => React.ReactNode)
    | React.JSX.Element
  stateAttributesMapping?: StateAttributesMapping<State>
}

export function createPrimitive<
  Element extends HTMLElements,
  State extends Record<string, any>,
>(
  tag: Element,
  props: HTMLProps<Element>,
  params: CreatePrimitiveParams<Element, State>,
) {
  const { render, state, stateAttributesMapping } = params
  const stateProps = getStateAttributesProps(state, stateAttributesMapping)

  const mergedProps = mergeProps(props, stateProps) as HTMLProps<Element>

  if (isFunction(render)) {
    return render(mergedProps, state ?? ({} as State))
  }

  if (isValidElement<any>(render)) {
    return cloneElement(render, mergeProps(render.props, mergedProps))
  }

  return createElement(tag, mergedProps)
}

type StateAttributesMapping<State> = {
  [Property in keyof State]?: (
    state: State[Property],
  ) => Record<string, string> | null
}

export function getStateAttributesProps<State extends Record<string, any>>(
  state: State,
  customMapping?: StateAttributesMapping<State>,
) {
  const props: Record<string, string> = {}

  for (const key in state) {
    const value = state[key]
    if (
      customMapping &&
      Object.prototype.hasOwnProperty.call(customMapping, key)
    ) {
      const customProps = customMapping[key]!(value)
      if (customProps != null) {
        Object.assign(props, customProps)
      }
      continue
    }
    if (value === true) {
      props[`data-${kebabCase(key)}`] = ''
    } else if (value) {
      props[`data-${kebabCase(key)}`] = value.toString()
    }
  }

  return props
}
