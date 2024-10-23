import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Wallet from '../../svg/outlined/wallet.svg'
import type { IconProps } from '../../types'

export const WalletOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Wallet, { className: 'wallet-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
