// firestore
import * as api from '@/js/firebase/database';

export default {
  // delete todo item
  async deleteTodo(context, id) {
    const result = await api.deleteTodo(id);
    await context.dispatch('fetchTodos');

    return result;
  },

  // fetch todo itmes
  async fetchTodos(context) {
    context.dispatch('startLoading');

    // filter, sort
    const {date, filters} = context.state;
    const filter = {
      ...filters,
      date,
    };

    const result = await api.fetchTodo(filter);

    context.commit('setTodos', result);
    context.dispatch('stopLoading');

    return true;
  },

  // add todo item
  async createTodo(context, title) {
    context.dispatch('startLoading');

    await api.createTodo(title);
    await context.dispatch('fetchTodos');

    context.dispatch('stopLoading');

    return true;
  },

  async updateTodo(context, {id, todoData}) {
    context.dispatch('startLoading');
    await api.updateTodo(id, todoData);
    await context.dispatch('fetchTodos');

    if (context.state.editingId) {
      context.dispatch('stopEdit');
    }

    context.dispatch('stopLoading');

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

  startLoading(context) {
    context.commit('setLoading', true);
  },

  stopLoading(context) {
    context.commit('setLoading', false);
  },
};
