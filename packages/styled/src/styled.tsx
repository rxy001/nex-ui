import { withEmotionCache } from '@emotion/react'
import { getRegisteredStyles } from '@emotion/utils'
import { __DEV__, forEach, map, isFunction, isArray } from '@nex-ui/utils'
import { useSystem } from '@nex-ui/system'
import { serializeStyles } from '@emotion/serialize'
import { getDefaultShouldForwardProp } from './utils'
import { tags } from './tags'
import { Insertion } from './Insertion'
import type { CreateStyled, Styled as NexUIStyled } from './types'

const createStyled: CreateStyled = (tag: any): any => {
  if (__DEV__ && tag === undefined) {
    throw new Error(
      '[Nex UI] styled: You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.',
    )
  }

  const defaultShouldForwardProp = getDefaultShouldForwardProp(tag)

  const shouldUseAs = !defaultShouldForwardProp('as')

  return (...args: any[]) => {
    const styles = args.slice()

    const Styled = withEmotionCache(
      ({ sx, ...props }: any, cache: any, ref: any) => {
        const FinalTag = (shouldUseAs && props.as) || tag
        const sys = useSystem()
        const mergedSx = sx ? [...styles, sx] : [...styles]
        const finalShouldForwardProp = shouldUseAs
          ? getDefaultShouldForwardProp(FinalTag)
          : defaultShouldForwardProp

        const newProps: any = ref ? { ref } : {}

        forEach(props, (prop: any, key: string) => {
          if (!(shouldUseAs && key === 'as') && finalShouldForwardProp(key)) {
            newProps[key] = prop
          }
        })

        if (mergedSx.length === 0) {
          return <FinalTag {...newProps} />
        }

        let className = ''
        let registeredStyles: any[] = []

        if (typeof props.className === 'string') {
          className = getRegisteredStyles(
            cache.registered,
            registeredStyles,
            props.className,
          )
        } else if (props.className != null) {
          className = `${props.className} `
        }

        // TODO
        const resolveSx = (arg: any): any => {
          return map(arg, (v: any) => {
            if (isFunction(v)) {
              return v(props)
            }
            if (isArray(v)) {
              return resolveSx(v)
            }
            return v
          })
        }

        const cssProp = sys.css(resolveSx(mergedSx))

        registeredStyles = [...registeredStyles, cssProp]
        const serialized = serializeStyles(
          registeredStyles,
          cache.registered,
          props,
        )

        className += `${cache.key}-${serialized.name}`

        newProps.className = className

        return (
          <>
            <Insertion
              cache={cache}
              serialized={serialized}
              isStringTag={typeof FinalTag === 'string'}
            />
            <FinalTag {...newProps} />
          </>
        )
      },
    )

    Styled.displayName = 'NexUIStyledComponent'

    return Styled
  }
}

// @ts-ignore
const styled = createStyled.bind() as NexUIStyled

tags.forEach((tag) => {
  // @ts-ignore
  styled[tag] = styled(tag)
})

export { styled }
