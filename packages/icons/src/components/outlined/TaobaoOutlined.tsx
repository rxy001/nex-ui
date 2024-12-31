import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Taobao from '../../svg/outlined/taobao.svg'
import type { IconProps } from '../../types'

export const TaobaoOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Taobao, { className: 'taobao-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TaobaoOutlined.displayName = 'TaobaoOutlined'
