import Component from '../core/Component';

const tag = 'todo-input';

export default class TodoInput extends Component {
  constructor(params) {
    super(params);
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
    this.$el.addEventListener('submit', e => {
      e.preventDefault();
      const $target = e.target;

      if ($target.nodeName === 'FORM') {
        this.handleSubmit();
      }
    });
  }

  async handleSubmit() {
    const $input = this.$el.querySelector('.todo-input');
    const title = $input.value.trim();

    if (!title) {
      alert('할 일을 입력해주세요!');
      $input.focus();
      return false;
    }

    const todoData = {
      title,
      isCompleted: false,
    };

    await this.$store.dispatch('createTodo', todoData);
    this.clearInput();
  }

  clearInput() {
    const $input = this.$el.querySelector('.todo-input');

    $input.value = '';
    $input.focus();
  }
}
