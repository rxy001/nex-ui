import type { Config } from 'tailwindcss'

export default {
  // 指定 tailwind 扫描的文件
  content: [
    '../components/**/*.{js,jsx,ts,tsx}',
    '../components/**/stories/**/*.{js,jsx,ts,tsx}',
    '../core/theme/src/components/**/*.{js,jsx,ts,tsx}',
    '../core/theme/src/utils/**/*.{js,jsx,ts,tsx}',
    '../core/theme/stories/**/*.{js,jsx,ts,tsx}',
  ],

  // 指定文件内未包含但又想生成的类名
  // One example of where this can be useful is if your site displays user-generated
  // content and you want users to be able to use a constrained set of Tailwind
  // classes in their content that might not exist in your own site’s source files.
  safelist: [],

  // 忽略的类
  blocklist: [],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
