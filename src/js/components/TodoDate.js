import Component from 'Core/Component';

// Utils
import {formatDate} from 'Utils/date';

export default class TodoDate extends Component {
  createElement() {
    const $el = document.createElement('article');
    $el.className = 'todo-date';

    this.$el = $el;
    this.$target.appendChild($el);
  }

  template() {
    const {date} = this.$store.state;

    return `<p class="todo-date__today">
        ${formatDate(date)}
      </p>`;
  }
}
