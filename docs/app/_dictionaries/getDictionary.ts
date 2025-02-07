import type { Dictionaries, Dictionary, Locale } from './i18nConfig'

const dictionaries: Dictionaries = {
  en: () => import('./en'),
  zh: () => import('./zh'),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const { default: dictionary } = await (
    dictionaries[locale] || dictionaries.en
  )()

  return dictionary
}
