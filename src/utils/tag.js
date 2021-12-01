
const isNoTag = ['/login', '/404', '/401', '/import']

export const isNoTags = (path) => {
  return isNoTag.includes(path)
}
