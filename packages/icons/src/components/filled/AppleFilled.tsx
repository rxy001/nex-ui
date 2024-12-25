import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Apple from '../../svg/filled/apple.svg'
import type { IconProps } from '../../types'

export const AppleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Apple, { className: 'apple-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
