import { QueryStatus } from '@reduxjs/toolkit/dist/query'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'

import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { Article , ArticleBlockType, ArticleType } from '@/entities/Article'

import { ArticleCommentsSchema } from '@/features/articleComments'
import avatar from '@/shared/assets/tests/avatar.jpg'

import ArticleDetailsPage from './ArticleDetailsPage'

import type { Meta, StoryObj } from '@storybook/react'


const meta: Meta<typeof ArticleDetailsPage> = {
  title: 'Pages/ArticleDetailsPage',
  component: ArticleDetailsPage,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticleDetailsPage>

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
    },
    {
      _id: '4',
      type: ArticleBlockType.CODE,
      code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;'
    },
    {
      _id: '5',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:'
      ]
    },
    {
      _id: '2',
      type: ArticleBlockType.IMAGE,
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта'
    },
    {
      _id: '3',
      type: ArticleBlockType.CODE,
      // eslint-disable-next-line quotes
      code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);"
    },
    {
      _id: '7',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:'
      ]
    },
    {
      _id: '8',
      type: ArticleBlockType.IMAGE,
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта'
    },
    {
      _id: '9',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.'
      ]
    }
  ]
}

const articles = [...new Array(4)].map((_, idx) => {
  return { ...article, _id: String(idx) }
})

const articleDetailsComments: ArticleCommentsSchema = {
  ids: ['1', '2'],
  entities: {
    '1': {
      _id: '1',
      text: 'Комментарий 1',
      user: {
        _id: '1',
        username: 'User',
        avatar
      },
      createdAt: '07.06.2024, 15:23',
      updatedAt: '07.06.2024, 15:23'
    },
    '2': {
      _id: '2',
      text: 'Комментарий 2',
      user: {
        _id: '2',
        username: 'User 2'
      },
      createdAt: '07.06.2024, 15:23',
      updatedAt: 'test'
    }
  }
}

export const Light: Story = {
  decorators: [
    StoreDecorator({
      articleComments: articleDetailsComments,
      articleDetails: { data: article },
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            data: articles
          }
        }
      }
    })
  ]
}

export const Dark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      articleComments: articleDetailsComments,
      articleDetails: { data: article },
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            data: articles
          }
        }
      }
    })
  ]
}

export const Green: Story = {
  decorators: [
    ThemeDecorator(Theme.GREEN),
    StoreDecorator({
      articleComments: articleDetailsComments,
      articleDetails: { data: article },
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            data: articles
          }
        }
      }
    })
  ]
}

export const Loading: Story = {
  decorators: [
    StoreDecorator({
      articleComments: { ids: [], entities: {}, isLoading: true },
      articleDetails: { isLoading: true },
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            status: QueryStatus.pending
          }
        }
      }
    })
  ]
}
export const LoadingDark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      articleComments: { ids: [], entities: {}, isLoading: true },
      articleDetails: { isLoading: true },
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            status: QueryStatus.pending
          }
        }
      }
    })
  ]
}
export const LoadingGreen: Story = {
  decorators: [
    ThemeDecorator(Theme.GREEN),
    StoreDecorator({
      articleComments: { ids: [], entities: {}, isLoading: true },
      articleDetails: { isLoading: true },
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            status: QueryStatus.pending
          }
        }
      }
    })
  ]
}

export const Error: Story = {
  decorators: [
    StoreDecorator({
      articleComments: { ids: [], entities: {}, error: 'error' },
      articleDetails: { error: 'error' },
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            status: QueryStatus.rejected
          }
        }
      }
    })
  ]
}
