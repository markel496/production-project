const fs = require('fs/promises')
const resolveRoot = require('../resolveRoot')
const componentTemplate = require('./componentTemplate')
const storyTemplate = require('./storyTemplate')
const styleTemplate = require('./styleTemplate')

module.exports = async (layer, sliceName) => {
  const resolveUIPath = (...segments) =>
    resolveRoot('src', layer, sliceName, 'ui', ...segments)

  const createUIDir = async () => {
    try {
      await fs.mkdir(resolveUIPath())
    } catch (e) {
      console.log('Не удалось создать UI директорию')
    }
  }

  const createComponent = async () => {
    try {
      await fs.mkdir(resolveUIPath(sliceName))
      await fs.writeFile(
        resolveUIPath(sliceName, `${sliceName}.tsx`),
        componentTemplate(sliceName)
      )
      await fs.writeFile(
        resolveUIPath(sliceName, `${sliceName}.stories.tsx`),
        storyTemplate(layer, sliceName)
      )
      await fs.writeFile(
        resolveUIPath(sliceName, `${sliceName}.module.scss`),
        styleTemplate(sliceName)
      )
    } catch (e) {
      console.log('Не удалось создать компонент')
    }
  }

  await createUIDir()
  await createComponent()
}
