import isPropValid from '@emotion/is-prop-valid'
import { isPlainObject } from '@nex-ui/utils'
import type { ElementType } from 'react'

export const getDefaultShouldForwardProp = (tag: ElementType) =>
  typeof tag === 'string' &&
  // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character

  // a 为 97，小于 97 即为大写
  tag.charCodeAt(0) > 96
    ? isPropValid
    : (key: string) => key !== 'theme'

export const isSerializedStyles = (object: any) =>
  isPlainObject(object) &&
  object.name !== undefined &&
  object.styles !== undefined
