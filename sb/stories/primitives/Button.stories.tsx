import { Button } from '@nex-ui/primitives'
import styles from './Button.module.css'
import type { Meta } from '@storybook/react-vite'

const meta = {
  title: 'Primitives/Button',
} satisfies Meta

export default meta

export function Default() {
  const onClick = () => {
    alert('Button clicked!')
  }

  return (
    <div className={styles.container}>
      <Button className={styles.button} onClick={onClick}>
        Button Element
      </Button>
      <Button className={styles.button} onClick={onClick} disabled>
        Disabled Button Element
      </Button>
      <Button className={styles.button} render={<div />} onClick={onClick}>
        Div Element
      </Button>
      <Button
        className={styles.button}
        onClick={onClick}
        render={<div />}
        disabled
      >
        Disabled Div Element
      </Button>
      <Button
        className={styles.button}
        onClick={onClick}
        // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
        render={<a href='#' onClick={(event) => event.preventDefault()} />}
      >
        A Element
      </Button>
      <Button
        className={styles.button}
        onClick={onClick}
        // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
        render={<a href='#' onClick={(event) => event.preventDefault()} />}
        disabled
      >
        Disabled A Element
      </Button>
    </div>
  )
}
