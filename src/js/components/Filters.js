import Component from 'Core/Component';

// Utils
import {capitalizeFirstLetter} from 'Utils/helpers';

export default class Filters extends Component {
  setup() {
    this.filterData = ['all', 'active', 'completed'];
    this.sortData = [
      {
        title: 'oldest',
        value: 'desc',
      },
      {
        title: 'newest',
        value: 'asc',
      },
    ];
  }

  createElement() {
    this.$el = document.createElement('section');
    this.$el.className = 'todo-filters';

    this.$filterList = document.createElement('div');
    this.$filterList.className = 'filter-list';

    this.$sortList = document.createElement('div');
    this.$sortList.className = 'sort-list';

    this.$el.appendChild(this.$filterList);
    this.$el.appendChild(this.$sortList);

    this.$target.appendChild(this.$el);
  }

  // 필터 아이템 템플릿
  filterItemTemplate(value) {
    const {filter} = this.$store.state.filters;

    const className = value === filter ? 'active' : '';

    return `
        <button type="button" class="filter ${className}" data-value="${value}">
            ${capitalizeFirstLetter(value)}
        </button>
    `;
  }

  // 정렬 아이템 템플릿
  sortItemTemplate({title, value}) {
    const {sortBy} = this.$store.state.filters;

    const className = value === sortBy ? 'active' : '';

    return `
        <button type="button" class="sort ${className}" data-value="${value}">
            ${capitalizeFirstLetter(title)}
        </button>
    `;
  }

  // 필터 리스트 템플릿
  filterListTemplate() {
    return this.filterData
      .map(filter => this.filterItemTemplate(filter))
      .join('');
  }

  // 정렬 리스트 템플릿
  sortListTemplate() {
    return this.sortData.map(sort => this.sortItemTemplate(sort)).join('');
  }

  render() {
    this.$filterList.innerHTML = this.filterListTemplate();
    this.$sortList.innerHTML = this.sortListTemplate();
  }

  handleClickFilter(e) {
    const $target = e.target;
    const $filterBtn = $target.closest('.filter');

    if (!$filterBtn) return false;

    const {value} = $filterBtn.dataset;

    // mutation
    this.$store.commit('setFilter', value);
    this.$store.dispatch('fetchTodos');
    return true;
  }

  handleClickSort(e) {
    const $target = e.target;
    const $sortBtn = $target.closest('.sort');

    if (!$sortBtn) return false;

    const {value} = $sortBtn.dataset;

    // mutation
    this.$store.commit('setSortBy', value);
    this.$store.dispatch('fetchTodos');
    return true;
  }

  bindEvents() {
    // 필터 클릭 이벤트
    this.$filterList.addEventListener(
      'click',
      this.handleClickFilter.bind(this),
    );
    // 정렬 클릭 이벤트
    this.$sortList.addEventListener('click', this.handleClickSort.bind(this));
  }
}

/**
 * 1. 스토어에 필터 객체 생성, 선택된 필터 값과 정렬 값을 설정한다.
 * 2. 초기값은 filter: 'all' sortBy: 'desc' -> 내림 차순
 * 3. filter 컴포넌트를 렌더링한다.
 * 4. filters = [], sorts = [], 데이터 배열을 생성하고, 이를 통해서 filter, sort영역을 렌더링한다.
 * 5. filter, sort에 클릭 이벤트를 설정, 각 값을 선택할 때마다 선택된 filter와 sorts를 변경한다.
 * 6. filters의 setup훅에서 렌더링에 필요한 데이터를 설정한다.
 * 7. 렌더링할 때 선택된 필터와 정렬 값이 같은 경우 active 클래스를 추가한다.
 * 8. sort, filter 각각 렌더링하는 함수를 만들고, 각각 이벤트 전파를 이용해서 이벤트를 설정한다.
 * 9. filter, sort를 변경하면 fetchTodos를 호출하는데, 이때 파라미터를 전달해야한다.
 * 10. 파라미터에 대한 부분은 생각할 필요가 있음
 * 11. 왜냐하면 나중에 달력을 넣어서 날짜별로 데이터를 가져와야하기 때문
 * 12. 필터, 날짜 + 정렬
 * 13. 우선 색인을 해결해야함
 */
