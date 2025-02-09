'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Ci from '../../svg/outlined/ci.svg'
import type { IconProps } from '../../types'

export const CiOutlined = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Ci, { className: 'ci-outlined' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

CiOutlined.displayName = 'CiOutlined'
