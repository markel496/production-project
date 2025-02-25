## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью библиотек `"msw"` и `"msw-storybook-addon"`.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.ts(tsx)

Запустить сторибук можно командой:

- `npm run storybook`

Пример:

```typescript jsx
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { Rating } from './Rating'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Rating> = {
  title: 'Entities/Rating',
  component: Rating,
  args: {
    title: 'Как вам статья?'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Rating>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}

export const WithoutTitle: Story = {
  args: {
    title: undefined
  }
}

export const WithFeedback: Story = {
  args: {
    hasFeedback: true,
    feedbackTitle: 'Оставьте отзыв',
    placeholder: 'Напишите что-нибудь...'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const AlreadyRated: Story = {
  args: {
    title: 'Спасибо за оценку!',
    rating: 4
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}
```

Подробнее о [Storybook](https://storybook.js.org/)
