'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Delete from '../../svg/filled/delete.svg'
import type { IconProps } from '../../types'

export const DeleteFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Delete, { className: 'delete-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DeleteFilled.displayName = 'DeleteFilled'
