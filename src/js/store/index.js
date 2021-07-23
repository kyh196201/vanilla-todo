import Store from './store';
import state from './state';
import mutations from './mutations';
import actions from './actions';

const store = new Store({
  state,
  mutations,
  actions,
});

export default store;
