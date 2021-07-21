import Component from '../core/Component';

const tag = 'todo-input';

export default class TodoInput extends Component {
  constructor(params) {
    super(params);
  }

  setup() {
    this.onSubmit = this.$props.onSubmit;
  }

  createElement() {
    const $el = document.createElement('section');
    $el.className = 'todo-form';
    $el.innerHTML = this.template();

    this.$el = $el;
    this.$target.appendChild($el);
  }

  template() {
    return `
		<form>
			<input type="text" class="todo-input" placeholder="todo..">
			<button type="submit" class="todo-submit-btn">Submit</button>
		</form>
	`;
  }

  bindEvents() {
    const $form = this.$el.querySelector('form');

    $form.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const $input = this.$el.querySelector('.todo-input');
    const title = $input.value.trim();

    if (!title) {
      alert('할 일을 입력해주세요!');
      return false;
    }

    this.onSubmit(title);

    this.clearInput();
  }

  clearInput() {
    const $input = this.$el.querySelector('.todo-input');

    $input.value = '';
  }
}
