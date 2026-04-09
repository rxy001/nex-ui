import { useMemo } from 'react'
import { Global } from '@emotion/react'
import { merge } from '@nex-ui/utils'
import { createSystem } from '../system'
import { InnerSystemProvider } from './SystemContext'
import {
  ColorSchemeProvider,
  createGetColorSchemeSelector,
} from '../colorScheme'
import type { ConditionKey } from '../tokens'
import type { Dictionary, Interpolation } from '../types'
import type { SystemProviderProps } from './types'

export function SystemProvider({
  children,
  prefix,
  aliases,
  tokens,
  semanticTokens,
  scales,
  breakpoints,
  selectors,
  colorSchemeNode,
  forcedMode,
  disableCascadeLayers = false,
  disablePreflight = false,
  defaultMode = 'system',
  modeStorageKey = 'color-scheme',
  colorSchemeSelector = 'data',
}: SystemProviderProps) {
  const getColorSchemeSelector = useMemo(
    () => createGetColorSchemeSelector(colorSchemeSelector),
    [colorSchemeSelector],
  )

  const { css, getGlobalCssVars, layers, isSystemCSSProperty } = useMemo(() => {
    return createSystem({
      prefix,
      aliases,
      tokens,
      semanticTokens,
      scales,
      breakpoints,
      disableCascadeLayers,
      selectors: {
        ...selectors,
        dark: getColorSchemeSelector('dark'),
        light: getColorSchemeSelector('light'),
      },
    })
  }, [
    aliases,
    breakpoints,
    prefix,
    disableCascadeLayers,
    getColorSchemeSelector,
    scales,
    selectors,
    semanticTokens,
    tokens,
  ])

  const globalCssVars = useMemo(() => {
    const cssVarMap = getGlobalCssVars()
    const result: Dictionary = {}

    cssVarMap.forEach((value, key: ConditionKey) => {
      const cssVar = Object.fromEntries(value.entries())

      if (key === 'base') {
        const base = {
          ':root': cssVar,
        }
        merge(result, layers.wrapWithLayer('theme', base))
        return
      }

      const theme = {
        [getColorSchemeSelector(key)]: {
          ':root': {
            colorScheme: key,
            ...cssVar,
          },
        },
      }

      merge(result, layers.wrapWithLayer('theme', theme))
    })

    return result
  }, [getColorSchemeSelector, getGlobalCssVars, layers])

  const preflightStyles = useMemo(() => {
    const styles: Dictionary = {
      '*,::after,::before,::backdrop,::file-selector-button': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
        border: '0 solid',
      },
      'html,:host': {
        tabSize: 4,
        WebkitTapHighlightColor: 'transparent',
        WebkitTextSizeAdjust: '100%',
      },
      hr: {
        height: 0,
        color: 'inherit',
        borderTopWidth: '1px',
      },
      'abbr:where([title])': {
        WebkitTextDecoration: 'underline dotted',
        textDecoration: 'underline dotted',
      },
      'h1,h2,h3,h4,h5,h6': {
        fontSize: 'inherit',
        fontWeight: 'inherit',
      },
      a: {
        color: 'inherit',
        WebkitTextDecoration: 'inherit',
        textDecoration: 'inherit',
      },
      'b,strong': {
        fontWeight: 'bolder',
      },
      'code,kbd,samp,pre': {
        fontSize: '1em',
      },
      small: {
        fontSize: '80%',
      },
      'sub,sup': {
        fontSize: '75%',
        lineHeight: '0',
        position: 'relative',
        verticalAlign: 'baseline',
      },
      sub: {
        bottom: '-0.25em',
      },
      sup: {
        top: '-0.5em',
      },
      table: {
        textIndent: 0,
        borderColor: 'inherit',
        borderCollapse: 'collapse',
      },
      ':-moz-focusring': {
        outline: 'auto',
      },
      progress: {
        verticalAlign: 'baseline',
      },
      summary: {
        display: 'list-item',
      },
      'ol,ul,menu': {
        listStyle: 'none',
      },
      'img,svg,video,canvas,audio,iframe,embed,object': {
        display: 'block',
        verticalAlign: 'middle',
      },
      'img,video': {
        maxWidth: '100%',
        height: 'auto',
      },
      'button,input,select,optgroup,textarea,::file-selector-button': {
        font: 'inherit',
        fontFeatureSettings: 'inherit',
        fontVariationSettings: 'inherit',
        letterSpacing: 'inherit',
        color: 'inherit',
        borderRadius: 0,
        backgroundColor: 'transparent',
        opacity: 1,
      },
      ':where(select:is([multiple], [size])) optgroup': {
        fontWeight: 'bolder',
      },
      ':where(select:is([multiple], [size])) optgroup option': {
        paddingInlineStart: '20px',
      },
      '::file-selector-button': {
        marginInlineEnd: '4px',
      },
      '::placeholder': {
        opacity: 1,
      },
      textarea: {
        resize: 'vertical',
      },
      '::-webkit-search-decoration': {
        WebkitAppearance: 'none',
      },
      'input[type="text"], input[type="email"], input[type="search"], input[type="password"]':
        {
          WebkitAppearance: 'none',
          MozAppearance: 'none',
        },
      'input[type="search"]': {
        '::-webkit-search-decoration': {
          WebkitAppearance: 'none',
        },
        '::-webkit-search-cancel-button': {
          WebkitAppearance: 'none',
        },
      },
      '::-webkit-date-and-time-value': {
        minHeight: '1lh',
        textAlign: 'inherit',
      },
      '::-webkit-datetime-edit': {
        display: 'inline-flex',
      },
      '::-webkit-datetime-edit-fields-wrapper': {
        padding: 0,
      },
      '::-webkit-datetime-edit,::-webkit-datetime-edit-year-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-meridiem-field':
        {
          paddingBlock: 0,
        },
      '::-webkit-calendar-picker-indicator': {
        lineHeight: 1,
      },
      ':-moz-ui-invalid': {
        boxShadow: 'none',
      },
      'button,input:where([type="button"], [type="reset"], [type="submit"]),::file-selector-button':
        {
          appearance: 'button',
        },
      '::-webkit-inner-spin-button,::-webkit-outer-spin-button': {
        height: 'auto',
      },
    }
    return layers.wrapWithLayer('preflight', styles) as Dictionary
  }, [layers])

  const methods = useMemo(
    () => ({
      layers,
      isSystemCSSProperty,
      css: (styles: Interpolation) => css(layers.wrapWithLayer('css', styles)),
    }),
    [css, isSystemCSSProperty, layers],
  )

  const globalStyles = disablePreflight
    ? globalCssVars
    : [globalCssVars, preflightStyles]

  return (
    <InnerSystemProvider value={methods}>
      <ColorSchemeProvider
        forcedMode={forcedMode}
        defaultMode={defaultMode}
        modeStorageKey={modeStorageKey}
        colorSchemeSelector={colorSchemeSelector}
        colorSchemeNode={colorSchemeNode}
      >
        {!disableCascadeLayers ? <Global styles={layers.atRules} /> : null}
        <Global styles={globalStyles} />
        {children}
      </ColorSchemeProvider>
    </InnerSystemProvider>
  )
}

SystemProvider.displayName = 'SystemProvider'
