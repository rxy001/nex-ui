import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Aliwangwang from '../../svg/filled/aliwangwang.svg'
import type { IconProps } from '../../types'

export const AliwangwangFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Aliwangwang, { className: 'aliwangwang-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
