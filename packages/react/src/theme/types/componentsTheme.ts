import type {
  ButtonRecipeConfig,
  FlexRecipeConfig,
  IconRecipeConfig,
} from '../recipes'
import type {
  ButtonProps,
  ButtonOwnerState,
  IconOwnerState,
  FlexOwnerState,
  FlexProps,
} from '../../components'
import type { InnerIconProps } from '../../components/icon/types'
import type { ComponentThemeFn, ExtractRecipeConfig } from './utils'

export type ComponentsTheme = {
  Button?: {
    styleOverrides?:
      | ExtractRecipeConfig<ButtonRecipeConfig>
      | ComponentThemeFn<ButtonOwnerState, ButtonRecipeConfig>
    defaultProps?: ButtonProps
  }
  Icon?: {
    styleOverrides?:
      | ExtractRecipeConfig<IconRecipeConfig>
      | ComponentThemeFn<IconOwnerState, IconRecipeConfig>
    defaultProps?: InnerIconProps
  }
  Flex?: {
    styleOverrides?:
      | ExtractRecipeConfig<FlexRecipeConfig>
      | ComponentThemeFn<FlexOwnerState, FlexRecipeConfig>
    defaultProps?: FlexProps
  }
}

export type ComponentNames = keyof ComponentsTheme
