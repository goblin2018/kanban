export const toShortDate = (t: string | undefined) => {
  if (t === undefined) {
    return ''
  }
  let i = t.indexOf('T')
  return t.substring(0, i)
}
