'use client'

import { defaultConfig } from '@nex-ui/react'
import { forEach, get, isString, map, walkObject } from '@nex-ui/utils'
import { readableColor } from 'color2k'
import { useClipboard } from '@nex-ui/hooks'
import clsx from 'clsx'
import type { ComponentProps } from 'react'

type CommonColor = {
  tokens: { color: string; token: string }[]
  title: string
}

const commonColors = (() => {
  let combinedTitle = ''
  const colors: CommonColor[] = []
  const combinedTokens: CommonColor['tokens'] = []

  forEach(defaultConfig.tokens?.colors, (items, color) => {
    if (isString(items)) {
      combinedTitle =
        combinedTitle === '' ? color : `${combinedTitle} & ${color}`
      combinedTokens.push({
        color: items,
        token: color,
      })
      return
    }
    colors.push({
      title: color,
      tokens: map(items, (item, key) => {
        return {
          color: item!,
          token: `${color}.${key}`,
        }
      }),
    })
  })

  return [
    {
      title: combinedTitle,
      tokens: combinedTokens,
    },
    ...colors,
  ]
})()

function Button({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      className={clsx(
        'x:shadow-xs x:w-34 x:h-34 x:flex x:items-center x:justify-center x:flex-col',
        'x:rounded-2xl x:overflow-hidden x:hover:opacity-80 x:active:opacity-100 x:transition-opacity',
        className,
      )}
      {...props}
    />
  )
}

export function CommonColors() {
  const { copy } = useClipboard()

  return map(commonColors, ({ title, tokens }) => (
    <div className='x:overflow-hidden' key={title}>
      <h3 className='x:mt-8 x:mb-4 x:font-bold x:text-2xl x:capitalize'>
        {title}
      </h3>
      <div className='x:flex x:gap-8 x:flex-wrap'>
        {tokens.map(({ color, token }) => (
          <Button
            className='x:px-4'
            style={{ background: color, color: readableColor(color) }}
            key={color}
            onClick={() => copy(token)}
          >
            <p className='x:font-medium x:uppercase'>{color}</p>
            <p className='x:text-sm x:font-medium'>{token}</p>
          </Button>
        ))}
      </div>
    </div>
  ))
}

type SemanticColor = {
  tokens: {
    colors: {
      default?: string
      light?: string
      dark?: string
    }
    token: string
  }[]
  title: string
}

const semanticColors = (() => {
  const colors: SemanticColor[] = []

  function handleColorReference(str: string) {
    return str?.replace('{', '').replace('}', '').replace('colors.', '')
  }

  forEach(defaultConfig.semanticTokens?.colors, (items, color: string) => {
    const tokens: SemanticColor['tokens'] = []
    const title = color

    walkObject(
      items,
      (value, path) => {
        tokens.push({
          token: `${color}.${path.join('.')}`,
          colors: {
            default: handleColorReference(value._DEFAULT),
            light: handleColorReference(value._light),
            dark: handleColorReference(value._dark),
          },
        })
      },
      {
        predicate: (_, path) => {
          const last = [...path].pop()
          return last!.includes('_')
        },
      },
    )

    colors.push({
      title,
      tokens,
    })
  })

  return colors
})()

export function SemanticColors() {
  const { copy } = useClipboard()

  return map(semanticColors, ({ title, tokens }) => (
    <div className='x:overflow-hidden' key={title}>
      <h3 className='x:mt-8 x:mb-4 x:font-bold x:text-2xl x:capitalize'>
        {title}
      </h3>
      <div className='x:flex x:gap-8 x:flex-wrap'>
        {map(tokens, ({ colors, token }) => (
          <div key={token}>
            <Button key={token} onClick={() => copy(token)}>
              {map(colors, (color, key) => {
                if (!color) {
                  return
                }

                const realColor =
                  get(defaultConfig.tokens?.colors, color.split('.')) ?? color

                return (
                  <div
                    className='x:flex-[1] x:w-[100%] x:flex x:flex-col x:justify-center x:items-center'
                    key={key}
                    style={{
                      background: realColor,
                      color: readableColor(realColor),
                    }}
                  >
                    <p className='x:uppercase x:text-sm'>{key}</p>
                    <p className='x:text-sm'>{color}</p>
                  </div>
                )
              })}
            </Button>
            <p title={token} className='x:text-center x:w-34 x:truncate'>
              {token}
            </p>
          </div>
        ))}
      </div>
    </div>
  ))
}
