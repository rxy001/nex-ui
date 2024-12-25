import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CiCircle from '../../svg/filled/ci-circle.svg'
import type { IconProps } from '../../types'

export const CiCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CiCircle, { className: 'ci-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
