import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Linkedin from '../../svg/filled/linkedin.svg'
import type { IconProps } from '../../types'

export const LinkedinFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Linkedin, { className: 'linkedin-filled' })
    return <Icon {...props} ref={ref} />
  },
)
