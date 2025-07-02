import { __DEV__, forEach, isArray } from '@nex-ui/utils'
import { getDefaultShouldForwardProp, composeShouldForwardProps } from './utils'
import type { NexStyled } from './types'

const resolveSx = (...args: any[]) => {
  const result: any[] = []

  args.forEach((arg) => {
    if (arg) {
      if (isArray(arg)) {
        result.push(...arg)
      } else if (typeof arg === 'function') {
        result.push(arg)
      } else if (typeof arg === 'object') {
        result.push(arg)
      }
    }
  })

  if (result.length === 0) {
    return null
  }

  if (result.length === 1) {
    return result[0]
  }

  if (result.length > 1) {
    return result
  }
}

// TODO 重构 styled, 使其不仅能重新设计 NexUI 组件样式，还包括其他组件。
const createStyled: NexStyled = (tag: any, options?: any): any => {
  if (__DEV__ && tag === undefined) {
    throw new Error(
      '[Nex UI] styled: You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.',
    )
  }

  const isReal = tag.__nexui_real === tag
  const baseTag = (isReal && tag.__nexui_base) || tag
  const existingStyles = isReal ? tag.__nexui_styles : null

  let targetClassName: string | undefined

  if (options !== undefined) {
    targetClassName = options.target
  }

  const shouldForwardProp = composeShouldForwardProps(tag, options, isReal)

  const defaultShouldForwardProp =
    shouldForwardProp || getDefaultShouldForwardProp(tag)

  const shouldUseAs = !defaultShouldForwardProp('as')

  return (arg: any) => {
    const styles = resolveSx(existingStyles, arg)

    const Styled = ({ sx, ...props }: any) => {
      const FinalTag = (shouldUseAs && props.as) || baseTag
      const finalShouldForwardProp =
        shouldUseAs && shouldForwardProp === undefined
          ? getDefaultShouldForwardProp(FinalTag)
          : defaultShouldForwardProp

      const forwardedProps: any = {}

      forEach(props, (prop: any, key: string) => {
        if (!(shouldUseAs && key === 'as') && finalShouldForwardProp(key)) {
          forwardedProps[key] = prop
        }
      })

      if (targetClassName) {
        forwardedProps.className = forwardedProps.className
          ? `${forwardedProps.className} ${targetClassName}`
          : targetClassName
      }

      const resolvedSx = resolveSx(styles, sx)
      if (resolvedSx) {
        forwardedProps.sx = resolvedSx
      }

      return <FinalTag {...forwardedProps} />
    }

    Styled.displayName = 'NexUIStyledComponent'
    Styled.__nexui_real = Styled
    Styled.__nexui_base = baseTag
    Styled.__nexui_styles = styles
    Styled.__emotion_forwardProp = shouldForwardProp

    return Styled
  }
}

// @ts-ignore
const styled = createStyled.bind()

export { styled }
