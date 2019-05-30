import Vue from 'vue';
import App from './App';

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});

console.log('moduleHot',module)
if (module.hot) {
  module.hot.accept();
}