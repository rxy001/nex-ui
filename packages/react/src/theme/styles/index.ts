import { buttonStyles } from './button'
import { iconStyles } from './icon'

export const styles = {
  Button: buttonStyles,
  Icon: iconStyles,
}

export type Styles = typeof styles

export * from './button'
export * from './icon'
