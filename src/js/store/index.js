import Store from './store';

const store = new Store({
  state: {
    todoData: [
      {
        title: '1',
        isCompleted: false,
        id: 1,
      },
    ],
  },
  mutations: {},
  actions: {},
});

export default store;
