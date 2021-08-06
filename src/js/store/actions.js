import todoModel from '@/js/model';

export default {
  // delete todo item
  async deleteTodo(context, id) {
    await todoModel.delete(id);
    await context.dispatch('fetchTodos');

    return true;
  },

  // fetch todo itmes
  async fetchTodos(context) {
    context.dispatch('startLoading');
    const result = await todoModel.read();
    context.commit('setTodos', result.data.todoList);
    context.dispatch('stopLoading');

    return true;
  },

  // add todo item
  async createTodo(context, todoData) {
    context.dispatch('startLoading');
    await todoModel.add(todoData);
    await context.dispatch('fetchTodos');
    context.dispatch('stopLoading');

    return true;
  },

  async updateTodo(context, {id, todoData}) {
    context.dispatch('startLoading');
    await todoModel.update(id, todoData);
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
