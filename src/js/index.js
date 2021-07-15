import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './components/App.js';

import '../css/styles.scss';

window.addEventListener('DOMContentLoaded', e => {
  const $app = new App(document.getElementById('app'));
  window.$app = $app;
});
