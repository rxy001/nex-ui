import { withEmotionCache } from '@emotion/react'
import { getRegisteredStyles } from '@emotion/utils'
import { forEach } from '@nex-ui/utils'
import { useSystem } from '@nex-ui/system'
import { serializeStyles } from '@emotion/serialize'
import { getDefaultShouldForwardProp, composeSx } from './utils'
import { tags } from './tags'
import type { CreateStyled, Styled as NexStyled } from './types'
import { Insertion } from './Insertion'

const createStyled: CreateStyled = (tag: any) => {
  if (process.env.NODE_ENV !== 'production') {
    if (tag === undefined) {
      throw new Error(
        'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.',
      )
    }
  }

  const defaultShouldForwardProp = getDefaultShouldForwardProp(tag)

  const shouldUseAs = !defaultShouldForwardProp('as')

  return (sx: any) => {
    const styles = composeSx([], sx)

    const Styled = withEmotionCache(
      ({ sx: SxProps, ...props }: any, cache: any, ref: any) => {
        const FinalTag = (shouldUseAs && props.as) || tag

        const sys = useSystem()
        const composedSx = composeSx(styles, SxProps)

        const finalShouldForwardProp = shouldUseAs
          ? getDefaultShouldForwardProp(FinalTag)
          : defaultShouldForwardProp

        const newProps: any = ref ? { ref } : {}

        forEach(props, (prop: any, key: string) => {
          if (!(shouldUseAs && key === 'as') && finalShouldForwardProp(key)) {
            newProps[key] = prop
          }
        })

        if (composedSx.length === 0) {
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

        const cssProp = sys.css(composedSx)
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

    Styled.displayName = 'NexStyledComponent'

    return Styled
  }
}

// @ts-ignore
const styled = createStyled.bind() as NexStyled

tags.forEach((tag) => {
  // @ts-ignore
  styled[tag] = styled(tag)
})

export { styled }
