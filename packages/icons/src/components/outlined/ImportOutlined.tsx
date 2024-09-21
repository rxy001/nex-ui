import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Import from '../../svg/outlined/import.svg'
import type { IconProps } from '../../types'

export const ImportOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Import)
    return <Icon {...props} ref={ref} />
  },
)
