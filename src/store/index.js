import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: {},
  },
  getters: {},
  mutations: {
    CHANGE_POSTS(state, payload) {
      state.posts = payload;
    },
  },
  actions: {
    changePosts(context, payload) {
      context.commit('CHANGE_POSTS', payload);
    },
  },
  modules: {},
});
