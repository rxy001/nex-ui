'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { CodeWindow } from '../CodeWindow'

const snippets = [
  `import { defineTheme } from '@nex-ui/react'

export const theme = defineTheme({
  tokens: {
    color: {
      white: '#fff',
      blue: {
        50: '#E6F1FE',
        100: '#CCE3FD',
        200: '#99C7FB',
        300: '#66AAF9',
        400: '#338EF7',
        500: '#006FEE',
        600: '#005BC4',
        700: '#004493',
        800: '#002E62',
        900: '#14204a',
      },
    },
    borders: {
      xs: '0.5px solid',
      sm: '1px solid',
      md: '2px solid',
    },
    radii: {
      xs: '3px',
      sm: '6px',
      md: '9px',
    },
    spaces: {
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
    },
    borderWidths: {
      xs: '0.5px',
      sm: '1px',
      md: '2px',
    },
    ...
  }
})
  `,
  `import { defineTheme } from '@nex-ui/react'

export const theme = defineTheme({
  semanticTokens: {
    colors: {
      danger: 'red',
      // reference token
      success: '{colors.green.500}',
      outlined: {
        // nested token
        fg: {
          _DEFAULT: '{colors.blue.500}',
          // conditional token
          _dark: '{colors.blue.600}',
        },
        hover: {
          _DEFAULT: '{colors.blue.400}',
          _dark: '{colors.blue.500}',
        },
        active: {
          _DEFAULT: '{colors.blue.600}',
          _dark: '{colors.blue.600}',
        }
      }
    }
  }
})
  `,
  `import { defineTheme } from '@nex-ui/react'
  
export const theme = defineTheme({
  scales: {
    color: 'colors',
    borderColor: 'colors',
    width: 'sizes',
    minWidth: 'sizes',
    fontWeight: 'fontWeights',
    lineHeight: 'lineHeights',
    fontFamily: 'fontFamilies',
    fontSize: 'fontSizes',
    padding: 'spaces',
    margin: 'spaces',
    borderRadius: 'radii',
    ...
  }
})`,
  `import { defineTheme } from '@nex-ui/react'
  
export const theme = defineTheme({
  components: {
    Avatar: {
      styleOverrides: (ownerState) => {
        return {
          bg: 'transparent',
        }
      },
    },
    Button: {
      defaultProps: {
        size: 'lg',
        color: 'orange',
      },
      styleOverrides: {
        slots: {
          root: {
            bg: 'transparent',
          },
          startIcon: {
            mr: '2',
          },
          endIcon: {
            ml: '2',
          },
        },
        variants: {
          variant: {
            link: {
              root: {
                color: 'blue.200',
              },
            },
          },
        },
      },
    },
  },
})`,
]

export type ThemeProps = {
  translations?: {
    tokensDesc?: string
    semanticTokensDesc?: string
    scalesDesc?: string
    componentsDesc?: string
  }
}

export function Theme({ translations }: ThemeProps) {
  const [index, setIndex] = useState(0)

  const contents = [
    {
      title: 'Tokens',
      description: translations?.tokensDesc,
    },
    {
      title: 'Semantic Tokens',
      description: translations?.semanticTokensDesc,
    },
    {
      title: 'Scales',
      description: translations?.scalesDesc,
    },
    {
      title: 'Components',
      description: translations?.componentsDesc,
    },
  ]

  return (
    <div className='x:gap-12 x:flex x:flex-col x:lg:flex-row'>
      <div className='x:max-lg:gap-3 x:flex x:flex-col x:lg:justify-between x:lg:h-[544px] x:lg:w-1/2 '>
        {contents.map(({ title, description }, i) => (
          <button
            key={title}
            className={clsx(
              'x:p-4 x:text-left x:hover:shadow-lg x:rounded-md x:hover:transform-[translateY(-2px)] x:transition-transform x:dark:hover:bg-[#202425]',
              i === index
                ? 'x:shadow-lg x:transform-[translateY(-2px)] x:dark:bg-[#202425] '
                : '',
            )}
            onClick={() => setIndex(i)}
          >
            <h4 className='x:font-bold'>{title}</h4>
            <p className='x:mt-2'>{description}</p>
          </button>
        ))}
      </div>
      <CodeWindow
        lang='ts'
        file='Theme.ts'
        className='x:lg:flex-1'
        codeClassName='x:lg:max-h-[512px]! x:lg:h-[512px]!'
      >
        {snippets[index]}
      </CodeWindow>
    </div>
  )
}
