import TestImg from '@/shared/assets/tests/thai_blant.jpg'

import { Skeleton } from '../Skeleton'
import { Text } from '../Text'

import { AppImage } from './AppImage'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AppImage> = {
  title: 'Shared/AppImage',
  component: AppImage,
  args: {
    src: TestImg,
    height: 500
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof AppImage>

export const Primary: Story = {}

export const WithFallbackAndAlt: Story = {
  args: {
    src: undefined,
    fallback: <Skeleton width={375} height={500} />,
    alt: 'test image'
  }
}

export const WithErrorFallback: Story = {
  args: {
    src: undefined,
    fallback: <Skeleton width={375} height={500} />,
    errorFallback: (
      <Text title="Ты видишь этот текст, тк ссылка на изображение недействительна ;)" />
    )
  }
}
