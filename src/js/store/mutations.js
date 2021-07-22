export default {
  setTodos(state, todos = []) {
    const newState = {
      ...state,
      todoData: todos,
    };

    return newState;
  },
};
