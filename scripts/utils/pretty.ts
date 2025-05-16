import { format } from 'prettier'
import type { Options } from 'prettier'
import config from '../../.prettierrc.json'

export function pretty(value: any, options: Options = {}) {
  return format(value, {
    parser: 'typescript',
    ...config,
    ...options,
  })
}
