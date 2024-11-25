import type { Meta, StoryObj } from '@storybook/react'
import ArticlesPage from './ArticlesPage'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'
import {
  Article,
  ArticleBlockType,
  ArticleSortField,
  ArticleType,
  ArticleView
} from 'entities/Article'
import avatar from 'shared/assets/tests/avatar.jpg'
import { ArticlesPageSchema } from '../../model/types/articlesPageSchema'

const meta: Meta<typeof ArticlesPage> = {
  title: 'Pages/ArticlesPage',
  component: ArticlesPage,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticlesPage>

const article: Article = {
  _id: '1',
  user: {
    _id: '1',
    username: 'Markel',
    avatar
  },
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '06.06.2024, 22:07',
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

const articles = {
  '1': article,
  '2': { ...article, _id: '2' },
  '3': { ...article, _id: '3' },
  '4': { ...article, _id: '4' },
  '5': { ...article, _id: '5' },
  '6': { ...article, _id: '6' },
  '7': { ...article, _id: '7' },
  '8': { ...article, _id: '8' },
  '9': { ...article, _id: '9' },
  '10': { ...article, _id: '10' }
}

const articlesPageState: ArticlesPageSchema = {
  isLoading: false,
  error: undefined,
  view: ArticleView.SMALL,
  page: 1,
  hasMore: false,
  limit: 10,
  order: 'asc',
  sort: ArticleSortField.CREATED,
  search: '',
  type: ArticleType.ALL,
  ids: Object.keys(articles), // ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  entities: articles,
  _inited: true
}

const articlesPageIsLoadingState = {
  ...articlesPageState,
  isLoading: true,
  ids: [],
  entities: {}
}

const articlesPageErrorState = {
  ...articlesPageState,
  error: 'error',
  ids: [],
  entities: {}
}

export const Light: Story = {
  decorators: [StoreDecorator({ articles: articlesPageState })]
}

export const Dark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ articles: articlesPageState })
  ]
}

export const Green: Story = {
  decorators: [
    ThemeDecorator(Theme.GREEN),
    StoreDecorator({ articles: articlesPageState })
  ]
}

export const Loading: Story = {
  decorators: [StoreDecorator({ articles: articlesPageIsLoadingState })]
}
export const LoadingDark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ articles: articlesPageIsLoadingState })
  ]
}
export const LoadingGreen: Story = {
  decorators: [
    ThemeDecorator(Theme.GREEN),
    StoreDecorator({ articles: articlesPageIsLoadingState })
  ]
}

export const Error: Story = {
  decorators: [StoreDecorator({ articles: articlesPageErrorState })]
}
