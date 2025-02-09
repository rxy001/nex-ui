'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FilePpt from '../../svg/outlined/file-ppt.svg'
import type { IconProps } from '../../types'

export const FilePptOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FilePpt, { className: 'file-ppt-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FilePptOutlined.displayName = 'FilePptOutlined'
