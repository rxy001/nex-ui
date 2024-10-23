import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileDone from '../../svg/outlined/file-done.svg'
import type { IconProps } from '../../types'

export const FileDoneOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileDone, { className: 'file-done-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
