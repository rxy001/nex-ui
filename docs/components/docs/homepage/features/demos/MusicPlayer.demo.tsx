'use client'

import {
  HeartOutlined,
  SkipBackwardFilled,
  SkipForwardFilled,
  PauseCircleFilled,
  ShareOutlined,
  RepeatOutlined,
  MoonOutlined,
  SunOutlined,
} from '@nex-ui/icons'
import Image from 'next/image'
import {
  Box,
  Button,
  useColorScheme,
  Card,
  CardBody,
  Flex,
} from '@nex-ui/react'
import albumCover from '@/public/images/album-cover.png'
import type { ButtonProps } from '@nex-ui/react'

function IconButton({ sx, ...props }: ButtonProps) {
  return (
    <Button
      variant='ghost'
      iconOnly
      radius='full'
      color='gray'
      sx={[
        {
          color: 'inherit',
        },
        sx,
      ]}
      {...props}
    />
  )
}
export default function MusicPlayer() {
  const { setMode, resolvedColorScheme } = useColorScheme()

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)',
        py: '12',
        px: '8',
        borderRadius: 'xl',
        w: {
          _lg: '50%',
          _DEFAULT: '100%',
        },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          right: '4',
          top: '2',
          color: 'rgb(251 251 251 / 80%)',
        }}
        aria-label='Toggle color mode'
        onClick={() => {
          setMode(resolvedColorScheme === 'light' ? 'dark' : 'light')
        }}
      >
        {resolvedColorScheme === 'light' ? <SunOutlined /> : <MoonOutlined />}
      </IconButton>
      <Card
        sx={{
          flex: 1,
          bg: {
            _DEFAULT: 'white/25',
            _dark: 'black/40',
          },
          maxW: {
            _DEFAULT: '250px',
            _sm: 'none',
          },
        }}
        blurred
      >
        <CardBody
          sx={{
            display: 'flex',
            gap: '3',
            maxWidth: 'full',
            alignItems: 'center',
            flexDirection: {
              _DEFAULT: 'column',
              _sm: 'row',
            },
          }}
        >
          <Box
            sx={{
              borderRadius: 'lg',
              height: 160,
            }}
          >
            <Box
              sx={{
                borderRadius: 'lg',
                height: '100%',
              }}
              width={160}
              height={160}
              as={Image}
              alt='Album cover'
              src={albumCover}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Flex justify='space-between' align='flex-start'>
              <Box>
                <Box sx={{ fontWeight: 'semibold', fs: 'md' }}>Daily Mix</Box>
                <Box sx={{ fontWeight: 'medium', fs: 'sm' }}>12 Tracks</Box>
                <Box sx={{ fontWeight: 'semibold', mt: '2', fs: 'xl' }}>
                  Frontend Radio
                </Box>
              </Box>
              <IconButton aria-label='Heart'>
                <HeartOutlined />
              </IconButton>
            </Flex>
            <Flex
              direction='column'
              sx={{
                mt: '3',
                gap: '1',
              }}
            >
              <Box
                sx={{
                  borderRadius: 'full',
                  bg: 'rgb(113 113 122 / 30%)',
                  height: '1',
                  position: 'relative',
                  '::before': {
                    position: 'absolute',
                    content: '" "',
                    w: '30%',
                    bg: 'black',
                    top: 0,
                    left: 0,
                    height: '100%',
                    borderRadius: 'full',
                  },
                  '::after': {
                    position: 'absolute',
                    content: '" "',
                    w: '2',
                    bg: 'black',
                    top: '50%',
                    left: '30%',
                    height: '2',
                    borderRadius: 'full',
                    transform: 'translate(-50%, -50%)',
                  },
                }}
              />
              <Flex
                justify='space-between'
                sx={{
                  fs: 'md',
                  fontWeight: 'medium',
                  userSelect: 'none',
                }}
              >
                <Box>1:34</Box>
                <Box>4:45</Box>
              </Flex>
            </Flex>
            <Flex
              align='center'
              justify='center'
              sx={{
                gap: '1',
                mt: '2',
              }}
            >
              <IconButton aria-label='Repeat'>
                <RepeatOutlined />
              </IconButton>
              <IconButton aria-label='Skip Backward'>
                <SkipBackwardFilled />
              </IconButton>
              <IconButton
                size='lg'
                sx={{
                  '& svg': {
                    fs: '2.3em',
                  },
                }}
                aria-label='Pause'
              >
                <PauseCircleFilled />
              </IconButton>
              <IconButton aria-label='Skip Forward'>
                <SkipForwardFilled />
              </IconButton>
              <IconButton aria-label='Share'>
                <ShareOutlined />
              </IconButton>
            </Flex>
          </Box>
        </CardBody>
      </Card>
    </Box>
  )
}
