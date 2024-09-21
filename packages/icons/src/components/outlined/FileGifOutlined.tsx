import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileGif from '../../svg/outlined/file-gif.svg'
import type { IconProps } from '../../types'

export const FileGifOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileGif)
    return <Icon {...props} ref={ref} />
  },
)
