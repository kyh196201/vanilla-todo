import 'core-js/stable';
import 'regenerator-runtime/runtime';
import store from 'Store/';
import App from 'Components/App';

import '../css/_index.scss';

window.addEventListener('DOMContentLoaded', e => {
  const $app = new App({
    $target: document.getElementById('app'),
    store,
  });
  window.$app = $app;
});
