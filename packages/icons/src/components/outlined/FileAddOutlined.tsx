import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileAdd from '../../svg/outlined/file-add.svg'
import type { IconProps } from '../../types'

export const FileAddOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileAdd, { className: 'file-add-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
