'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Appstore from '../../svg/filled/appstore.svg'
import type { IconProps } from '../../types'

export const AppstoreFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Appstore, { className: 'appstore-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AppstoreFilled.displayName = 'AppstoreFilled'
