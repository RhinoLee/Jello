require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

const images = require.context('../images', true)
const imagePath = (name) => images(name, true)

import 'scripts'
import 'styles'


// Vue.js
import Rails from '@rails/ujs';
import draggable from 'vuedraggable';
import Vue from 'vue/dist/vue.esm';
import List from 'components/list';
import Newlist from 'components/newlist';
import store from 'stores/list';



document.addEventListener('turbolinks:load', function(e){

  let el = document.querySelector('#board')

  if (el) {
    new Vue({
      components: {
        List,
        draggable,
        Newlist
      },
      el,
      store,
      computed: {
        lists: {
          get(){
            return this.$store.getters.lists
          },
          set(val){
            this.$store.commit('setLists', val)
          }
        }
      },
      methods: {
        listMoved(e){
          this.$store.dispatch('moveList', e)
        }
      },
      created() {
        this.$store.dispatch('loadList')
      }

    })
  }

})