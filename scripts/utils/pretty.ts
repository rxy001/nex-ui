import { format } from 'prettier'
// @ts-ignore
import config from '../../.prettierrc.mjs'
import type { Options } from 'prettier'

export function pretty(value: any, options: Options = {}) {
  return format(value, {
    parser: 'typescript',
    ...config,
    ...options,
  })
}
