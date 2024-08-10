const path = require('path')

module.exports = (...segments) =>
  path.resolve(__dirname, '..', '..', ...segments)

// Выход в корень проекта для того, чтобы было удобно обращаться к папке src и всему вложенному
