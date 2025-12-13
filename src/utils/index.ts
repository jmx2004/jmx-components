export const toLine = (value: String) => {
  return value.replace(/(A-Z)g/,'-$1').toLocaleLowerCase()
}