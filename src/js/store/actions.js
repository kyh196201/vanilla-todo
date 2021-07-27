import * as api from '../api';

export default {
  // delete todo item
  async deleteTodo(context, id) {
    await api.deleteTodo(id);
    await context.dispatch('fetchTodos');

    return true;
  },

  // fetch todo itmes
  async fetchTodos(context) {
    const result = await api.fetchTodos();

    return context.commit('setTodos', result);
  },

  // add todo item
  async createTodo(context, todoData) {
    await api.createTodo(todoData);
    await context.dispatch('fetchTodos');

    return true;
  },

  async updateTodo(context, {id, todoData}) {
    await api.updateTodo(id, todoData);
    await context.dispatch('fetchTodos');

    return true;
  },

  //
  changeTab(context, tab) {
    context.commit('changeTab', tab);
  },
};
