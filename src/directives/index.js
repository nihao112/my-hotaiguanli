import print from 'vue3-print-nb'
import showPermission from './permission'
export default (app) => {
  app.use(print)
  app.directive('showPermission', showPermission)
}
