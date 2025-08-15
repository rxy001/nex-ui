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
import { Box, Button as NexBtn, useColorScheme } from '@nex-ui/react'
import albumCover from '@/public/images/album-cover.png'
import type { ButtonProps, CSSObject } from '@nex-ui/react'

function Button({ children, ...props }: ButtonProps) {
  return (
    <NexBtn
      variant='text'
      iconOnly
      radius='full'
      {...props}
      sx={[
        {
          color: {
            _DEFAULT: 'black',
            _dark: 'white',
          },
          bg: {
            _hover: '#ecedee1a',
          },
        },
        props.sx as CSSObject,
      ]}
    >
      {children}
    </NexBtn>
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
      <Button
        sx={{
          position: 'absolute',
          right: '4',
          top: '2',
          color: 'rgb(251 251 251 / 80%)',
        }}
        aria-label='Toggle color mode'
      >
        {resolvedColorScheme === 'light' ? (
          <MoonOutlined onClick={() => setMode('dark')} />
        ) : (
          <SunOutlined onClick={() => setMode('light')} />
        )}
      </Button>
      <Box
        sx={{
          display: 'flex',
          gap: '3',
          backdropFilter: 'blur(12px)',
          alignItems: 'center',
          background: {
            _DEFAULT: 'rgb(255 255 255 / 60%)',
            _dark: 'rgb(39 39 42 / 50%)',
          },
          borderRadius: 'xl',
          p: '2',
          flex: 1,
          maxWidth: {
            _DEFAULT: '250px',
            _sm: 'none',
          },
          flexDirection: {
            _DEFAULT: 'column',
            _sm: 'row',
          },
        }}
      >
        <Box
          sx={{
            borderRadius: 'xl',
            height: 160,
          }}
        >
          <Box
            sx={{
              borderRadius: 'xl',
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Box>
              <Box sx={{ fontWeight: 'semibold', fontSize: 'md' }}>
                Daily Mix
              </Box>
              <Box sx={{ fontWeight: 'medium', fontSize: 'sm' }}>12 Tracks</Box>
              <Box sx={{ fontWeight: 'semibold', mt: '2', fs: 'xl' }}>
                Frontend Radio
              </Box>
            </Box>
            <Button aria-label='Heart'>
              <HeartOutlined />
            </Button>
          </Box>
          <Box
            sx={{ mt: '3', display: 'flex', flexDirection: 'column', gap: '1' }}
          >
            <Box
              sx={{
                borderRadius: 'full',
                background: 'rgb(113 113 122 / 30%)',
                height: '1',
                position: 'relative',
                '::before': {
                  position: 'absolute',
                  content: '" "',
                  width: '30%',
                  background: 'black',
                  top: 0,
                  left: 0,
                  height: '100%',
                  borderRadius: 'full',
                },
                '::after': {
                  position: 'absolute',
                  content: '" "',
                  width: '2',
                  background: 'black',
                  top: '50%',
                  left: '30%',
                  height: '2',
                  borderRadius: 'full',
                  transform: 'translate(-50%, -50%)',
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                fs: 'md',
                fontWeight: 'medium',
                userSelect: 'none',
                color: {
                  _dark: 'gray.300',
                  _DEFAULT: 'gray.500',
                },
              }}
            >
              <Box>1:34</Box>
              <Box>4:45</Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1',
              mt: '2',
            }}
          >
            <Button aria-label='Repeat'>
              <RepeatOutlined />
            </Button>
            <Button aria-label='Skip Backward'>
              <SkipBackwardFilled />
            </Button>
            <Button
              size='lg'
              sx={{
                '& svg': {
                  fs: '2.3em',
                },
              }}
              aria-label='Pause'
            >
              <PauseCircleFilled />
            </Button>
            <Button aria-label='Skip Forward'>
              <SkipForwardFilled />
            </Button>
            <Button aria-label='Share'>
              <ShareOutlined />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
