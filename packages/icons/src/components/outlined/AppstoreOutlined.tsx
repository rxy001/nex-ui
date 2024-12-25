import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Appstore from '../../svg/outlined/appstore.svg'
import type { IconProps } from '../../types'

export const AppstoreOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Appstore, { className: 'appstore-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
