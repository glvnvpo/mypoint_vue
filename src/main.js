import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import "./style/variables.scss";
import "@/style/fonts.scss";
import "@/style/main.scss";
import YmapPlugin from 'vue-yandex-maps'

// Vue.use(YmapPlugin);
Vue.config.productionTip = false

// const settings = {
//   apiKey: '77a5e6ea-6171-44e6-bdac-228f66072a3e',
//   lang: 'ru_RU',
//   coordorder: 'latlong',
//   version: '2.1'
// }
// Vue.use(YmapPlugin, settings)

new Vue({
  router,
  store,
  YmapPlugin,
  render: h => h(App),
}).$mount('#app')
