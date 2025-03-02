import { Button } from '@nex-ui/react'
import type { ButtonProps } from '@nex-ui/react'
import { GithubFilled } from '@nex-ui/icons'
import StorybookIcon from '@/icons/storybook.svg'
import NextIcon from '@/icons/nextjs.svg'

type ComponentLinksProps = {
  rscCompatible?: boolean
  slotRecipe?: boolean
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

const SLOT_RECIPE_PATH =
  'https://github.com/rxy001/nex-ui/blob/main/packages/react/src/theme/slotRecipes/'

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
  slotRecipe = false,
}: ComponentLinksProps) => {
  return (
    <div className='x:mt-6 x:flex x:flex-row x:gap-4 x:flex-wrap x:md:gap-7'>
      <ButtonLink startIcon={<StorybookIcon color='#ff4785' />}>
        Storybook
      </ButtonLink>
      {rscCompatible && (
        <ButtonLink startIcon={<NextIcon />}>Server Component</ButtonLink>
      )}
      <ButtonLink
        startIcon={<GithubFilled />}
        href={`${COMPONENT_PATH}${component}`}
      >
        Source
      </ButtonLink>
      {slotRecipe ? (
        <ButtonLink
          startIcon={<GithubFilled />}
          href={`${SLOT_RECIPE_PATH}${component}.ts`}
        >
          Slot Recipe Source
        </ButtonLink>
      ) : (
        <ButtonLink
          startIcon={<GithubFilled />}
          href={`${RECIPE_PATH}${component}.ts`}
        >
          Recipe Source
        </ButtonLink>
      )}
    </div>
  )
}
