import { nex } from '@nex-ui/styled'
import { buttonEndIcon } from '@theme'
import { useNexContext } from '../provider'
import type { ButtonIconProps } from './types'

export const ButtonEndIcon = ({ children, size }: ButtonIconProps) => {
  const { prefix, styles } = useNexContext()
  return (
    <nex.span
      css={styles(buttonEndIcon)({
        size: size === 'sm' ? size : undefined,
      })}
      className={`${prefix}-end-icon`}
    >
      {children}
    </nex.span>
  )
}
