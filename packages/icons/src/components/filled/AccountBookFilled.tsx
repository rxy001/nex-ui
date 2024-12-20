import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AccountBook from '../../svg/filled/account-book.svg'
import type { IconProps } from '../../types'

export const AccountBookFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AccountBook, { className: 'account-book-filled' })
    return <Icon {...props} ref={ref} />
  },
)
