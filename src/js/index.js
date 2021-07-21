import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './components/App.js';
import store from './store/index.js';

import '../css/styles.scss';

window.addEventListener('DOMContentLoaded', e => {
  const $app = new App({
    $target: document.getElementById('app'),
    store,
  });
  window.$app = $app;
});
