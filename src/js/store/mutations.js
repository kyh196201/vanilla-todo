export default {
  setTodos(state, todos = []) {
    state.todoData = todos;

    return state;
  },

  changeTab(state, tabName) {
    state.activeTab = tabName;

    return state;
  },
};
