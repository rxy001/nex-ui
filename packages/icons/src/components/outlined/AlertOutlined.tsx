import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Alert from '../../svg/outlined/alert.svg'
import type { IconProps } from '../../types'

export const AlertOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Alert, { className: 'alert-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
