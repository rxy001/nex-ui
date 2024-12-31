import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Idcard from '../../svg/outlined/idcard.svg'
import type { IconProps } from '../../types'

export const IdcardOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Idcard, { className: 'idcard-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

IdcardOutlined.displayName = 'IdcardOutlined'
