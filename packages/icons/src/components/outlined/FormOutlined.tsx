import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Form from '../../svg/outlined/form.svg'
import type { IconProps } from '../../types'

export const FormOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Form, { className: 'form-outlined' })
  return <Icon {...props} ref={ref} />
})
