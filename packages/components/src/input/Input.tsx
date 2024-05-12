import { input, InputVariants } from '@ant-ui/theme'

export function Input(props: InputVariants = {}) {
  return <input type="input" className={input(props)} />
}
