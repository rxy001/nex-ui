import { defineSemanticTokens } from '@nex-ui/system'

export const colors = defineSemanticTokens.colors({
  primary: {
    DEFAULT: {
      base: '{blue.500}',
      dark: '{blue.300}',
    },
    hover: {
      base: '{blue.400}',
      dark: '{blue.200}',
    },
    active: {
      base: '{blue.600}',
      dark: '{blue.400}',
    },
    contrastText: '#fff',
  },
})
