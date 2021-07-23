import Component from '../core/Component';

// icons
import {tabIcons} from '../utils/constant';

export default class Tabs extends Component {
  createElement() {
    const $el = document.createElement('ul');
    $el.className = 'todo-tab';

    this.$el = $el;
    this.$target.appendChild($el);
  }

  template() {
    const {tabs} = this.$store.state;

    return tabs.map(tab => this.createTabItem(tab)).join('');
  }

  createTabItem(tab) {
    const isActive = tab === this.$store.state.activeTab;

    const $radio = isActive
      ? `<input type="radio" name="tab" class="tab-radio" value="${tab}" checked>`
      : `<input type="radio" name="tab" class="tab-radio" value="${tab}">`;

    return `
		<li class="tab-item ${isActive ? 'active' : ''}">
			<label>
				${$radio}
				<span class="tab-title">
          <span class="visually-hidden">${tab}</span>
          ${this.getTabIcon(tab)}
        </span>
			</label>
		</li>
	`;
  }

  getTabIcon(tab) {
    return tabIcons[tab];
  }
}
