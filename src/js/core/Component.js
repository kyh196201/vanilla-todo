export default class Component {
  constructor(params = {}) {
    this.$target = params.$target;
    this.state = params.state || {};
    this.$props = params.$props || {};

    this.validate();
    this.setup();
    this.createElement();
    this.render();
    this.bindEvents();
  }

  setup() {
    this.createElement();
  }

  createElement() {}

  render() {
    this.$el.innerHTML = this.template();
  }

  mounted() {}

  validate() {}

  bindEvents() {}

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.render();
  }
}
