import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileWord from '../../svg/outlined/file-word.svg'
import type { IconProps } from '../../types'

export const FileWordOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileWord)
    return <Icon {...props} ref={ref} />
  },
)
