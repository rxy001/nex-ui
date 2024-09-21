import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileAdd from '../../svg/outlined/file-add.svg'
import type { IconProps } from '../../types'

export const FileAddOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileAdd)
    return <Icon {...props} ref={ref} />
  },
)
