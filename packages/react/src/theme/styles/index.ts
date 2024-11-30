import { buttonStyles } from './button'
import { iconStyles } from './icon'
import { flexStyles } from './flex'
import type { StylesVariantProps } from '../types/utils'

export * from './button'
export * from './icon'

export const styles = {
  Button: buttonStyles,
  Icon: iconStyles,
  Flex: flexStyles,
}

export type Styles = typeof styles

export type ButtonStyles = typeof buttonStyles
export type ButtonVariants = StylesVariantProps<ButtonStyles>

export type IconStyles = typeof iconStyles
export type IconVariants = StylesVariantProps<IconStyles>

export type FlexStyles = typeof flexStyles
export type FlexVariants = StylesVariantProps<FlexStyles>
