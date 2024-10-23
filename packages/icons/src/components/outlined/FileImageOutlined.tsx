import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileImage from '../../svg/outlined/file-image.svg'
import type { IconProps } from '../../types'

export const FileImageOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileImage, { className: 'file-image-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
