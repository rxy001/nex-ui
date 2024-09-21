import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Appstore from '../../svg/filled/appstore.svg'
import type { IconProps } from '../../types'

export const AppstoreFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Appstore)
    return <Icon {...props} ref={ref} />
  },
)
