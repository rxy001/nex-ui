import type { ButtonStyles, FlexStyles, IconStyles } from '../styles'
import type {
  ButtonProps,
  ButtonOwnerState,
  IconOwnerState,
  FlexOwnerState,
  FlexProps,
} from '../../components'
import type { InnerIconProps } from '../../components/icon/types'
import type { ComponentThemeFn, ExtractComponentStyles } from './utils'

export type ComponentsTheme = {
  Button?: {
    styleOverrides?:
      | ExtractComponentStyles<ButtonStyles>
      | ComponentThemeFn<ButtonOwnerState, ButtonStyles>
    defaultProps?: ButtonProps
  }
  Icon?: {
    styleOverrides?:
      | ExtractComponentStyles<IconStyles>
      | ComponentThemeFn<IconOwnerState, IconStyles>
    defaultProps?: InnerIconProps
  }
  Flex?: {
    styleOverrides?:
      | ExtractComponentStyles<FlexStyles>
      | ComponentThemeFn<FlexOwnerState, FlexStyles>
    defaultProps?: FlexProps
  }
}

export type ComponentNames = keyof ComponentsTheme
