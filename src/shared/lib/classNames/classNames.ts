//С помощью этой функции удобно навешивать классы, особенно если они нужны по какому-либо условию
//Record означает, что в качестве ключа будет string, а в качестве значения либо boolean, либо string, либо undefined
export type Mods = Record<string, boolean | string | undefined>

export function classNames(
  cls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = []
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className)
  ].join(' ')
}

// classNames('class', {hovered: true,selected: false,someClass: true}, ['sad', 'asd'])
//class sad asd hovered someClass
