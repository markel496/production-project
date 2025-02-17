import { Project } from 'ts-morph'

const project = new Project()

//Добавляю файлы, с которыми буду работать
project.addSourceFilesAtPaths('src/**/*.tsx')
project.addSourceFilesAtPaths('src/**/*.ts')

function isAbsolute(value: string) {
  const layers = ['app', 'entities', 'features', 'pages', 'shared', 'widgets']
  return layers.some((layer) => value.startsWith(layer))
}

const files = project.getSourceFiles()

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations()
  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue()
    // Если путь абсолютный - изменяю значение у importDeclaration
    if (isAbsolute(value)) {
      importDeclaration.setModuleSpecifier(`@/${value}`)
    }
  })
})

project.save()
