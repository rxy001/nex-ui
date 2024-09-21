import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Wallet from '../../svg/filled/wallet.svg'
import type { IconProps } from '../../types'

export const WalletFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Wallet)
  return <Icon {...props} ref={ref} />
})
