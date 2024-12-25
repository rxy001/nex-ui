import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DropboxCircle from '../../svg/filled/dropbox-circle.svg'
import type { IconProps } from '../../types'

export const DropboxCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DropboxCircle, { className: 'dropbox-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
