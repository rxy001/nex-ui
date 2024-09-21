import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Translation from '../../svg/outlined/translation.svg'
import type { IconProps } from '../../types'

export const TranslationOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Translation)
    return <Icon {...props} ref={ref} />
  },
)
