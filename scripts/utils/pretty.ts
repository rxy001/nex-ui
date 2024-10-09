import * as prettier from 'prettier'
import config from '../../.prettierrc.json'

export function pretty(value: any, options: prettier.Options = {}) {
  return prettier.format(value, {
    parser: 'typescript',
    ...config,
    ...options,
  })
}
