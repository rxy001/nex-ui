import {
  createContext as createReactContenxt,
  useContext as useReactContext,
} from 'react'

type CreateContextOptions<T> = {
  contextName?: string
  hookName?: string
  providerName?: string
  defaultValue?: T
  strict?: boolean
}

export type CreateContextReturn<T> = [
  React.Provider<T>,
  () => T,
  React.Context<T>,
]

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`
}

export function createContext<T>(options: CreateContextOptions<T>) {
  const {
    defaultValue,
    contextName,
    hookName = 'useContext',
    providerName = 'Provider',
    strict = true,
  } = options
  const Context = createReactContenxt<T | undefined>(defaultValue)

  Context.displayName = contextName

  function useContext() {
    const context = useReactContext(Context)

    if (!context && strict) {
      const error = new Error(getErrorMessage(hookName, providerName))
      error.name = 'ContextError'
      if (Error.captureStackTrace) {
        Error.captureStackTrace(error, useContext)
      }

      throw error
    }

    return context
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<T>
}
