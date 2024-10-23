import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileWord from '../../svg/filled/file-word.svg'
import type { IconProps } from '../../types'

export const FileWordFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileWord, { className: 'file-word-filled' })
    return <Icon {...props} ref={ref} />
  },
)
