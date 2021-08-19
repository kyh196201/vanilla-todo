export default {
  date: new Date(),
  // todo data
  todoData: [],

  editingId: null,
  valueBeforeEdit: '',
  loading: false,
  // tabs
  activeTab: 'list',
  tabs: ['list', 'calendar'],

  // filters
  filters: {
    filter: 'all',
    sortBy: 'desc',
  },
};
