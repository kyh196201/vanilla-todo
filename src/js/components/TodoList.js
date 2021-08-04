// Components
// Templates
import {todoTemplate, editTemplate} from 'Utils/template/todoTemplate';
// Constants
import {KEY_CODES} from 'Utils/constant';
import Component from 'Core/Component';

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
    const {todoData, editingId} = this.$store.state;

    return todoData.length
      ? todoData
          .map(todo => {
            if (todo.id === editingId) {
              return editTemplate(todo);
            }
            return todoTemplate(todo);
          })
          .join('')
      : '<li class="todo-item todo-item--empty">할 일을 입력해주세요 😉</li>';
  }

  render() {
    this.$list.innerHTML = this.template();

    this.mounted();
  }

  mounted() {
    this.focusEditInput();
  }

  bindEvents() {
    // 클릭 이벤트
    this.$el.addEventListener('click', e => {
      const $target = e.target;
      const $todoItem = $target.closest('.todo-item');

      if (!$todoItem) return false;

      const id = parseInt($todoItem.dataset.id);

      if ($target.classList.contains('todo-item__checkbox')) {
        this.handleToggleTodo(id);
      } else if ($target.classList.contains('todo-item__btn--delete')) {
        if (window.confirm('삭제하시겠습니까?')) {
          this.handleDeleteTodo(id);
        }
      } else if ($target.classList.contains('todo-item__btn--edit')) {
        this.handleEditTodo(id);
      } else if ($target.classList.contains('todo-item__btn--redo')) {
        this.handleRedoTodo();
      } else if ($target.classList.contains('todo-item__btn--done')) {
        this.handleUpdateTodo(id);
      }
    });

    // 입력 이벤트
    this.$el.addEventListener('keyup', e => {
      const $target = e.target;
      const $todoItem = $target.closest('.todo-item');

      if (!$todoItem) return false;

      const id = parseInt($todoItem.dataset.id);

      if ($target.classList.contains('todo-item__edit')) {
        if (e.key === KEY_CODES.ENTER) {
          this.handleUpdateTodo(id);
        } else if (e.key === KEY_CODES.ESC) {
          this.handleCancelEdit();
        }
      }
    });

    // Blur 이벤트
    this.$el.addEventListener('focusout', e => {
      const $target = e.target;

      if ($target.classList.contains('todo-item__edit')) {
        // this.handleCancelEdit();
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

  handleUpdateTodo(id) {
    const $input = document.querySelector('.todo-item__edit');

    try {
      if (!$input) throw new Error('no editing item.');

      const title = $input.value.trim();

      if (!title) {
        alert('내용을 입력해주세요 😁');
        this.handleRedoTodo();
        return false;
      }

      const params = {
        id,
        todoData: {
          title,
        },
      };

      this.$store.dispatch('updateTodo', params);
    } catch (error) {
      console.error(error.message);
    }

    return true;
  }

  handleEditTodo(id) {
    this.$store.dispatch('startEdit', id);
  }

  handleCancelEdit() {
    this.$store.dispatch('stopEdit');
  }

  handleRedoTodo() {
    const $input = document.querySelector('.todo-item__edit');

    if (!$input) return;

    $input.value = this.$store.state.valueBeforeEdit;
    $input.focus();
  }

  findTodoItem(id) {
    if (!id) return null;

    return this.$store.state.todoData.find(todo => todo.id === id);
  }

  // edit input에 포커스
  focusEditInput() {
    const isEditing = !!this.$store.state.editingId;
    const $input = document.querySelector('.todo-item__edit');

    if (!isEditing || !$input) return;
    const {value} = $input;
    $input.value = '';
    $input.value = value;
    $input.focus();
  }
}
