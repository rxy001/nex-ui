import { buttonStyles } from './button'
import { iconStyles } from './icon'
import type { ExtractComponentVariants } from '../utils.types'

export * from './button'
export * from './icon'

export const styles = {
  Button: buttonStyles,
  Icon: iconStyles,
}

export type Styles = typeof styles

export type ButtonStyles = typeof buttonStyles
export type ButtonVariants = ExtractComponentVariants<ButtonStyles>

export type IconStyles = typeof iconStyles
export type IconVariants = ExtractComponentVariants<IconStyles>
