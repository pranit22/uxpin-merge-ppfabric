import { name2key, getTokens, csv2arr } from './parser'


it('name2key method', () => {
  expect(name2key(' a B c ')).toEqual('a_b_c');
});


const string1 = 'icon(lock) 0123 link(Snow|blue) 4567 icon(foo|bar, red-600) '
const ex1 = getTokens(string1)

it('getTokens - ex1: has text, mixed & tokens', () => {
  expect(ex1.tokens).toHaveLength(3)
  expect(ex1.mixed).toHaveLength(5)
  expect(ex1.text).toEqual('0123 4567')
});


it('getTokens - ex1: tokens types are correct', () => {
  expect(ex1.tokens).toContainEqual(expect.objectContaining({
    tokenString: expect.anything(String),
    type: expect.anything(String),
    position: expect.anything(Object),
    target: expect.anything(String),
    mutators: expect.anything(Array || null),
    suggestions: expect.anything(Array),
  }))
});

it('getTokens - ex1: mixed values are correct', () => {
  expect(ex1.mixed[0].tokenString).toBe('icon(lock)')
  expect(ex1.mixed[0].type).toBe('icon')
  expect(ex1.mixed[0].position).toMatchObject({
    "caret": 0, "placement": "start"
  })
  expect(ex1.mixed[0].target).toBe('lock')
  expect(ex1.mixed[0].mutators).toBe(null)
  expect(ex1.mixed[0].suggestions).toContainEqual(expect.any(Function))

  expect(ex1.mixed[1]).toBe('0123')

  expect(ex1.mixed[2].tokenString).toBe('link(Snow|blue)')
  expect(ex1.mixed[2].type).toBe('link')
  expect(ex1.mixed[2].position).toMatchObject({
    "caret": 15, "placement": "middle"
  })
  expect(ex1.mixed[2].target).toBe('Snow')
  expect(ex1.mixed[2].mutators).toContainEqual("blue")
  expect(ex1.mixed[2].suggestions).toContainEqual(expect.any(Function))

  expect(ex1.mixed[3]).toBe('4567')

  expect(ex1.mixed[4].tokenString).toBe('icon(foo|bar, red-600)')
  expect(ex1.mixed[4].type).toBe('icon')
  expect(ex1.mixed[4].position).toMatchObject({
    "caret": 36, "placement": "end"
  })
  expect(ex1.mixed[4].target).toBe('foo')
  expect(ex1.mixed[4].mutators).toContainEqual("bar" || "red-600")
  expect(ex1.mixed[4].suggestions).toContainEqual(expect.any(Function))
});

const string2 = 'abc def this text has no tokens '
const ex2 = getTokens(string2)
it('getTokens - ex2: should only have trimmed text', () => {
  expect(ex2.tokens).toEqual([])
  expect(ex2.mixed).toEqual([string2.trim()])
  expect(ex2.text).toEqual(string2.trim())
})

const string3 = 'One,Two,Three'
const ex3 = getTokens(string3)
it('getTokens - ex3: should only have trimmed text', () => {
  expect(ex3.tokens).toEqual([])
  expect(ex3.mixed).toEqual([string3.trim()])
  expect(ex3.text).toEqual(string3.trim())
})

const csv2arr_string1 = '"one","two with escaped """" double quotes""","three, with, commas",four with no quotes,"five with CRLF\r\n"\r\n"2nd line one","two with escaped """" double quotes""","three, with, commas",four with no quotes,"five with CRLF\r\n"';
const ex4 = csv2arr(csv2arr_string1)

it('csv2arr - ex1: conversion of the CVS string to array of arrays', () => {
  expect(ex4).toEqual([
    [
      "one",
      "two with escaped \"\" double quotes\"",
      "three, with, commas",
      "four with no quotes",
      "five with CRLF\r\n"
    ],
    [
      "2nd line one",
      "two with escaped \"\" double quotes\"",
      "three, with, commas",
      "four with no quotes",
      "five with CRLF\r\n"
    ]
  ])
})

const csv2arr_string2 = '   '; // string with just spaces
const ex5 = csv2arr(csv2arr_string2)

it('csv2arr - ex2: conversion of empty string (on trimming) returns empty array', () => {
  expect(ex5).toEqual([])
})
