import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Codepen from '../../svg/outlined/codepen.svg'
import type { IconProps } from '../../types'

export const CodepenOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Codepen, { className: 'codepen-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CodepenOutlined.displayName = 'CodepenOutlined'
