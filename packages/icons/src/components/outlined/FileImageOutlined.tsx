import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileImage from '../../svg/outlined/file-image.svg'
import type { IconProps } from '../../types'

export const FileImageOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileImage, { className: 'file-image-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileImageOutlined.displayName = 'FileImageOutlined'
