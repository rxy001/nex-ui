import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Wechat from '../../svg/filled/wechat.svg'
import type { IconProps } from '../../types'

export const WechatFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Wechat, { className: 'wechat-filled' })
  return <Icon {...props} ref={ref} />
})
