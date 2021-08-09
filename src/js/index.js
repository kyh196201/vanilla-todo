import 'core-js/stable';
import 'regenerator-runtime/runtime';
import store from 'Store/';
import App from 'Components/App';

// firebase
import './firebase';

import '../css/_index.scss';

window.addEventListener('DOMContentLoaded', () => {
  const $app = new App({
    $target: document.getElementById('app'),
    store,
  });
  window.$app = $app;
});
