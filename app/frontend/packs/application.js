require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

const images = require.context('../images', true)
const imagePath = (name) => images(name, true)

import 'scripts'
import 'styles'


// Vue.js
import Vue from 'vue/dist/vue.esm'

document.addEventListener('turbolinks:load', function(e){

  let el = document.querySelector('#board')

  if (el) {
    new Vue({
      el,
      data: {
        lists: JSON.parse(el.dataset.lists)
      }

    })
  }

})