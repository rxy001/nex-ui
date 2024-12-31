import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CodepenCircle from '../../svg/filled/codepen-circle.svg'
import type { IconProps } from '../../types'

export const CodepenCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CodepenCircle, { className: 'codepen-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CodepenCircleFilled.displayName = 'CodepenCircleFilled'
