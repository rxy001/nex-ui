import type { Meta, StoryObj } from '@storybook/react'
import { NexUIProvider } from '../../provider'
import { type NexUIProviderStore } from '../../provider/stories/provider.stories'
import { Button } from '../index'
import { Icon } from '../../icon'

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['solid', 'outline', 'text', 'link'],
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
    iconOnly: {
      type: 'boolean',
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
  variant: 'solid',
  shape: 'default',
}

export const Basic: Story = {
  args: {
    ...commonArgs,
  },
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

export const ComponentToken: NexUIProviderStore = {
  args: {
    theme: {
      button: {
        colorPrimary: 'red',
        paddingXLg: '30px',
        controlHeightLg: '50px',
      },
    },
    ...commonArgs,
  },
  render: (props) => {
    const { theme, ...rest } = props
    return (
      <NexUIProvider theme={theme}>
        <Button {...rest} />
      </NexUIProvider>
    )
  },
}
