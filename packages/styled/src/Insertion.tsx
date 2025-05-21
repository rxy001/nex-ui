import { registerStyles, insertStyles } from '@emotion/utils'
import type { SerializedStyles } from '@emotion/serialize'
import type { EmotionCache } from '@emotion/cache'
// @ts-ignore
import { useInsertionEffectAlwaysWithSyncFallback } from '@emotion/use-insertion-effect-with-fallbacks'

const isBrowser = typeof document !== 'undefined'

export const Insertion = ({
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

    return (
      <style
        {...{
          [`data-emotion`]: `${cache.key} ${serializedNames}`,
          dangerouslySetInnerHTML: { __html: rules },
          nonce: cache.sheet.nonce,
        }}
      />
    )
  }
  return null
}

Insertion.displayName = 'Insertion'
