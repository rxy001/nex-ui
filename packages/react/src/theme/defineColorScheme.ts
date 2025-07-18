import type { ColorSchemeProviderProps } from '@nex-ui/system'

export const defineColorScheme = (
  props: Omit<ColorSchemeProviderProps, 'children'>,
) => {
  return props
}
