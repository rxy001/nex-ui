import type { ColorSchemeProviderProps } from '@nex-ui/system'

export function defineColorScheme(
  props: Omit<ColorSchemeProviderProps, 'children'>,
) {
  return props
}
