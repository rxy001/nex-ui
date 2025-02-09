'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DeleteRow from '../../svg/outlined/delete-row.svg'
import type { IconProps } from '../../types'

export const DeleteRowOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DeleteRow, { className: 'delete-row-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DeleteRowOutlined.displayName = 'DeleteRowOutlined'
