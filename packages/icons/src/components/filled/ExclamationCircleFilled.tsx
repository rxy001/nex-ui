import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ExclamationCircle from '../../svg/filled/exclamation-circle.svg'
import type { IconProps } from '../../types'

export const ExclamationCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(ExclamationCircle, {
          className: 'exclamation-circle-filled',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
