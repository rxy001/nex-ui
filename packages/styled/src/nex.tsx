import { withEmotionCache } from '@emotion/react'
import { forEach } from '@nex-ui/utils'
import { useSystem } from '@nex-ui/system'
import { serializeStyles } from '@emotion/serialize'
import { getDefaultShouldForwardProp } from './utils'
import { tags } from './tags'
import { Insertion } from './Insertion'
import type { Nex } from './types'

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

  return withEmotionCache(({ sx, ...props }: any, cache: any, ref: any) => {
    const sys = useSystem()

    const cssProp = sx ? sys.css(sx) : sx

    const FinalTag = (shouldUseAs && props.as) || tag

    let { className } = props
    const registeredStyles = cssProp ? [cssProp] : []

    // 不将 css 融合到 sx 中，避免 sx 被 css 样式覆盖. 尽量不使用 css props
    // if (typeof props.className === 'string') {
    //   className = getRegisteredStyles(
    //     cache.registered,
    //     registeredStyles,
    //     props.className,
    //   )
    // } else if (props.className != null) {
    //   className = `${props.className} `
    // }

    const serialized = serializeStyles(registeredStyles, undefined, props)

    className += ` ${cache.key}-${serialized.name}`

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
  })
}

// @ts-ignore
const createNex = createNexImpl.bind()

const nex = {} as Nex
tags.forEach((tag) => {
  // @ts-ignore
  nex[tag] = createNex(tag)
})

export { nex }
