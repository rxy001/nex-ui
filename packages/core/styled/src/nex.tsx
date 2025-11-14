'use client'

import { withEmotionCache } from '@emotion/react'
import { __DEV__ } from '@nex-ui/utils'
import { useSystem } from '@nex-ui/system'
import { serializeStyles } from '@emotion/serialize'
import { getRegisteredStyles } from '@emotion/utils'
import { getDefaultShouldForwardProp } from './utils'
import { tags } from './tags'
import { Insertion } from './Insertion'
import type { NexFactory } from './types'

const createNexComponent = (tag: any) => {
  if (__DEV__ && tag === undefined) {
    throw new Error(
      '[Nex UI] nex: You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.',
    )
  }

  const Styled = withEmotionCache(
    ({ sx, ...props }: any, cache: any, ref: any) => {
      const sys = useSystem()
      const FinalTag = props.as || tag
      const finalShouldForwardProp = getDefaultShouldForwardProp(FinalTag)
      const newProps: any = ref ? { ref } : {}

      for (const key in props) {
        if (!Object.hasOwn(props, key)) continue

        const prop = props[key]
        if (!(key === 'as') && finalShouldForwardProp(key)) {
          newProps[key] = prop
        }
      }

      if (sx == null) {
        return <FinalTag {...newProps} />
      }

      const cssProp = sys.css(sx)
      let { className = '' } = props
      const registeredStyles = Array.isArray(cssProp) ? cssProp : [cssProp]

      if (typeof props.className === 'string') {
        className = getRegisteredStyles(
          cache.registered,
          registeredStyles,
          props.className,
        )
      } else if (props.className != null) {
        /* istanbul ignore next */
        className = `${props.className} `
      }

      const serialized = serializeStyles(registeredStyles, undefined, {})
      className += `${cache.key}-${serialized.name}`
      newProps.className = className.trim()

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

  Styled.displayName = 'NexUIComponent'

  return Styled
}

const nex = createNexComponent as NexFactory
tags.forEach((tag) => {
  nex[tag] = nex(tag)
})

export { nex }
