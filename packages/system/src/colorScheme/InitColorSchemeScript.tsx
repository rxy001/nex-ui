import type { InitColorSchemeScriptProps } from './types'

export const InitColorSchemeScript = ({
  modeStorageKey,
  defaultMode = 'system',
  colorSchemeSelector = 'data',
  colorSchemeNode = 'document.documentElement',
}: InitColorSchemeScriptProps) => {
  let setter = ''
  let attribute = colorSchemeSelector
  if (colorSchemeSelector === 'class') {
    attribute = '.%s'
  }
  if (colorSchemeSelector === 'data') {
    attribute = `[data-color-scheme=%s]`
  }
  if (
    colorSchemeSelector?.startsWith('data-') &&
    !colorSchemeSelector.includes('%s')
  ) {
    // 'data-nui-color-scheme' -> '[data-nui-color-scheme="%s"]'
    attribute = `[${colorSchemeSelector}="%s"]`
  }

  const root = colorSchemeNode

  if (attribute.startsWith('.')) {
    const selector = attribute.substring(1)
    setter += `${root}.classList.remove('${selector}'.replace('%s', 'light'), '${selector}'.replace('%s', 'dark'));
      ${root}.classList.add('${selector}'.replace('%s', colorScheme));`
  } else {
    const matches = attribute.match(/\[([^\]]+)\]/)
    if (matches) {
      const [attr, value] = matches[1].split('=')
      if (!value) {
        setter += `${root}.removeAttribute('${attr}'.replace('%s', 'light'));
        ${root}.removeAttribute('${attr}'.replace('%s', 'dark'));`
      }
      setter += `
        ${root}.setAttribute('${attr}'.replace('%s', colorScheme), ${value ? `${value}.replace('%s', colorScheme)` : '""'});`
    } else {
      setter += `${root}.setAttribute('${attribute}', colorScheme);`
    }
  }

  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
try {

  let colorScheme = ''

  const mode = localStorage.getItem('${modeStorageKey}') || ${defaultMode}

  if (mode === 'system') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = 'dark'
    } else {
      colorScheme = 'light'
    }
  } else {
    colorScheme = mode
  }
 
  ${setter}
} catch {}
`,
      }}
    />
  )
}
