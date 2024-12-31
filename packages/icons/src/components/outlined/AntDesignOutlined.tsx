import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AntDesign from '../../svg/outlined/ant-design.svg'
import type { IconProps } from '../../types'

export const AntDesignOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AntDesign, { className: 'ant-design-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AntDesignOutlined.displayName = 'AntDesignOutlined'
