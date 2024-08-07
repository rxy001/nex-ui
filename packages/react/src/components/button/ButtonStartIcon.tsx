import { nex } from '@nex-ui/styled'
import { buttonStartIcon } from '../../theme'
import { useNexContext } from '../provider'
import type { ButtonIconProps } from './types'

export const ButtonStartIcon = ({ children, size, spin }: ButtonIconProps) => {
  const { prefix, styles } = useNexContext()
  return (
    <nex.span
      css={styles(buttonStartIcon)({
        size: size === 'sm' ? size : undefined,
        spin,
      })}
      className={`${prefix}-start-icon`}
    >
      {children}
    </nex.span>
  )
}
