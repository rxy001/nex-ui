'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileProtect from '../../svg/outlined/file-protect.svg'
import type { IconProps } from '../../types'

export const FileProtectOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileProtect, { className: 'file-protect-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileProtectOutlined.displayName = 'FileProtectOutlined'
