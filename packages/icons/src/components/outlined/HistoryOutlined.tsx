import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import History from '../../svg/outlined/history.svg'
import type { IconProps } from '../../types'

export const HistoryOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(History)
    return <Icon {...props} ref={ref} />
  },
)
