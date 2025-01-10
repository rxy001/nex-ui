import { isFunction, reduce } from '@nex-ui/utils'
import type { SxProps } from '../../types/utils'

export const resolveSxProps = <T extends object>(
  sx?: SxProps<T>,
  ownerState?: T,
) => {
  if (sx === undefined) {
    return sx
  }

  const output = isFunction(sx) ? sx(ownerState as T) : sx

  if (Array.isArray(output)) {
    return reduce(
      output,
      (acc, styleObject) => {
        return {
          ...acc,
          ...styleObject,
        }
      },
      {},
    )
  }

  return output
}
