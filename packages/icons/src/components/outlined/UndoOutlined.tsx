import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Undo from '../../svg/outlined/undo.svg'
import type { IconProps } from '../../types'

export const UndoOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Undo, { className: 'undo-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
