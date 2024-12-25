import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import File from '../../svg/outlined/file.svg'
import type { IconProps } from '../../types'

export const FileOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(File, { className: 'file-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
