import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Wallet from '../../svg/filled/wallet.svg'
import type { IconProps } from '../../types'

export const WalletFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Wallet, { className: 'wallet-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
