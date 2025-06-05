import { Button } from '@nex-ui/react'
import { GithubOutlined } from '@nex-ui/icons'
import StorybookIcon from '@/icons/storybook.svg'
import W3cIcon from '@/icons/w3c.svg'
import NextIcon from '@/icons/nextjs.svg'
import type { ButtonProps } from '@nex-ui/react'

type ComponentLinksProps = {
  rscCompatible?: boolean
  ariaCompatible?: boolean
  component: string
}
const sx = {
  transition: 'opacity',
  bg: {
    _DEFAULT: '#f4f4f5',
    _dark: '#18181b',
  },
  color: {
    _DEFAULT: 'gray.800',
    _dark: '#fff',
  },
  '& svg': {
    fontSize: 20,
  },
  _hover: {
    bg: {
      _DEFAULT: '#f0f0f0',
      _dark: '#18181b',
    },
    opacity: '.8',
  },
}

const COMPONENT_PATH =
  'https://github.com/rxy001/nex-ui/tree/main/packages/react/src/components/'

const RECIPE_PATH =
  'https://github.com/rxy001/nex-ui/blob/main/packages/react/src/theme/recipes/'

const STORYBOOK_PATH =
  'https://nex-ui-storybook.vercel.app/?path=/story/components-'

const WAI_ARIA_PATH = 'https://www.w3.org/WAI/ARIA/apg/patterns/'

const ButtonLink = (props: ButtonProps) => {
  return (
    <Button
      size='sm'
      color='gray'
      sx={sx}
      variant='text'
      target='_blank'
      {...props}
    />
  )
}

export const ComponentLinks = ({
  component,
  rscCompatible = false,
  ariaCompatible = false,
}: ComponentLinksProps) => {
  return (
    <div className='x:mt-6 x:flex x:flex-row x:gap-4 x:flex-wrap x:md:gap-7'>
      <ButtonLink
        startIcon={<StorybookIcon color='#ff4785' />}
        href={`${STORYBOOK_PATH}${component}`}
      >
        Storybook
      </ButtonLink>
      {ariaCompatible && (
        <ButtonLink
          startIcon={<W3cIcon />}
          href={`${WAI_ARIA_PATH}${component}`}
        >
          WAI-ARIA
        </ButtonLink>
      )}
      {rscCompatible && (
        <ButtonLink startIcon={<NextIcon />}>Server Component</ButtonLink>
      )}
      <ButtonLink
        startIcon={<GithubOutlined />}
        href={`${COMPONENT_PATH}${component}`}
      >
        Source
      </ButtonLink>
      <ButtonLink
        startIcon={<GithubOutlined />}
        href={`${RECIPE_PATH}${component}.ts`}
      >
        Recipe Source
      </ButtonLink>
    </div>
  )
}
