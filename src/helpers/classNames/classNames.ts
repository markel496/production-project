//С помощью этой функции удобно навешивать классы, особенно если они нужны по какому-либо условию
//Record означает, что в качестве ключа будет string, а в качестве значения либо boolean, либо string
type Mods = Record<string, boolean | string>

export function classNames(
  cls: string,
  mods: Mods,
  additional: string[]
): string {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className, value]) => className)
  ].join(' ')
}

// classNames('class', {hovered: true,selected: false,someClass: true}, ['sad', 'asd'])
//class sad asd hovered someClass
