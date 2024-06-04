import { forEach } from '@nex-ui/utils'

export function mapValues<Input extends Record<string, any>, OutputValue>(
  input: Input,
  fn: (value: Input[keyof Input], key: keyof Input) => OutputValue,
): Record<keyof Input, OutputValue> {
  const result: any = {}

  forEach(input, (value, key) => {
    result[key] = fn(value, key)
  })

  return result
}
