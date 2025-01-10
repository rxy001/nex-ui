import { forEach, isFunction } from '@nex-ui/utils'
import type { ComponentUtilityClasses } from '../../types/utils'

export const resovleClasses = <
  ClassKey extends string,
  OwnerState extends object | void = void,
>(
  classes: ComponentUtilityClasses<OwnerState, ClassKey> | undefined,
  ownerState: OwnerState,
) => {
  const output = {} as Record<ClassKey, string[]>

  // @ts-ignore
  forEach(classes, (className, slot: ClassKey) => {
    const slotClass = isFunction(className) ? className(ownerState) : className

    output[slot] = Array.isArray(slotClass) ? slotClass : [slotClass]
  })

  return output
}
