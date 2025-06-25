import { chain, isPlainObject } from '@nex-ui/utils'
import isPropValid from '@emotion/is-prop-valid'
import type { StyledOptions, StyledElementType } from './types'

export const getDefaultShouldForwardProp = (tag: React.ElementType) =>
  typeof tag === 'string' &&
  // a 为 97，小于 97 即为大写
  tag.charCodeAt(0) > 96
    ? isPropValid
    : (key: string) => key !== 'theme'

export const isSerializedStyles = (object: any) =>
  isPlainObject(object) &&
  object.name !== undefined &&
  object.styles !== undefined

export const composeShouldForwardProps = (
  tag: StyledElementType,
  options: StyledOptions | undefined,
  isReal: boolean,
) => {
  let shouldForwardProp
  if (options) {
    const optionsShouldForwardProp = options.shouldForwardProp
    shouldForwardProp =
      tag.__emotion_forwardProp && optionsShouldForwardProp
        ? chain(tag.__emotion_forwardProp, optionsShouldForwardProp)
        : optionsShouldForwardProp
  }

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp
  }

  return shouldForwardProp
}
