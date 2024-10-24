import type { InnerIconProps } from '../components/icon'
import type { StyleObjectOverrides } from './generated/cssProperties'

declare module '@nex-ui/icons' {
  interface IconProps extends InnerIconProps {}
}

declare module '@nex-ui/system' {
  interface StyleObject extends StyleObjectOverrides {}
}

export {}
