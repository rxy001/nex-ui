import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Kubernetes from '../../svg/outlined/kubernetes.svg'
import type { IconProps } from '../../types'

export const KubernetesOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Kubernetes, { className: 'kubernetes-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
