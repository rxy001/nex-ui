export function mapValues<Input extends Record<string, any>, OutputValue>(
  input: Input,
  fn: (value: Input[keyof Input], key: keyof Input) => OutputValue,
): Record<keyof Input, OutputValue> {
  const result: any = {}

  // eslint-disable-next-line guard-for-in
  for (const key in input) {
    result[key] = fn(input[key], key)
  }

  return result
}
