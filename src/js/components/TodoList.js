import Component from '../core/Component';

const tag = 'todo-list';

export default class TodoList extends Component {
  constructor(params) {
    super(params);
  }

  setup() {
    this.onToggle = this.$props.onToggle;
    this.onDelete = this.$props.onDelete;
  }

  createElement() {
    const $el = document.createElement('section');
    $el.className = 'todo-list-container';

    const $list = document.createElement('ul');
    $list.className = 'todo-list';

    $el.appendChild($list);

    this.$list = $list;
    this.$el = $el;

    this.$target.appendChild($el);
  }

  template() {
    const {todoData} = this.$store.state;

    return todoData.length
      ? todoData
          .map(todo => {
            return this.todoTemplate(todo);
          })
          .join('')
      : '할 일을 입력해주세요 😊';
  }

  render() {
    this.$list.innerHTML = this.template();
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
    this.$el.addEventListener('click', e => {
      const $target = e.target;
      const $todoItem = $target.closest('.todo-item');

      if (!$todoItem) return false;

      const id = parseInt($todoItem.dataset.id);

      if ($target.classList.contains('todo-item__toggle-btn')) {
        this.handleToggleTodo(id);
      } else if ($target.classList.contains('todo-item__delete-btn')) {
        if (window.confirm('삭제하시겠습니까?')) {
          this.handleDeleteTodo(id);
        }
      }
    });
  }

  // Actions
  handleDeleteTodo(id) {
    try {
      this.$store.dispatch('deleteTodo', id);
    } catch (error) {
      console.error('error in handleDelteItem', error.message);
    }
  }

  handleToggleTodo(id) {
    try {
      const todoItem = this.findTodoItem(id);

      if (!todoItem) throw new Error('no todo');

      const params = {
        id,
        todoData: {
          isCompleted: !todoItem.isCompleted,
        },
      };

      this.$store.dispatch('updateTodo', params);
    } catch (error) {
      console.error(error.message);
    }
  }

  findTodoItem(id) {
    if (!id) return null;

    return this.$store.state.todoData.find(todo => todo.id === id);
  }
}
