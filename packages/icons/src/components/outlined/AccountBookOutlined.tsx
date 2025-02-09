'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AccountBook from '../../svg/outlined/account-book.svg'
import type { IconProps } from '../../types'

export const AccountBookOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AccountBook, { className: 'account-book-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AccountBookOutlined.displayName = 'AccountBookOutlined'
