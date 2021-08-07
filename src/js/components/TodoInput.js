import Component from 'Core/Component';

export default class TodoInput extends Component {
  constructor(params) {
    super(params);

    this.placeholder = '할 일을 입력해주세요 😀';
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
      <div class="todo-input-wrapper">
        <input type="text" class="todo-input" placeholder="${this.placeholder}">
        <button type="submit" class="todo-submit-btn">
          <i class="fas fa-plus"></i>
        </button>
      </div>
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

    await this.$store.dispatch('createTodo', title);
    this.clearInput();
  }

  clearInput() {
    const $input = this.$el.querySelector('.todo-input');

    $input.value = '';
    $input.focus();
  }
}
