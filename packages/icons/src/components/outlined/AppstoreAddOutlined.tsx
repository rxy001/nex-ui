'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AppstoreAdd from '../../svg/outlined/appstore-add.svg'
import type { IconProps } from '../../types'

export const AppstoreAddOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AppstoreAdd, { className: 'appstore-add-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AppstoreAddOutlined.displayName = 'AppstoreAddOutlined'
