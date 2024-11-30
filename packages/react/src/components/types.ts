import type { StyledComponentProps as SCP } from '@nex-ui/styled'

export type ClassNames = string | string[]

export type ComponentUtilityClasses<OwnerState, T extends string> = Partial<
  Record<T, ClassNames | ((ownerState: OwnerState) => ClassNames)>
>

export type StyledComponentProps<P> = SCP & P
