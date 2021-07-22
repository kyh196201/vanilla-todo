import * as api from '../api/';

export default {
  // delete todo item
  async deleteTodo(context, id) {
    await api.deleteTodo(id);

    return await context.dispatch('fetchTodos');
  },

  // fetch todo itmes
  async fetchTodos(context) {
    const result = await api.fetchTodos();

    return context.commit('setTodos', result);
  },

  // add todo item
  async createTodo(context, todoData) {
    const result = await api.createTodo(todoData);

    return await context.dispatch('fetchTodos');
  },
};
