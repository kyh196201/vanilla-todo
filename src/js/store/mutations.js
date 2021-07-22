export default {
  setTodos(state, todos = []) {
    state.todoData = todos;

    return state;
  },
};
