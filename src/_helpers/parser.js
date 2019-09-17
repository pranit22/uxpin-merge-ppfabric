export const name2key = (str) => {
  return str
    .trim()
    .replace(/[^\w]|_/g, '_')
    .toLowerCase()
}

/*
type(target|mutation1, mutation2)
cases:
"icon(lock)  fasdfa sdf link(Snow|blue)  dfsdfadf dsaf icon(foo|bar, red-600)"
"icon(box) dfsdf"
"dfsfsdf link(target)"
*/
export const getTokens = inputStr => {
  let str = inputStr.trim()

  let reg = new RegExp(/(icon|link)\((.*?)\)/gi)
  let ts = str.match(reg)

  if (!ts) return { text: str }

  let tokens = []
  ts.forEach((t, i) => {
    // token position
    let position = {}
    position.start = str.indexOf(t)
    position.end = str.indexOf(t) + t.length
    if (str.indexOf(t) === 0) position.label = 'start'
    if (str.indexOf(t) + t.length === str.length) position.label = 'end'
    if (!position.label) position.label = 'middle'

    // token type
    let type = t.slice(0, t.indexOf('('))

    // token target
    let target = t.match(/(?<=\().*?(?=(\)|\|))/g)[0]

    // token mutators
    let mutators = t.match(/(?<=\|).*?(?=\))/g)
    if (mutators && mutators.length > 0) mutators = mutators[0].split(',').map(v => v.trim())

    tokens.push({
      tokenString: t,
      type,
      position,
      target,
      mutators
    })
  })


  // removing tokens from string
  let cleanStrRegex = new RegExp(tokens
    .map(tObj => tObj.tokenString.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
    .join('|')
    , 'gi')
  let text = str.replace(cleanStrRegex, '')


  return { text, tokens }
}




