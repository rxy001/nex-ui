import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Copyright from '../../svg/outlined/copyright.svg'
import type { IconProps } from '../../types'

export const CopyrightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Copyright, { className: 'copyright-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
