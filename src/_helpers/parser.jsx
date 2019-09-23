import * as React from 'react';
import { Link, FontIcon } from 'office-ui-fabric-react';

export const name2key = (str) => {
  return str
    .trim()
    .replace(/[^\w]|_/g, '_')
    .toLowerCase()
}

/**
 * Function to parse input string and return object
 *
 * @param {string} inputStr - Input string with tokens <type>(<target>|<mutation1>,<mutation2>)
 * @example "icon(Dictionary) abc link(John Snow|blue) def icon(CompassNW|bar,red-600)"
 * @example "icon(box) dfsdf"
 * @example "dfsfsdf link(target)"
 */
export const getTokens = inputStr => {
  let str = inputStr.trim()

  // token starts with keyword [icon, link]
  // may or may not include leading and trailing space
  // should have parentheses after keyword
  let reg = new RegExp(/(\s|)(icon|link)\((.*?)\)(\s|)/gi)
  let ts = str.match(reg)

  if (!ts) return { text: str } // if no tokens detected, return just string

  const getType = t => t.slice(0, t.indexOf('('))
  const getTarget = t => t.match(/(?<=\().*?(?=(\)|\|))/g)[0]
  const getMutators = t => {
    let mutators = t.match(/(?<=\|).*?(?=\))/g)
    if (mutators && mutators.length > 0) mutators = mutators[0].split(',').map(v => v.trim())
    return mutators
  }
  const getPosition = t => {
    let position = {}
    const [start, end] = [str.indexOf(t), str.indexOf(t) + t.length]
    if (str.indexOf(t) === 0) position.placement = 'start'
    if (str.indexOf(t) + t.length === str.length) position.placement = 'end'
    if (!position.placement) position.placement = 'middle'
    position.caret = start === 0 ? start : start - 1  // tracking caret of token extraction
    return position;
  }

  const getSuggestions = token => {
    let suggestions = []
    if (token.type === 'link') suggestions.push(() => <Link key={Math.random()}>{token.target}</Link>)
    if (token.type === 'icon') suggestions.push(() => <FontIcon key={Math.random()} iconName={token.target} />)
    return suggestions
  }

  const makeToken = t => {
    let token = {
      tokenString: t,
      type: getType(t),
      position: getPosition(t),
      target: getTarget(t),
      mutators: getMutators(t),
    }
    token.suggestions = getSuggestions(token)
    return token
  }

  let tokens = ts.map(t => makeToken(t))

  let mixed = str.split(/\s(?![^\(]*\))/g).map(el => {
    let token = el.match(reg)
    return token ? makeToken(el) : el
  })


  return {
    text: mixed.filter(el => typeof el === 'string').join(' '),
    tokens,
    mixed,
    incoming: inputStr
  }
}

// TESTING - getTokens
// let [a, b, c] = [
//   "icon(lock) 0123 link(Snow|blue) 4567 icon(foo|bar, red-600) ",
//   "icon(box) dfsdf",
//   "dfsfsdf link(target)"
// ]
// let res = getTokens(a)
// console.log(res.tokens[0].position);
// console.log(res.tokens[1].position);
// console.log(res.tokens[2].position);
// console.log(res.text);
