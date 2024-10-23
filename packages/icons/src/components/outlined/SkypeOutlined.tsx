import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Skype from '../../svg/outlined/skype.svg'
import type { IconProps } from '../../types'

export const SkypeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Skype, { className: 'skype-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
