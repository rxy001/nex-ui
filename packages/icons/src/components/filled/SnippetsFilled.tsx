import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Snippets from '../../svg/filled/snippets.svg'
import type { IconProps } from '../../types'

export const SnippetsFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Snippets)
    return <Icon {...props} ref={ref} />
  },
)
