import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoCount from './TodoCount';

const tag = 'app';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.state = {
      todoData: [],
    };

    this.validate();
    this.init();
    this.bindEvents();
  }

  init() {
    this.render();

    // TodoInput
    this.$todoInput = new TodoInput({
      $target: this.$target.querySelector('.todo-input-container'),
      state: {},
      $props: {
        onSubmit: this.onSubmit.bind(this),
      },
    });

    // TodoCount
    this.$todoCount = new TodoCount({
      $target: this.$target.querySelector('.todo-count'),
      state: {
        total: this.totalCount,
        completed: this.completedCount,
      },
    });

    // TodoList
    this.$todoList = new TodoList({
      $target: this.$target.querySelector('.todo-list'),
      state: {
        data: this.state.todoData,
      },
      $props: {
        onDelete: this.onDelete.bind(this),
        onToggle: this.onToggle.bind(this),
      },
    });
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setState(newState) {
    this.state = {...this.state, ...newState};

    this.$todoList.setState({
      data: this.state.todoData,
    });

    this.$todoCount.setState({
      total: this.totalCount,
      completed: this.completedCount,
    });
  }

  template() {
    return `
	  	<div class="todo-input-container"></div>
      <button type="button" class="delete-all">Delete All</button>
      <div class="todo-count"></div>
      <ul class="todo-list"></ul>
	  `;
  }

  // Getters
  get totalCount() {
    return this.state.todoData.length;
  }

  get completedCount() {
    const {todoData} = this.state;

    return todoData.length ? todoData.filter(todo => todo.isCompleted).length : 0;
  }

  //   Events
  bindEvents() {
    this.$target.addEventListener('@delete-all', this.handleDeleteAll.bind(this), false);

    this.$target.addEventListener('click', e => {
      const $eventTarget = e.target;

      if ($eventTarget.classList.contains('delete-all')) {
        const deleteAllEvent = new CustomEvent('@delete-all');
        this.$target.dispatchEvent(deleteAllEvent);
      }
    });
  }

  handleDeleteAll() {
    if (window.confirm('전체 삭제하시겠습니까???')) {
      this.setState({
        todoData: [],
      });
    }
  }

  onSubmit(inputText) {
    this.addTodo(inputText);
  }

  addTodo(inputText) {
    const {todoData} = this.state;

    const id = Math.max(0, ...todoData.map(todo => todo.id)) + 1;

    const newTodoData = [
      ...todoData,
      {
        id,
        text: inputText,
        isCompleted: false,
      },
    ];

    this.setState({
      todoData: newTodoData,
    });
  }

  onDelete(id) {
    const index = this.findTodoIndexById(id);

    if (index < 0) return;

    const {todoData} = this.state;

    const newData = [...todoData.slice(0, index), ...todoData.slice(index + 1)];

    this.setState({
      todoData: newData,
    });
  }

  onToggle(id) {
    const {todoData} = this.state;
    const index = this.findTodoIndexById(id);

    if (index < 0) return;

    const todoItem = todoData[index];

    const newData = [
      ...todoData.slice(0, index),
      {
        id: todoItem.id,
        text: todoItem.text,
        isCompleted: !todoItem.isCompleted,
      },
      ...todoData.slice(index + 1),
    ];

    this.setState({
      todoData: newData,
    });
  }

  findTodoIndexById(id) {
    const {todoData} = this.state;

    if (!todoData.length || id === null || id === undefined) return -1;

    return todoData.findIndex(todo => todo.id === id);
  }
}
