import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Appstore from '../../svg/outlined/appstore.svg'
import type { IconProps } from '../../types'

export const AppstoreOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Appstore)
    return <Icon {...props} ref={ref} />
  },
)
