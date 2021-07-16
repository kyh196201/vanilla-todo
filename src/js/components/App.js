import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoCount from './TodoCount';
import * as api from '../api/index.js';

const tag = 'app';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.state = {
      todoData: [],
    };

    this.validate();
    this.render();
    this.mounted();
  }

  mounted() {
    this.init();
  }

  init() {
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

    this.bindEvents();

    this.fetchData();
  }

  validate() {}

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

  // Api
  async fetchData() {
    const data = await api.fetchTodo();

    this.setState({
      todoData: data,
    });
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

  onSubmit(title) {
    this.createTodoItem(title);
  }

  async createTodoItem(title) {
    const todoData = {
      title,
      isCompleted: false,
    };

    const result = await api.createTodo(todoData);

    this.fetchData();
  }

  // TODO 삭제
  addTodo(title) {
    const {todoData} = this.state;

    const id = Math.max(0, ...todoData.map(todo => todo.id)) + 1;

    const newTodoData = [
      ...todoData,
      {
        id,
        title,
        isCompleted: false,
      },
    ];

    this.setState({
      todoData: newTodoData,
    });
  }

  async onDelete(id) {
    const result = await api.deleteTodo(id);

    this.fetchData();
  }

  async onToggle(id) {
    const {todoData} = this.state;
    const todoItem = todoData.find(todo => todo.id === id);

    const result = await api.updateTodo(id, {
      isCompleted: !todoItem.isCompleted,
    });

    this.fetchData();
  }
}
