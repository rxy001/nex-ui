import type { StyleObject } from '@nex-ui/system'

export interface FlexOwnerState {
  sx?: StyleObject
  children?: React.ReactNode
  justify?: StyleObject['justifyContent']
  align?: StyleObject['alignItems']
  direction?: StyleObject['flexDirection']
  wrap?: StyleObject['flexWrap']
  gap?: StyleObject['gap']
  grow?: StyleObject['flexGrow']
  shrink?: StyleObject['flexShrink']
  basis?: StyleObject['flexBasis']
}

export interface FlexProps
  extends Omit<HTMLDivElement, 'align' | 'children'>,
    FlexOwnerState {}
