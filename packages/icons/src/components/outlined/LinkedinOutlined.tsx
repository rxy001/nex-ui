import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Linkedin from '../../svg/outlined/linkedin.svg'
import type { IconProps } from '../../types'

export const LinkedinOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Linkedin, { className: 'linkedin-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
