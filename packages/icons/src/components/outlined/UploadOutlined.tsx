import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Upload from '../../svg/outlined/upload.svg'
import type { IconProps } from '../../types'

export const UploadOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Upload, { className: 'upload-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
