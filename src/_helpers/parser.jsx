import * as React from 'react';
import { Link, ActionButton, mergeStyles } from 'office-ui-fabric-react';


export const csv2arr = text => {
  let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
  for (l of text) {
    if ('"' === l) {
      if (s && l === p) row[i] += l;
      s = !s;
    } else if (',' === l && s) l = row[++i] = '';
    else if ('\n' === l && s) {
      if ('\r' === p) row[i] = row[i].slice(0, -1);
      row = ret[++r] = [l = '']; i = 0;
    } else row[i] += l;
    p = l;
  }
  return ret;
};


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

  if (!ts) return {
     text: str,
     tokens: [],
     mixed: [str],
     incoming: inputStr
    }

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
    let mutatorsArray = getMutators(token.tokenString)
    let colorMutator = null
    if (mutatorsArray && mutatorsArray.filter(m => m.indexOf('color') !== -1)) {
      colorMutator = mutatorsArray.filter(m => m.indexOf('color') !== -1)[0]
    }
    let suggestions = []
    if (token.type === 'link') suggestions.push(() => <Link key={Math.random()}>{token.target}</Link>)
    if (token.type === 'icon') suggestions.push(() => <ActionButton key={Math.random()} style={{
      height: 16,
      width: 26,
      padding: 0,
      margin: 0,
    }}
      className={mergeStyles({
        selectors: {
          '& i': {
            color: colorMutator ? `var(--${colorMutator})` : 'var(--color-grey-600)'
          }
        }
      })}
      iconProps={{ iconName: token.target }} />)
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
