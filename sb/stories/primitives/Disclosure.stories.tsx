import { Disclosure } from '@nex-ui/primitives'
import styles from './Disclosure.module.css'
import type { Meta, StoryObj } from '@storybook/react-vite'

function DisclosureTemplate({ keepMounted }: { keepMounted: boolean }) {
  return (
    <Disclosure.Root className={styles.Collapsible}>
      <Disclosure.Trigger className={styles.Trigger}>
        Recovery keys
      </Disclosure.Trigger>
      <Disclosure.Panel keepMounted={keepMounted} className={styles.Panel}>
        <div className={styles.Content}>
          <div>alien-bean-pasta</div>
          <div>wild-irish-burrito</div>
          <div>horse-battery-staple</div>
        </div>
      </Disclosure.Panel>
    </Disclosure.Root>
  )
}

const meta = {
  title: 'Primitives/Disclosure',
  component: DisclosureTemplate,
  argTypes: {
    keepMounted: {
      control: 'boolean',
    },
  },
  args: {
    keepMounted: false,
  },
} satisfies Meta<typeof DisclosureTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
