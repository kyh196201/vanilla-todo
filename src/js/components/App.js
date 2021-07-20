import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoCount from './TodoCount';
import Tabs from './Tabs';
import * as api from '../api/index.js';

const tag = 'app';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.state = {
      todoData: [],
      isLoading: false,
      activeTab: 'list',
      tabs: ['list', 'calendar'],
    };

    this.init();
  }

  createElement() {
    const $el = document.createElement('div');
    $el.className = 'todo-app';

    this.$el = $el;
    this.$target.appendChild($el);
  }

  init() {
    this.validate();
    this.createElement();
    this.bindEvents();

    this.$tabs = new Tabs({
      $target: this.$el,
      state: {
        tabs: this.state.tabs,
        activeTab: this.activeTab,
      },
    });

    // TodoInput
    this.$todoInput = new TodoInput({
      $target: this.$el,
      state: {},
      $props: {
        onSubmit: this.onSubmit.bind(this),
      },
    });

    // TodoCount
    this.$todoCount = new TodoCount({
      $target: this.$el,
      state: {
        total: this.totalCount,
        completed: this.completedCount,
      },
    });

    // TodoList
    this.$todoList = new TodoList({
      $target: this.$el,
      state: {
        data: this.state.todoData,
      },
      $props: {
        onDelete: this.onDelete.bind(this),
        onToggle: this.onToggle.bind(this),
      },
    });

    this.fetchData();
  }

  validate() {}

  setState(newState) {
    this.state = {...this.state, ...newState};

    this.$todoList.setState({
      data: this.state.todoData,
    });

    this.$todoCount.setState({
      total: this.totalCount,
      completed: this.completedCount,
    });

    this.$tabs.setState({
      activeTab: this.activeTab,
    });
  }

  // Getters
  get totalCount() {
    return this.state.todoData.length;
  }

  get completedCount() {
    const {todoData} = this.state;

    return todoData.length ? todoData.filter(todo => todo.isCompleted).length : 0;
  }

  get activeTab() {
    return this.state.activeTab;
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
    this.$el.addEventListener('@delete-all', this.handleDeleteAll.bind(this), false);

    this.$el.addEventListener('click', e => {
      const $eventTarget = e.target;

      if ($eventTarget.classList.contains('delete-all')) {
        const deleteAllEvent = new CustomEvent('@delete-all');
        this.$el.dispatchEvent(deleteAllEvent);
      }
    });
  }

  handleDeleteAll() {
    if (window.confirm('전체 삭제하시겠습니까???')) {
      alert('개발 중');
      // this.setState({
      //   todoData: [],
      // });
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
