import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DropboxCircle from '../../svg/filled/dropbox-circle.svg'
import type { IconProps } from '../../types'

export const DropboxCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DropboxCircle)
    return <Icon {...props} ref={ref} />
  },
)
