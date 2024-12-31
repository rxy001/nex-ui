import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Form from '../../svg/outlined/form.svg'
import type { IconProps } from '../../types'

export const FormOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Form, { className: 'form-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FormOutlined.displayName = 'FormOutlined'
