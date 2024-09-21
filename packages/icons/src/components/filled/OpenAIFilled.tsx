import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import OpenAI from '../../svg/filled/open-a-i.svg'
import type { IconProps } from '../../types'

export const OpenAIFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(OpenAI)
  return <Icon {...props} ref={ref} />
})
