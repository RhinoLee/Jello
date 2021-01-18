import Vue from 'vue/dist/vue.esm';
import Vuex from 'vuex';
import Rails from '@rails/ujs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: []
  },
  getters: {
    lists: state => state.lists
  },
  mutations: {
    setLists(state, lists){
      state.lists = lists
    },
    setCard(state, card) {
      let list = state.lists.filter(list => list.id === card.list_id)[0]
      let oldCard = list.cards.filter(item => item.id === card.id)[0]

      oldCard.name = card.name
    },
    addList(state, list) {
      state.lists.push(list)
    },
    removeList(state, list_id){
      let list_index = state.lists.findIndex(list => list.id === list_id)
      state.lists.splice(list_index, 1)
    }
  },
  actions: {
    moveList({ commit }, e){
      let data = new FormData();
      data.append("list[position]", e.moved.newIndex + 1)

      Rails.ajax({
        url: `/lists/${ e.moved.element.id }/move`,
        type: 'PUT',
        data,
        dataType: 'json',
      })
    },
    loadList({ commit }){
      Rails.ajax({
        url: '/lists.json',
        type: 'GET',
        dataType: 'json',
        success: res => {
          commit('setLists', res)
        },
        error: err => {
          console.log(err);
        }
      })
    },
    updateCard({ commit }, { id, name }) {
      let data = new FormData()
      data.append("card[name]", name)

      Rails.ajax({
        url: `/cards/${id}`,
        type: 'PUT',
        data,
        dataType: 'json',
        error: err => {
          console.log(err);
        }
      })
    },
    createList({ commit }, list_name) {
      let data = new FormData();
      data.append("list[name]", list_name);

      Rails.ajax({
        url: '/lists',
        type: 'POST',
        data,
        dataType: 'json',
        error: err => {
          console.log(err);
        }
      })
    },
    removeList({ commit }, list_id) {
      Rails.ajax({
        url: `/lists/${list_id}`,
        type: 'DELETE',
        dataType: 'json',
        error: err => {
          console.log(err);
        }
      })
    }
  }
})