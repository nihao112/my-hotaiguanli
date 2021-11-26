import i18n from '@/i18n/index.js'
export const grTitle = (title) => {
  return i18n.global.t('route.' + title)
}
