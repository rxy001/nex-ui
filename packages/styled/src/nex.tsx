import { withEmotionCache } from '@emotion/react'
import { forEach } from '@nex-ui/utils'
import { useSystem } from '@nex-ui/system'
import { serializeStyles } from '@emotion/serialize'
import { getRegisteredStyles } from '@emotion/utils'
import { getDefaultShouldForwardProp } from './utils'
import { tags } from './tags'
import { Insertion } from './Insertion'
import type { NexFactory } from './types'

const createNexImpl = (tag: any) => {
  if (process.env.NODE_ENV !== 'production') {
    if (tag === undefined) {
      throw new Error(
        'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.',
      )
    }
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

      let { className = '' } = props
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

      const sys = useSystem()

      const cssProp = sys.css(sx)

      registeredStyles = [...registeredStyles, cssProp]

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

  Styled.displayName = 'NexStyledComponent'

  return Styled
}

// @ts-ignore
const createNex = createNexImpl.bind()

const nex = {} as NexFactory
tags.forEach((tag) => {
  // @ts-ignore
  nex[tag] = createNex(tag)
})

export { nex }
