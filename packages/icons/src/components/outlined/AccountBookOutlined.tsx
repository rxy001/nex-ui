import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AccountBook from '../../svg/outlined/account-book.svg'
import type { IconProps } from '../../types'

export const AccountBookOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AccountBook)
    return <Icon {...props} ref={ref} />
  },
)
