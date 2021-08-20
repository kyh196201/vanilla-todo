export default {
  date: new Date().setHours(0, 0, 0, 0),
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
