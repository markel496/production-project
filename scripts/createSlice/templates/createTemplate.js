const fs = require('fs/promises')
const resolveRoot = require('../resolveRoot')
const firstCharUpperCase = require('../firstCharUpperCase')
const createModel = require('./createModel')
const createUI = require('./createUI')
const createPublicApi = require('./createPublicApi')

module.exports = async (layer, sliceName) => {
  const upperSliceName = firstCharUpperCase(sliceName)

  try {
    await fs.mkdir(resolveRoot('src', layer, sliceName))
  } catch (e) {
    console.log(`не удалось создать директорию для слайса${sliceName}`)
  }

  await createModel(layer, upperSliceName)
  await createUI(layer, upperSliceName)
  await createPublicApi(layer, upperSliceName)
  console.log('Good!!!')
}
