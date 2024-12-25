import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Linkedin from '../../svg/outlined/linkedin.svg'
import type { IconProps } from '../../types'

export const LinkedinOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Linkedin, { className: 'linkedin-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
