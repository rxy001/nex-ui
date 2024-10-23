import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CodepenSquare from '../../svg/filled/codepen-square.svg'
import type { IconProps } from '../../types'

export const CodepenSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CodepenSquare, {
      className: 'codepen-square-filled',
    })
    return <Icon {...props} ref={ref} />
  },
)
