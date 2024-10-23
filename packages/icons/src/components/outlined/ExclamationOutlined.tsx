import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Exclamation from '../../svg/outlined/exclamation.svg'
import type { IconProps } from '../../types'

export const ExclamationOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Exclamation, { className: 'exclamation-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
