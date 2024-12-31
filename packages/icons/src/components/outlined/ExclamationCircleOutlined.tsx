import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ExclamationCircle from '../../svg/outlined/exclamation-circle.svg'
import type { IconProps } from '../../types'

export const ExclamationCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(ExclamationCircle, {
          className: 'exclamation-circle-outlined',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ExclamationCircleOutlined.displayName = 'ExclamationCircleOutlined'
