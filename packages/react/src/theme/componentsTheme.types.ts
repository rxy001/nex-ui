import type { ButtonStyles, IconStyles } from './styles'
import type {
  ButtonProps,
  ButtonOwnerState,
  IconOwnerState,
} from '../components'
import type { InnerIconProps } from '../components/icon/types'
import type { ComponentThemeFn, ExtractComponentStyles } from './utils.types'

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
}

export type ComponentNames = keyof ComponentsTheme
