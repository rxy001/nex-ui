import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CodepenCircle from '../../svg/outlined/codepen-circle.svg'
import type { IconProps } from '../../types'

export const CodepenCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CodepenCircle, { className: 'codepen-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CodepenCircleOutlined.displayName = 'CodepenCircleOutlined'
