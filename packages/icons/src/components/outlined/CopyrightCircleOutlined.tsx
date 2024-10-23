import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CopyrightCircle from '../../svg/outlined/copyright-circle.svg'
import type { IconProps } from '../../types'

export const CopyrightCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CopyrightCircle, {
      className: 'copyright-circle-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
