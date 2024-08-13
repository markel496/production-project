const createTemplate = require('./templates/createTemplate')
const getDirectories = require('./getDirectories')

const layer = process.argv[2]
const sliceName = process.argv[3]

const layers = ['features', 'entities', 'pages']

if (!layer || !layers.includes(layer)) {
  throw new Error(`Укажите слой ${layers.join(' или ')}`)
}

if (!sliceName) {
  throw new Error('Укажите название слайса')
}

const isExistSlice = getDirectories(layer).includes(sliceName)

if (isExistSlice) {
  throw new Error(`Слайс с именем ${sliceName} уже существует`)
}

createTemplate(layer, sliceName)
