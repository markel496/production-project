import { Node, Project, SyntaxKind } from 'ts-morph'

const removedFeatureName = process.argv[2] // isCounterEnabled
const featureState = process.argv[3] // on/off

if (!removedFeatureName) {
  throw new Error('Укажите название фича-флага')
}

if (!featureState) {
  throw new Error('Укажите состояние фичи (on/off)')
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Неккоректное значение состояния фичи (on/off)')
}

const project = new Project()

project.addSourceFilesAtPaths('src/**/MainPage.tsx')

//Добавляю файлы, с которыми буду работать
// project.addSourceFilesAtPaths('src/**/*.tsx')
// project.addSourceFilesAtPaths('src/**/*.ts')

const files = project.getSourceFiles()

function isToggleFunction(node: Node) {
  let isToggleFeatures = false
  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === 'toggleFeatures'
    ) {
      isToggleFeatures = true
    }
  })
  return isToggleFeatures
}

files.forEach((sourceFile) => {
  /** Обход по всем файлам, чтобы найти ноду нужного типа и проверить ее название */
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression
      )

      if (!objectOptions) return

      const featureNameProperty = objectOptions.getProperty('name')
      const onFunctionProperty = objectOptions.getProperty('on')
      const offFunctionProperty = objectOptions.getProperty('off')

      const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1) // Убираю кавычки
      const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction
      )
      const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction
      )

      if (featureName !== removedFeatureName) return

      if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '')
      }
      if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '')
      }

      // console.log(featureName, onFunction?.getText(), offFunction?.getText())
    }
  })
})

project.save()
