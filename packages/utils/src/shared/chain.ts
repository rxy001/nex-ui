export const chain = <TArgs extends unknown[]>(
  ...callbacks: Array<((...args: TArgs) => void) | null | undefined | false>
) => {
  return (...args: TArgs) => {
    for (const cb of callbacks) {
      if (cb) cb(...args)
    }
  }
}
