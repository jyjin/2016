import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'

// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({
  '/app/:page': {
    component: App
  },
  '/app/add': {
    component: AddItem
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/app/1'
})

router.start(App, '#app')
