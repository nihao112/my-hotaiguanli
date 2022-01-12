import dateFilter from './datefilters'
import relativeTime from './relativeTime'
export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
