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

    if (context.state.editingId) {
      context.dispatch('stopEdit');
    }

    return true;
  },

  startEdit(context, id) {
    const todoItem = context.state.todoData.find(todo => todo.id === id);
    if (todoItem) {
      context.commit('setEditId', id);
      context.commit('setBeforeEditValue', todoItem.title);
    }
  },

  stopEdit(context) {
    context.commit('setEditId', null);
    context.commit('setBeforeEditValue', '');
  },

  //
  changeTab(context, tab) {
    context.commit('changeTab', tab);
  },
};
