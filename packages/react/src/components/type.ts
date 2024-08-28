export type ClassNames = string | string[]

export type ComponentClasses<OwnerState, T extends string> = Partial<
  Record<T, ClassNames | ((ownerState: OwnerState) => ClassNames)>
>
