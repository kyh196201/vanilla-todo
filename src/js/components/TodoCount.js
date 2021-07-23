import Component from '../core/Component';

export default class TodoCount extends Component {
  constructor(params) {
    super(params);
  }

  createElement() {
    const $el = document.createElement('section');
    $el.className = 'todo-count';

    this.$el = $el;
    this.$target.appendChild($el);
  }

  template() {
    return `
		<div class="todo-total">
			Total: <span class="total-count">${this.total}</span>
		</div>
		<div class="todo-completed">
			Completed: <span class="completed-count">${this.completed}</span>
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
    return this.total > 0 ? this.todoData.filter(todo => todo.isCompleted).length : 0;
  }
}
