import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileWord from '../../svg/outlined/file-word.svg'
import type { IconProps } from '../../types'

export const FileWordOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileWord, { className: 'file-word-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
