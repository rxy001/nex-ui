import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileImage from '../../svg/filled/file-image.svg'
import type { IconProps } from '../../types'

export const FileImageFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileImage, { className: 'file-image-filled' })
    return <Icon {...props} ref={ref} />
  },
)
