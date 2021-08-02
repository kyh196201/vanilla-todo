import Component from '../core/Component';

export default class LoadingView extends Component {
  createElement() {
    const $el = document.createElement('section');
    $el.className = 'loading-view';

    $el.innerHTML = `<div class="spinner"><div></div></div>`;

    this.$el = $el;
    this.$target.appendChild($el);
  }

  render() {
    const {loading} = this.$store.state;

    if (loading) {
      this.$el.classList.add('show');
    } else {
      this.$el.classList.remove('show');
    }
  }
}
