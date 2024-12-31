import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AccountBook from '../../svg/filled/account-book.svg'
import type { IconProps } from '../../types'

export const AccountBookFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AccountBook, { className: 'account-book-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AccountBookFilled.displayName = 'AccountBookFilled'
