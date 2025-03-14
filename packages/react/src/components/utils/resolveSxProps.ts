import { isFunction } from '@nex-ui/utils'
import type { CssFnParams } from '@nex-ui/system'
import type { SxProps } from '../../types/utils'

export const resolveSxProps = <T extends object>(
  sx: SxProps<T> | undefined,
  ownerState: T,
): CssFnParams => {
  if (sx === undefined) {
    return sx
  }

  return isFunction(sx) ? sx(ownerState) : sx
}
