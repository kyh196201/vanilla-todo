export default {
  setTodos(state, todos = []) {
    state.todoData = todos;

    return state;
  },

  changeTab(state, tabName) {
    state.activeTab = tabName;

    return state;
  },

  setEditId(state, id) {
    state.editingId = id;

    return state;
  },

  setBeforeEditValue(state, value) {
    state.valueBeforeEdit = value;

    return state;
  },

  setLoading(state, loading) {
    state.loading = loading;

    return state;
  },
};
