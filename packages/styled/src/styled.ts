import { withEmotionCache } from '@emotion/react'
import { createElement, Fragment } from 'react'
import type { EmotionCache } from '@emotion/cache'
import {
  getRegisteredStyles,
  registerStyles,
  insertStyles,
} from '@emotion/utils'
import { forEach } from '@nex-ui/utils'
import { serializeStyles } from '@emotion/serialize'
import type { SerializedStyles } from '@emotion/serialize'
// @ts-ignore
import { useInsertionEffectAlwaysWithSyncFallback } from '@emotion/use-insertion-effect-with-fallbacks'
import type { ElementType, Ref } from 'react'
import { getDefaultShouldForwardProp } from './utils'
import { tags } from './tags'
import type { NexStyled, HTMLElementTagName } from './types'

const isBrowser = typeof document !== 'undefined'

const Insertion = ({
  cache,
  serialized,
  isStringTag,
}: {
  cache: EmotionCache
  serialized: SerializedStyles
  isStringTag: boolean
}) => {
  registerStyles(cache, serialized, isStringTag)

  const rules = useInsertionEffectAlwaysWithSyncFallback(() =>
    insertStyles(cache, serialized, isStringTag),
  )

  if (!isBrowser && rules !== undefined) {
    let serializedNames = serialized.name
    let { next } = serialized
    while (next !== undefined) {
      serializedNames += ` ${next.name}`
      next = next.next
    }

    return createElement('style', {
      [`data-emotion`]: `${cache.key} ${serializedNames}`,
      dangerouslySetInnerHTML: { __html: rules },
      nonce: cache.sheet.nonce,
    })
  }
  return null
}

const createStyledComponent = (tag: ElementType) => {
  if (process.env.NODE_ENV !== 'production') {
    if (tag === undefined) {
      throw new Error(
        'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.',
      )
    }
  }

  const defaultShouldForwardProp = getDefaultShouldForwardProp(tag)

  const shouldUseAs = !defaultShouldForwardProp('as')

  return withEmotionCache(
    (props: Record<string, any>, cache: EmotionCache, ref: Ref<any>) => {
      let cssProp = props.css

      if (
        typeof cssProp === 'string' &&
        cache.registered[cssProp] !== undefined
      ) {
        cssProp = cache.registered[cssProp]
      }

      const FinalTag = (shouldUseAs && props.as) || tag

      let className = ''
      const registeredStyles = [cssProp]

      if (typeof props.className === 'string') {
        className = getRegisteredStyles(
          cache.registered,
          registeredStyles,
          props.className,
        )
      } else if (props.className != null) {
        className = `${props.className} `
      }

      const serialized = serializeStyles(
        registeredStyles,
        cache.registered,
        props,
      )

      className += `${cache.key}-${serialized.name}`

      const finalShouldForwardProp = shouldUseAs
        ? getDefaultShouldForwardProp(FinalTag)
        : defaultShouldForwardProp

      const newProps: any = {}

      forEach(props, (prop: any, key: string) => {
        if (!(shouldUseAs && key === 'as') && finalShouldForwardProp(key)) {
          newProps[key] = prop
        }
      })

      newProps.className = className
      if (ref) {
        newProps.ref = ref
      }

      return createElement(
        Fragment,
        {},
        createElement(Insertion, {
          cache,
          serialized,
          isStringTag: typeof FinalTag === 'string',
        }),
        createElement(FinalTag, { ...newProps }),
      )
    },
  )
}

// bind it to avoid mutating the original function
// @ts-ignore
const styledComponent = createStyledComponent.bind()

const cache = new Map<string, (...args: any[]) => any>()

const nexProxy = new Proxy(styledComponent, {
  get: (_, tag: HTMLElementTagName) => {
    if (['prototype', 'name', 'displayName'].includes(tag)) {
      return
    }

    if (!cache.has(tag)) {
      if (!tags.includes(tag)) {
        console.error('system: Please pass in the correct html tags.')
        return
      }
      cache.set(tag, styledComponent(tag))
    }
    return cache.get(tag)
  },
  // apply(_, __, args) {
  //   // @ts-ignore
  //   return styledComponent(...args)
  // },
})

export const nex = nexProxy as unknown as NexStyled
