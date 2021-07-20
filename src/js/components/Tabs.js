import Component from '../core/Component';

export default class Tabs extends Component {
  createElement() {
    const $el = document.createElement('ul');
    $el.className = 'todo-tab';

    this.$el = $el;
    this.$target.appendChild($el);
  }

  template() {
    const {tabs} = this.state;

    return tabs.map(tab => this.createTabItem(tab)).join('');
  }

  createTabItem(tab) {
    const isActive = tab === this.state.activeTab;

    const $radio = isActive
      ? `<input type="radio" name="tab" value="${tab}" checked>`
      : `<input type="radio" name="tab" value="${tab}">`;

    return `
		<li class="tab-item">
			<label>
				${$radio}
				<span class="tab-title">${tab}</span>
			</label>
		</li>
	`;
  }
}
