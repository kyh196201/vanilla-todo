import Component from '../core/Component';

const tag = 'todo-input';

export default class TodoInput extends Component {
  setup() {
    this.onSubmit = this.$props.onSubmit;
  }

  template() {
    return `
		<form class="todo-form">
			<input type="text" class="todo-input" placeholder="todo..">
			<button type="submit" class="todo-submit-btn">Submit</button>
		</form>
	`;
  }

  bindEvents() {
    const $form = this.$target.querySelector('.todo-form');

    $form.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const $input = this.$target.querySelector('.todo-input');
    const inputText = $input.value.trim();

    if (!inputText) {
      alert('할 일을 입력해주세요!');
      return false;
    }

    this.onSubmit(inputText);

    this.clearInput();
  }

  clearInput() {
    const $input = this.$target.querySelector('.todo-input');

    $input.value = '';
  }
}
