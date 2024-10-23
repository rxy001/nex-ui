import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Compress from '../../svg/outlined/compress.svg'
import type { IconProps } from '../../types'

export const CompressOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Compress, { className: 'compress-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
