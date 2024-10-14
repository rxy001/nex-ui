import { defineSemanticTokens } from '@nex-ui/system'

export const colors = defineSemanticTokens.colors({
  primary: {
    DEFAULT: {
      _DEFAULT: '{blue.500}',
      _light: '{blue.500}',
      _dark: '{blue.300}',
    },
    hover: {
      _DEFAULT: '{blue.400}',
      _dark: '{blue.200}',
    },
    active: {
      _DEFAULT: '{blue.600}',
      _dark: '{blue.400}',
    },
    contrastText: '#fff',
  },
})
