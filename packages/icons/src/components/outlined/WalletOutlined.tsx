import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Wallet from '../../svg/outlined/wallet.svg'
import type { IconProps } from '../../types'

export const WalletOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Wallet, { className: 'wallet-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
