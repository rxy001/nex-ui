import { isFunction, reduce } from '@nex-ui/utils'
import type { StyleObject } from '@nex-ui/system'
import type { SxProps } from '../../types/utils'

export const resolveSxProps = <T extends object>(
  sx: SxProps<T> | undefined,
  ownerState: T,
): StyleObject | undefined => {
  if (sx === undefined) {
    return sx
  }

  const output = isFunction(sx) ? sx(ownerState) : sx

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
