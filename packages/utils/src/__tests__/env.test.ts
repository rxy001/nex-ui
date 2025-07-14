/* eslint-disable @typescript-eslint/no-require-imports */
describe('env', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('should be __DEV__ when NODE_ENV is not production', () => {
    process.env.NODE_ENV = 'development'
    const { __DEV__, __TEST__ } = require('../env')
    expect(__DEV__).toBe(true)
    expect(__TEST__).toBe(false)
  })

  it('should not be __DEV__ when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production'
    const { __DEV__, __TEST__ } = require('../env')
    expect(__DEV__).toBe(false)
    expect(__TEST__).toBe(false)
  })

  it('should be __TEST__ when NODE_ENV is test', () => {
    process.env.NODE_ENV = 'test'
    const { __DEV__, __TEST__ } = require('../env')
    expect(__DEV__).toBe(true)
    expect(__TEST__).toBe(true)
  })
})
