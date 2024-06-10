import type { Meta, StoryObj } from '@storybook/react'
import { ArticleList } from './ArticleList'
import {
  Article,
  ArticleBlockType,
  ArticleType,
  ArticleView
} from '../../model/types/article'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import i18n from 'shared/config/i18n/i18n'

const meta: Meta<typeof ArticleList> = {
  title: 'Entities/Article/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticleList>

const article: Article = {
  _id: '1',
  user: {
    _id: '1',
    username: 'Markel',
    avatar:
      'https://proprikol.ru/wp-content/uploads/2019/08/krutye-kartinki-dlya-vk-43.jpg'
  },
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '2024-06-06T17:35:45.931Z',
  type: [ArticleType.IT],
  blocks: [
    {
      _id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:'
      ]
    }
  ]
}

const articles = [...new Array(7)].map((_, idx) => {
  return { ...article, _id: String(idx) }
})

const t = i18n.t

export const PrimarySmall: Story = {
  args: {
    articles,
    view: ArticleView.SMALL
  }
}

export const PrimaryBig: Story = {
  args: {
    articles,
    view: ArticleView.BIG,
    t
  }
}

export const PrimarySkeletonSmall: Story = {
  args: {
    articles: [],
    view: ArticleView.SMALL,
    isLoading: true
  }
}

export const PrimarySkeletonBig: Story = {
  args: {
    articles: [],
    view: ArticleView.BIG,
    isLoading: true,
    t
  }
}

//===============================================================================================

export const DarkSmall: Story = {
  args: {
    articles,
    view: ArticleView.SMALL
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const DarkBig: Story = {
  args: {
    articles,
    view: ArticleView.BIG,
    t
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const DarkSkeletonSmall: Story = {
  args: {
    articles: [],
    view: ArticleView.SMALL,
    isLoading: true
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const DarkSkeletonBig: Story = {
  args: {
    articles: [],
    view: ArticleView.BIG,
    isLoading: true,
    t
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

//===============================================================================================

export const GreenSmall: Story = {
  args: {
    articles,
    view: ArticleView.SMALL
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}

export const GreenBig: Story = {
  args: {
    articles,
    view: ArticleView.BIG,
    t
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}

export const GreenSkeletonSmall: Story = {
  args: {
    articles: [],
    view: ArticleView.SMALL,
    isLoading: true
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}

export const GreenSkeletonBig: Story = {
  args: {
    articles: [],
    view: ArticleView.BIG,
    isLoading: true,
    t
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}
