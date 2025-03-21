import { withEmotionCache } from '@emotion/react'
import { __DEV__, forEach } from '@nex-ui/utils'
import { useSystem } from '@nex-ui/system'
import { serializeStyles } from '@emotion/serialize'
import { getRegisteredStyles } from '@emotion/utils'
import { getDefaultShouldForwardProp } from './utils'
import { tags } from './tags'
import { Insertion } from './Insertion'
import type { NexUIFactory } from './types'

const createNexImpl = (tag: any) => {
  if (__DEV__ && tag === undefined) {
    throw new Error(
      '[Nex UI] nex: You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.',
    )
  }

  const defaultShouldForwardProp = getDefaultShouldForwardProp(tag)

  const shouldUseAs = !defaultShouldForwardProp('as')

  const Styled = withEmotionCache(
    ({ sx, ...props }: any, cache: any, ref: any) => {
      const FinalTag = (shouldUseAs && props.as) || tag

      const finalShouldForwardProp = shouldUseAs
        ? getDefaultShouldForwardProp(FinalTag)
        : defaultShouldForwardProp

      const newProps: any = ref ? { ref } : {}

      forEach(props, (prop: any, key: string) => {
        if (!(shouldUseAs && key === 'as') && finalShouldForwardProp(key)) {
          newProps[key] = prop
        }
      })

      if (sx == null) {
        return <FinalTag {...newProps} />
      }

      const sys = useSystem()

      const cssProp = sys.css(sx)

      let { className = '' } = props
      const registeredStyles: any[] = [cssProp]

      if (typeof props.className === 'string') {
        className = getRegisteredStyles(
          cache.registered,
          registeredStyles,
          props.className,
        )
      } else if (props.className != null) {
        className = `${props.className} `
      }

      const serialized = serializeStyles(registeredStyles, undefined, props)

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

// @ts-ignore
const createNex = createNexImpl.bind()

const nex = {} as NexUIFactory
tags.forEach((tag) => {
  // @ts-ignore
  nex[tag] = createNex(tag)
})

export { nex }
