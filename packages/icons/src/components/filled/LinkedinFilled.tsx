import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Linkedin from '../../svg/filled/linkedin.svg'
import type { IconProps } from '../../types'

export const LinkedinFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Linkedin, { className: 'linkedin-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LinkedinFilled.displayName = 'LinkedinFilled'
