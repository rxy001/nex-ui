import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CodepenCircle from '../../svg/filled/codepen-circle.svg'
import type { IconProps } from '../../types'

export const CodepenCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CodepenCircle, {
      className: 'codepen-circle-filled',
    })
    return <Icon {...props} ref={ref} />
  },
)
