'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Api from '../../svg/filled/api.svg'
import type { IconProps } from '../../types'

export const ApiFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Api, { className: 'api-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

ApiFilled.displayName = 'ApiFilled'
