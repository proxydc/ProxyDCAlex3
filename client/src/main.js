import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import './assets/bootstrap_yeti.css'
//import { h } from "vue";

createApp(App)
    .use(router)    
    .mount("#app");


/*Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')*/
