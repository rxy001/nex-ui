import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BehanceSquare from '../../svg/outlined/behance-square.svg'
import type { IconProps } from '../../types'

export const BehanceSquareOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BehanceSquare, {
      className: 'behance-square-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
