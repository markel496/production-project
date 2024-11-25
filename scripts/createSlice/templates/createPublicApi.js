/* eslint-disable indent */
const fs = require('fs/promises')
const resolveRoot = require('../resolveRoot')
const firstCharLowerCase = require('../firstCharLowerCase')

module.exports = async (layer, sliceName) => {
  const schemaName = `${sliceName}Schema`

  try {
    await fs.writeFile(
      resolveRoot('src', layer, sliceName, 'index.ts'),
      `export { ${sliceName} } from './ui/${sliceName}/${sliceName}'
export type { ${schemaName} } from './model/types/${firstCharLowerCase(
        schemaName
      )}'`.replace(/\n/g, '\r\n')
    )
  } catch (e) {
    console.log('Не удалось создать PUBLIC API')
  }
}
