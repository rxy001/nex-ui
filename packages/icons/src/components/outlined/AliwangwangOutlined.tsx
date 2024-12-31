import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Aliwangwang from '../../svg/outlined/aliwangwang.svg'
import type { IconProps } from '../../types'

export const AliwangwangOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Aliwangwang, { className: 'aliwangwang-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AliwangwangOutlined.displayName = 'AliwangwangOutlined'
