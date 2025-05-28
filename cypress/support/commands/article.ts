import { Article } from '../../../src/entities/Article'

const defaultArticle = {
  title: 'Test Article',
  subtitle: '14.04.2025 20:17',
  img: 'https://avatars.mds.yandex.net/i?id=6b6b877091eedb6cd084b914b35ca654_l-3719127-images-thumbs&n=13',
  views: 100,
  user: {
    _id: '67eecd8cceb0558a80db9a90',
    username: 'testUser',
    roles: ['ADMIN']
  },
  type: ['SPORT'],
  blocks: [
    {
      type: 'TEXT',
      title: 'Заголовок',
      paragraphs: [
        'Worlds Sports News is wworldssportsnews,news,magazines,worlds,sports, content rating is Everyone (PEGI-3). This app is rated 1 by 1 users who are using this app. To know more about the company/developer, visit Akhilesh Patel website who developed it. com.wWorldsSportsNews.apk apps can be downloaded and installed on Android 4.1.x and higher Android devices. The Latest Version of 0.1 Available for download. Download the app using your favorite browser and click Install to install the application. Please note that we provide both basic and pure APK files and faster download speeds than APK Mirror. This app APK has been downloaded 535+ times on store. You can also download com.wWorldsSportsNews APK and run it with the popular Android Emulators.'
      ],
      _id: '6613fc985e2de0cdbf84974a'
    },
    {
      type: 'CODE',
      code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
      _id: '6613fc985e2de0cdbf84974b'
    },
    {
      type: 'IMAGE',
      src: 'https://i.pinimg.com/originals/e7/b6/14/e7b6146be8becb7558b0f671897e29ba.jpg',
      title: 'Рисунок 1 - Gangsta',
      _id: '6613fc985e2de0cdbf84974c'
    }
  ]
}

export const createArticle = (article?: string) =>
  cy
    .request({
      method: 'POST',
      url: 'http://localhost:4000/articles/create',
      body: article ?? defaultArticle,
      headers: {
        Authorization: '123'
      }
    })
    .then((resp) => resp.body)

export const removeArticle = (articleId: string) =>
  cy.request({
    method: 'DELETE',
    url: `http://localhost:4000/articles/${articleId}/delete`,
    headers: {
      Authorization: '123'
    }
  })

// export const setArticleFilters = (newSort?: ArticleSortField, newOrder?: SortOrder) => {

// }

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: string): Chainable<Article>
      removeArticle(articleId: string): Chainable<void>
    }
  }
}
