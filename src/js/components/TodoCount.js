import Component from '../core/Component';

export default class TodoCount extends Component {
  createElement() {
    const $el = document.createElement('section');
    $el.className = 'todo-count';

    this.$el = $el;
    this.$target.appendChild($el);
  }

  template() {
    return `
		<div class="todo-count__content">
      😊 You have
			<span class="total-count">${this.total}</span>
      things todo and you've done
			<span class="completed-count">${this.completed}</span>
      things.
		</div>
	`;
  }

  get todoData() {
    return this.$store.state.todoData;
  }

  // Getters
  get total() {
    return this.todoData.length;
  }

  get completed() {
    return this.total > 0
      ? this.todoData.filter(todo => todo.isCompleted).length
      : 0;
  }
}
