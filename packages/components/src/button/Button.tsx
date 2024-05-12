import { button, ButtonVariants } from '@ant-ui/theme'

export function Button(props: ButtonVariants = {}) {
  const { type, size } = props

  return (
    <button type="button" className={`${button({ type, size })}`}>
      button
    </button>
  )
}
