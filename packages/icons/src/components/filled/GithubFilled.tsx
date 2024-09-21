import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Github from '../../svg/filled/github.svg'
import type { IconProps } from '../../types'

export const GithubFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Github)
  return <Icon {...props} ref={ref} />
})
