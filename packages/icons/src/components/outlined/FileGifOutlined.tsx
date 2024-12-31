import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileGif from '../../svg/outlined/file-gif.svg'
import type { IconProps } from '../../types'

export const FileGifOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileGif, { className: 'file-gif-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileGifOutlined.displayName = 'FileGifOutlined'
