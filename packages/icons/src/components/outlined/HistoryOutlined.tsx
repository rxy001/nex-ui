import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import History from '../../svg/outlined/history.svg'
import type { IconProps } from '../../types'

export const HistoryOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(History, { className: 'history-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
