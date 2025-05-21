import { InitColorSchemeScript as Script } from '@nex-ui/system'
import type { InitColorSchemeScriptProps } from '@nex-ui/system'

export const InitColorSchemeScript = ({
  modeStorageKey = 'nui-color-scheme',
  colorSchemeSelector = 'data-nui-color-scheme',
  colorSchemeNode = 'document.documentElement',
  defaultMode = 'system',
  ...props
}: InitColorSchemeScriptProps) => (
  <Script
    modeStorageKey={modeStorageKey}
    colorSchemeNode={colorSchemeNode}
    colorSchemeSelector={colorSchemeSelector}
    defaultMode={defaultMode}
    {...props}
  />
)

InitColorSchemeScript.displayName = 'InitColorSchemeScript'

export type { InitColorSchemeScriptProps }
