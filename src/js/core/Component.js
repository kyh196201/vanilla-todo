import Store from '../store/store.js';

export default class Component {
  constructor(params = {}) {
    this.$target = params.$target;
    this.state = params.state || {};
    this.$props = params.$props || {};

    this.render = this.render || function () {};

    if (params.store instanceof Store) {
      this.$store = params.store;

      params.store.events.subscribe('stateChange', () => {
        this.render.call(this);
      });
    }

    this.validate();
    this.setup();
    this.createElement();
    this.render();
    this.bindEvents();
  }

  setup() {}

  createElement() {}

  render() {
    this.$el.innerHTML = this.template();
  }

  validate() {}

  bindEvents() {}

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.render();
  }
}
