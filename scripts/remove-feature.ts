import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph'

const removedFeatureName = process.argv[2] // isCounterEnabled
const featureState = process.argv[3] // on/off

const toggleComponentName = 'ToggleFeatures'
const toggleFunctionName = 'toggleFeatures'

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
      child.getText() === toggleFunctionName
    ) {
      isToggleFeatures = true
    }
  })
  return isToggleFeatures
}

function isToggleComponent(node: Node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier)
  return identifier?.getText() === toggleComponentName
}

const replaceToggleFunction = (node: Node) => {
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

const getAttributeNodeByName = (
  jsxAttributes: JsxAttribute[],
  name: string
) => {
  return jsxAttributes.find((node) => node.getStructure().name === name)
}

const getReplacedComponent = (attribute?: JsxAttribute) => {
  const value = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText()

  if (value?.startsWith('(')) {
    return value.slice(1, -1)
  }

  return value
}

const replaceToggleComponent = (node: Node) => {
  // <ToggleFeatures feature="isCounterEnabled" on={<Counter />} off={<Text text='Some text...'/>} />
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute)

  const onAttribute = getAttributeNodeByName(attributes, 'on')
  const offAttribute = getAttributeNodeByName(attributes, 'off')

  const featureNameAttribute = getAttributeNodeByName(attributes, 'feature')

  // isCounterEnabled
  const featureName = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    ?.slice(1, -1)

  if (featureName !== removedFeatureName) return

  const offValue = getReplacedComponent(offAttribute)
  const onValue = getReplacedComponent(onAttribute)

  if (featureState === 'on' && onValue) {
    node.replaceWithText(onValue)
    console.log(`"${featureState}" completed!`)
  }

  if (featureState === 'off' && offValue) {
    node.replaceWithText(offValue)
    console.log(`"${featureState}" completed!`)
  }
}

files.forEach((sourceFile) => {
  /** Обход по всем файлам, чтобы найти ноду нужного типа и проверить ее название */
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      replaceToggleFunction(node)
    }

    if (
      node.isKind(SyntaxKind.JsxSelfClosingElement) &&
      isToggleComponent(node)
    ) {
      replaceToggleComponent(node)
    }
  })
})

project.save()
