import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import OneToOne from '../../svg/outlined/one-to-one.svg'
import type { IconProps } from '../../types'

export const OneToOneOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(OneToOne, { className: 'one-to-one-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

OneToOneOutlined.displayName = 'OneToOneOutlined'
