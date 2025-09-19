declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveDataAttribute(attr: string, value?: string): R
    }
  }
}

export {}
