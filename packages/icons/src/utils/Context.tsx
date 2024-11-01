import { createContext } from '@nex-ui/utils'
import type { Noop } from '@nex-ui/utils'

export interface IconsContext {
  createIcon: Noop
}

const DEFAULT_CONTEXT_VALUE = '__nex-icons-default-value'

const [IconsProvider, useNexIcons] = createContext<IconsContext>({
  contextName: 'NexIconsContext',
  providerName: 'IconsProvider',
  hookName: 'useNexIcons',
  strict: false,
  defaultValue: DEFAULT_CONTEXT_VALUE as unknown as IconsContext,
})

export { IconsProvider, useNexIcons, DEFAULT_CONTEXT_VALUE }
