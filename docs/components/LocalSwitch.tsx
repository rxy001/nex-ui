import { addBasePath } from 'next/dist/client/add-base-path'
import { useRouter } from 'nextra/hooks'
import { GlobeIcon } from 'nextra/icons'
import type { ReactElement } from 'react'
import { Select } from './Select'

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

interface LocaleSwitchProps {
  options: { name: string; locale: string }[]
  className?: string
}

export function LocaleSwitch({
  options,
  className,
}: LocaleSwitchProps): ReactElement | null {
  const { locale, asPath } = useRouter()

  if (!options.length) return null

  const selected = options.find((l) => locale === l.locale)

  return (
    <Select
      className={className}
      title="Change language"
      onChange={(option) => {
        const date = new Date(Date.now() + ONE_YEAR)
        document.cookie = `NEXT_LOCALE=${
          option.key
        }; expires=${date.toUTCString()}; path=/`
        const href = addBasePath(asPath.replace(`/${locale}`, `/${option.key}`))
        window.location.href = href
      }}
      selected={{
        key: selected?.locale || '',
        name: (
          <span className="_flex _items-center _gap-2">
            <GlobeIcon />
            <span>{selected?.name}</span>
          </span>
        ),
      }}
      options={options.map((l) => ({
        key: l.locale,
        name: l.name,
      }))}
    />
  )
}
