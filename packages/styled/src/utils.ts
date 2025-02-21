import { isPlainObject } from '@nex-ui/utils'
import isPropValid from '@emotion/is-prop-valid'
import type { CSSObject } from '@nex-ui/system'
import type { ElementType } from 'react'

export const getDefaultShouldForwardProp = (tag: ElementType) =>
  typeof tag === 'string' &&
  // a 为 97，小于 97 即为大写
  tag.charCodeAt(0) > 96
    ? isPropValid
    : (key: string) => key !== 'theme'

export const isSerializedStyles = (object: any) =>
  isPlainObject(object) &&
  object.name !== undefined &&
  object.styles !== undefined

export const composeSx = (
  ...args: (CSSObject | undefined | CSSObject[])[]
): CSSObject[] => {
  return args.filter(Boolean).flat(1) as CSSObject[]
}

export { isPropValid }
