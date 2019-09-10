export const csv2arr = (str) => {
  return str
    .match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) // splitting by commas that are only outside of quotes
    .map(val => {
      const v = val.trim()// cleaning leading and trailing spaces

      // csv items with comas are coming with leading and trailing quotes in values
      // trimming such quotes only for such cases
      return v[0] === `"` && v[v.length - 1] === `"` ? v.substring(1, v.length - 1) : v
    })
}


export const name2key = (str) => {
  return str
    .trim()
    .replace(/[^\w]|_/g, '_')
    .toLowerCase()
}

