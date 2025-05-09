import path from 'path'

import { Project } from 'ts-morph'

const project = new Project()

//Добавляю файлы, с которыми буду работать
project.addSourceFilesAtPaths('src/**/*.tsx')
project.addSourceFilesAtPaths('src/**/*.ts')

const files = project.getSourceFiles()

const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui')
const sharedUiDirectory = project.getDirectory(uiPath)
const componentsDirs = sharedUiDirectory?.getDirectories()

componentsDirs?.forEach((directory) => {
  const indexFilePath = directory.getPath() + '/index.ts'
  const indexFile = directory.getSourceFile(indexFilePath)

  if (!indexFile) {
    const sourceCode = `export * from './${directory.getBaseName()}'`
    const file = directory.createSourceFile(indexFilePath, sourceCode, {
      overwrite: true
    })

    file.save() // создается файл в ос
  }
})

function isAbsolute(value: string) {
  const layers = ['app', 'entities', 'features', 'pages', 'shared', 'widgets']
  return layers.some((layer) => value.startsWith(layer))
}

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations()
  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue()
    const valueWithoutAlias = value.replace('@/', '')

    const segments = valueWithoutAlias.split('/')

    const isSharedLayer = segments[0] === 'shared'
    const isUiSlice = segments[1] === 'ui'

    if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/')
      importDeclaration.setModuleSpecifier(`@/${result}`)
    }
  })
})

project.save()

//npx ts-node scripts/refactoring/createPublicApiForSharedUi.ts
