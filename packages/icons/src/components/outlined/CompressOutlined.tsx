import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Compress from '../../svg/outlined/compress.svg'
import type { IconProps } from '../../types'

export const CompressOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Compress, { className: 'compress-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
