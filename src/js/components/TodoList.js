import Component from '../core/Component';

const tag = 'todo-list';

export default class TodoList extends Component {
  setup() {
    this.onToggle = this.$props.onToggle;
    this.onDelete = this.$props.onDelete;
  }

  template() {
    const {data} = this.state;

    return data.length
      ? data
          .map(todo => {
            return this.todoTemplate(todo);
          })
          .join('')
      : '할 일을 입력해주세요 😊';
  }

  todoTemplate(todo) {
    const {title, isCompleted, id} = todo;

    const $radio = isCompleted
      ? `<input type="checkbox" class="todo-item__toggle-btn" checked>`
      : `<input type="checkbox" class="todo-item__toggle-btn">`;
    const $title = isCompleted ? `<s>${title}</s>` : title;

    return `
      <li class="todo-item" data-id="${id}">
        ${$radio}
        <div class="todo-item__title">${$title}</div>
        <button type="button" class="todo-item__delete-btn">&times;</button>
      </li>`;
  }

  bindEvents() {
    this.$target.addEventListener('click', e => {
      const $target = e.target;
      const $todoItem = $target.closest('.todo-item');

      if (!$todoItem) return false;

      const id = parseInt($todoItem.dataset.id);

      if ($target.classList.contains('todo-item__toggle-btn')) {
        this.onToggle(id);
      } else if ($target.classList.contains('todo-item__delete-btn')) {
        if (window.confirm('삭제하시겠습니까?')) {
          this.onDelete(id);
        }
      }
    });
  }
}
