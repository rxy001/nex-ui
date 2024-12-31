import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Question from '../../svg/outlined/question.svg'
import type { IconProps } from '../../types'

export const QuestionOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Question, { className: 'question-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

QuestionOutlined.displayName = 'QuestionOutlined'
