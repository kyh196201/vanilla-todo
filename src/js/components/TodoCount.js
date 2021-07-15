import Component from '../core/Component';

export default class TodoCount extends Component {
  template() {
    const {total, completed} = this.state;
    const active = total - completed;

    return `
		<div class="todo-total">
			Total: <span class="total-count">${total}</span>
		</div>
		<div class="todo-completed">
			Completed: <span class="completed-count">${completed}</span>
		</div>
		<div class="todo-active">
			Active: <span class="active-count">${active}</span>
		</div>
	`;
  }
}