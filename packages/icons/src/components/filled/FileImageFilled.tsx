'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileImage from '../../svg/filled/file-image.svg'
import type { IconProps } from '../../types'

export const FileImageFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileImage, { className: 'file-image-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileImageFilled.displayName = 'FileImageFilled'
