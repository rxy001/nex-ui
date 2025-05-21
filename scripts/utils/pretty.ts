import { format } from 'prettier'
import type { Options } from 'prettier'
// @ts-ignore
import config from '../../.prettierrc.mjs'

export function pretty(value: any, options: Options = {}) {
  return format(value, {
    parser: 'typescript',
    ...config,
    ...options,
  })
}
