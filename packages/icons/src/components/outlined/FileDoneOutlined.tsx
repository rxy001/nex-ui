import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileDone from '../../svg/outlined/file-done.svg'
import type { IconProps } from '../../types'

export const FileDoneOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileDone, { className: 'file-done-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileDoneOutlined.displayName = 'FileDoneOutlined'
