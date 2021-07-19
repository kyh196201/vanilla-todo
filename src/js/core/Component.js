export default class Component {
  constructor({$target, state, $props}) {
    this.$target = $target;
    this.state = state;
    this.$props = $props || {};

    this.validate();
    this.setup();
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
