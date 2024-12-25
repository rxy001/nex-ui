import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DropboxSquare from '../../svg/filled/dropbox-square.svg'
import type { IconProps } from '../../types'

export const DropboxSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DropboxSquare, { className: 'dropbox-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
