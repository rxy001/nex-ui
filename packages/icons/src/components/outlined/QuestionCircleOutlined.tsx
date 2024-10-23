import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import QuestionCircle from '../../svg/outlined/question-circle.svg'
import type { IconProps } from '../../types'

export const QuestionCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(QuestionCircle, {
      className: 'question-circle-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
