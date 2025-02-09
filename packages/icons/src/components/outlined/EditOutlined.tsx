'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Edit from '../../svg/outlined/edit.svg'
import type { IconProps } from '../../types'

export const EditOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Edit, { className: 'edit-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

EditOutlined.displayName = 'EditOutlined'
