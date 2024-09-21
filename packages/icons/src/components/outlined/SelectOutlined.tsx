import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Select from '../../svg/outlined/select.svg'
import type { IconProps } from '../../types'

export const SelectOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Select)
    return <Icon {...props} ref={ref} />
  },
)
