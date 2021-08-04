import Store from 'Store/store';

export default class Component {
  constructor(params = {}) {
    this.$target = params.$target;
    this.state = params.state || {};
    this.$props = params.$props || {};
    this.isStable = params.isStable || false;

    this.render = this.render || function () {};

    if (params.store instanceof Store) {
      this.$store = params.store;

      params.store.events.subscribe('stateChange', () => {
        // NOTE 정적 컴포넌트 정의
        if (this.isStable) return;

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

    this.mounted();
  }

  mounted() {}

  validate() {}

  bindEvents() {}

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.render();
  }
}
