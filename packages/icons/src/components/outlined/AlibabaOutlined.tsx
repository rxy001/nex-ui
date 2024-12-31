import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Alibaba from '../../svg/outlined/alibaba.svg'
import type { IconProps } from '../../types'

export const AlibabaOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Alibaba, { className: 'alibaba-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AlibabaOutlined.displayName = 'AlibabaOutlined'
