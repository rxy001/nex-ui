import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileExclamation from '../../svg/outlined/file-exclamation.svg'
import type { IconProps } from '../../types'

export const FileExclamationOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileExclamation, {
      className: 'file-exclamation-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
