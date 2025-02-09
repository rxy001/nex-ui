'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import UsergroupAdd from '../../svg/outlined/usergroup-add.svg'
import type { IconProps } from '../../types'

export const UsergroupAddOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(UsergroupAdd, { className: 'usergroup-add-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

UsergroupAddOutlined.displayName = 'UsergroupAddOutlined'
