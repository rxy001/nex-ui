import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DropboxSquare from '../../svg/filled/dropbox-square.svg'
import type { IconProps } from '../../types'

export const DropboxSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DropboxSquare, {
      className: 'dropbox-square-filled',
    })
    return <Icon {...props} ref={ref} />
  },
)
