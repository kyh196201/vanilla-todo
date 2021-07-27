import Component from '../core/Component';

export default class TodoList extends Component {
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
      ? todoData.map(todo => this.todoTemplate(todo)).join('')
      : '<li class="todo-item todo-item--empty">할 일을 입력해주세요 😉</li>';
  }

  render() {
    this.$list.innerHTML = this.template();
  }

  todoTemplate(todo) {
    const {id} = todo;

    const $checkbox = this.checkboxTemplate(todo);

    return `
      <li class="todo-item" data-id="${id}">
        ${$checkbox}
        <button type="button" class="todo-item__delete-btn">&times;</button>
      </li>`;
  }

  checkboxTemplate({title, isCompleted}) {
    const $checkbox = isCompleted
      ? `<input type="checkbox" class="todo-item__checkbox" checked>`
      : `<input type="checkbox" class="todo-item__checkbox" />`;

    const $title = isCompleted ? `<strike>${title}</strike>` : title;

    return `
      <div class="todo-item__checkbox-wrapper pretty p-default">
        ${$checkbox}
        <div class="state p-danger">
            <label>
              <span class="todo-item__title">
                ${$title}
              </span>
            </label>
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.$el.addEventListener('click', e => {
      const $target = e.target;
      const $todoItem = $target.closest('.todo-item');

      if (!$todoItem) return false;

      const id = parseInt($todoItem.dataset.id);

      if ($target.classList.contains('todo-item__checkbox')) {
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
