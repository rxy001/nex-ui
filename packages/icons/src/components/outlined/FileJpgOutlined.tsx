import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileJpg from '../../svg/outlined/file-jpg.svg'
import type { IconProps } from '../../types'

export const FileJpgOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileJpg)
    return <Icon {...props} ref={ref} />
  },
)
