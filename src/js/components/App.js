import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoCount from './TodoCount';
import Tabs from './Tabs';
import Store from '../store/store';

export default class App {
  constructor(params) {
    this.$target = params.$target;

    if (params.store instanceof Store) {
      this.$store = params.store;

      this.$store.events.subscribe('stateChange', () => {
        this.render.call(this);
      });
    }

    this.init();
  }

  createElement() {
    const $el = document.createElement('div');
    $el.className = 'todo-app';

    const $header = document.createElement('header');
    $header.className = 'todo-header';

    const $body = document.createElement('section');
    $body.className = 'todo-body';

    // todo-content
    const $todoContent = document.createElement('section');
    $todoContent.className = 'todo-content';

    // calendar-container
    const $calendarContainer = document.createElement('section');
    $calendarContainer.className = 'calendar-container';

    $body.appendChild($todoContent);
    $body.appendChild($calendarContainer);

    $el.appendChild($header);
    $el.appendChild($body);

    this.$header = $header;
    this.$body = $body;
    this.$todoContent = $todoContent;
    this.$calendarContainer = $calendarContainer;
    this.$el = $el;
    this.$target.appendChild($el);
  }

  async init() {
    this.validate();
    this.createElement();
    await this.fetchData();
    this.initChildComponents();
    this.render();
    this.bindEvents();
  }

  validate() {
    return this;
  }

  // 컴포넌트 생성
  initChildComponents() {
    this.$tabs = new Tabs({
      $target: this.$header,
      store: this.$store || null,
    });

    // TodoInput
    this.$todoInput = new TodoInput({
      $target: this.$todoContent,
      store: this.$store || null,
      isStable: true,
    });

    // TodoCount
    this.$todoCount = new TodoCount({
      $target: this.$todoContent,
      store: this.$store || null,
    });

    // TodoList
    this.$todoList = new TodoList({
      $target: this.$todoContent,
      store: this.$store || null,
    });
  }

  // Api
  async fetchData() {
    await this.$store.dispatch('fetchTodos');

    return true;
  }

  render() {
    const {activeTab} = this.$store.state;

    this.$todoContent.classList.remove('hide');
    this.$calendarContainer.classList.remove('hide');

    if (activeTab === 'list') {
      this.$calendarContainer.classList.add('hide');
    } else if (activeTab === 'calendar') {
      this.$todoContent.classList.add('hide');
    }
  }

  // Events
  bindEvents() {
    this.$el.addEventListener(
      '@delete-all',
      this.handleDeleteAll.bind(this),
      false,
    );

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
      alert('개발 중인 기능입니다.');
    }

    return true;
  }
}
