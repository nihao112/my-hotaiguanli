import dateFilter from './datefilters'
export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
