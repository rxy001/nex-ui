import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileJpg from '../../svg/outlined/file-jpg.svg'
import type { IconProps } from '../../types'

export const FileJpgOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileJpg, { className: 'file-jpg-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileJpgOutlined.displayName = 'FileJpgOutlined'
