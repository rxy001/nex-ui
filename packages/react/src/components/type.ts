export type ClassNames = string | string[]

export type ComponentUtilityClasses<OwnerState, T extends string> = Partial<
  Record<T, ClassNames | ((ownerState: OwnerState) => ClassNames)>
>
