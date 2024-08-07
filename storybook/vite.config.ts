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
        '@nex-ui/react': resolve('../packages/react/src'),
        '@nex-ui/utils': resolve('../packages/utils/src'),
        '@nex-ui/system': resolve('../packages/system/src'),
        '@nex-ui/styled': resolve('../packages/styled/src'),
      },
    },
  }
})
