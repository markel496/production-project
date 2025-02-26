const path = require('path')
const fs = require('fs')

const cacheDirectory = path.resolve(__dirname, '..', 'node_modules', '.cache')

try {
  fs.rmSync(cacheDirectory, { recursive: true, force: true })
  console.log('cache deleted!')
} catch (err) {
  console.log(err)
}

/**После установки новых зависимостей кэш нужно чистить
 *
 * postinstall в package.json должен срабатывать после установки пакета*/
