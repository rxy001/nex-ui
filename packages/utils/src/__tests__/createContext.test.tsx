import { render } from '@testing-library/react'
import { createContext } from '../craeteContext'

describe('createContext', () => {
  const defaultValue = 'Test Value'

  it('should return Provider, useContext function and Context object', () => {
    const contextName = 'TestContext'
    const [Provider, useTestContext, Context] = createContext({
      contextName,
      defaultValue,
      hookName: 'useTestContext',
      providerName: 'TestProvider',
    })
    expect(Provider).toBeInstanceOf(Object)
    expect(useTestContext).toBeInstanceOf(Function)
    expect(Context.Provider).toBe(Provider)
    expect(Context.displayName).toBe(contextName)
  })

  it('should use the default value when no provider is present (strict: false)', () => {
    const [_, useTestContext] = createContext<string>({
      defaultValue,
      strict: false,
    })

    function TestComponent() {
      const value = useTestContext()
      return <div>{value}</div>
    }

    const { getByText } = render(<TestComponent />)
    expect(getByText(defaultValue)).toBeInTheDocument()
  })

  it('should throw an error if strict mode is enabled and no provider is present', () => {
    const [_, useTestContext] = createContext<string>({
      hookName: 'useTestContext',
      providerName: 'TestProvider',
      strict: true,
    })

    function TestComponent() {
      const value = useTestContext()
      return <div>{value}</div>
    }

    expect(() => render(<TestComponent />)).toThrowError(
      'useTestContext returned `undefined`. Seems you forgot to wrap component within TestProvider',
    )
  })

  it('should provide context value correctly when wrapped by provider', () => {
    const [Provider, useTestContext] = createContext<string>({
      defaultValue,
      strict: true,
    })

    function TestComponent() {
      const value = useTestContext()
      return <div>{value}</div>
    }

    const { getByText } = render(
      <Provider value='provided value'>
        <TestComponent />
      </Provider>,
    )

    expect(getByText('provided value')).toBeInTheDocument()
  })
})
