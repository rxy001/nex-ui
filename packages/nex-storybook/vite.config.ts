import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      extensions: [
        '.mjs',
        '.js',
        '.mts',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.css',
      ],
      alias: {
        '@theme': resolve('../nex-react/src/theme'),
        '@nex-ui/react': resolve('../nex-react/src'),
        '@nex-ui/utils': resolve('../nex-utils/src'),
        '@nex-ui/styled': resolve('../nex-styled/src'),
        '@nex-ui/system': resolve('../nex-system/src'),
      },
    },
  }
})
