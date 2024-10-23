import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Kubernetes from '../../svg/outlined/kubernetes.svg'
import type { IconProps } from '../../types'

export const KubernetesOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Kubernetes, { className: 'kubernetes-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
