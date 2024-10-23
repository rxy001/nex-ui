import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Folder from '../../svg/filled/folder.svg'
import type { IconProps } from '../../types'

export const FolderFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Folder, { className: 'folder-filled' })
  return <Icon {...props} ref={ref} />
})
