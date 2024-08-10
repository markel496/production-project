const { readdirSync } = require('fs')

module.exports = (path) => {
  const directories = readdirSync(`src/${path}`, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dir) => dir.name)

  return directories
}
