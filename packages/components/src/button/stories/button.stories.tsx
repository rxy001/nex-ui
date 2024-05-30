import type { Meta, StoryObj } from '@storybook/react'
import { AntUIProvider } from '../../provider'
import { type AntUIProviderStore } from '../../provider/stories/provider.stories'
import { Button } from '../index'
import { Icon } from '../../icon'

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'outline', 'text', 'link'],
      control: {
        type: 'select',
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: {
        type: 'select',
      },
    },
    shape: {
      options: ['default', 'round'],
      control: {
        type: 'select',
      },
    },
    href: {
      type: 'string',
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const commonArgs: Story['args'] = {
  children: 'Button',
  disabled: false,
  block: false,
  size: 'medium',
  variant: 'primary',
  shape: 'default',
}

export const Basic: Story = {
  args: commonArgs,
}

export const Disabled: Story = {
  args: {
    ...commonArgs,
    disabled: true,
  },
}

export const Block: Story = {
  args: {
    ...commonArgs,
    block: true,
  },
}

export const LoadingButton: Story = {
  args: {
    ...commonArgs,
    loading: true,
    onClick: () => {},
  },
}

export const IconButton: Story = {
  args: {
    ...commonArgs,
    iconOnly: true,
    children: (
      <Icon icon="material-symbols:send-outline" style={{ fontSize: 20 }} />
    ),
  },
}

export const WithIcons: Story = {
  args: {
    ...commonArgs,
    children: 'Button',
    startIcon: <Icon icon="eos-icons:loading" color="#fff" />,
    endIcon: <Icon icon="material-symbols:send-outline" />,
  },
}

export const ComponentToken: AntUIProviderStore = {
  args: {
    theme: {
      button: {
        colorPrimary: 'red',
        paddingXLG: '30px',
        controlHeightLG: '50px',
      },
    },
  },
  render: (props) => {
    const { theme } = props
    return (
      <AntUIProvider theme={theme}>
        <Button {...Basic.args} />
        <Button {...Disabled.args} />
      </AntUIProvider>
    )
  },
}
