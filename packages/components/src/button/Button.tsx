import { WaterWave } from '../waterWave'
import type { ButtonProps } from './types'
import { useButton } from './useButton'

export function Button(props: ButtonProps) {
  const { children, disabled, type, href } = props

  const { getProps } = useButton(props)

  const rootProps = {
    ...getProps(),
  }

  if (href !== undefined) {
    return (
      <a href={href} data-disabled={disabled} {...rootProps}>
        {children}
      </a>
    )
  }

  return (
    <WaterWave>
      <button type={type} disabled={disabled} {...rootProps}>
        {children}
      </button>
    </WaterWave>
  )
}
