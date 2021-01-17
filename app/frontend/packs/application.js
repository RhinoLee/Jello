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



document.addEventListener('turbolinks:load', function(e){

  let el = document.querySelector('#board')

  if (el) {
    new Vue({
      components: {
        List,
        draggable
      },
      el,
      data: {
        lists: []
      },
      methods: {
        listMoved(e){

          let data = new FormData();
          data.append("list[position]", e.moved.newIndex + 1)

          Rails.ajax({
            url: `/lists/${ e.moved.element.id }/move`,
            type: 'PUT',
            data,
            dataType: 'json',
            success: res => {
              console.log(res);
            },
            error: err => {
              console.log(err);
            }
          })
        }
      },
      created() {
        Rails.ajax({
          url: '/lists.json',
          type: 'GET',
          dataType: 'json',
          success: res => {
            this.lists = res
          },
          error: err => {
            console.log(err);
          }
        })
      }

    })
  }

})