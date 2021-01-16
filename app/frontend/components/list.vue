<template>

  <div class="list">
    <h2 class="header">{{ list.name }}</h2>

    <div class="deck">
      <Card v-for="card in cards" :key="card.id" :card="card"></Card>

      <div class="input-area">
        <button v-show="!editing" @click="toggleEdit" class="button bg-gray-400 mt-2 mb-2">新增卡片</button>

        <template v-if="editing">
          <textarea v-model="content" class="content"></textarea>
          <button @click="createCard" class="button bg-green-400 mt-4 mb-2">建立卡片</button>
          <button @click="toggleEdit" class="button bg-gray-400">取消</button>  
        </template>
      </div>
    </div>

  </div>
    
</template>


<script>
import Rails from '@rails/ujs';
import Card from 'components/card';

export default {
  name: 'List',
  components: {
    Card
  },
  props: ["list"],
  data: function(){
    return {
      content: '',
      cards: this.list.cards,
      editing: false
    }
  },
  methods: {
    toggleEdit(){
      this.editing = !this.editing
    },
    createCard(e){
      e.preventDefault();

      let data = new FormData();
      data.append("card[list_id]", this.list.id)
      data.append("card[name]", this.content)
      Rails.ajax({
        url: '/cards',
        type: 'POST',
        data,
        dataType: 'json',
        success: res => {
          this.cards.push(res);
          this.content = ''
          this.toggleEdit()
        },
        error: err => {
          console.log(err);
        }
      })
    }
  },
}
</script>


<style lang="scss" scoped>
.list {
  @apply px-3 py-1 bg-gray-300 mx-2 w-64 rounded;

  .header {
    @apply font-bold
  }

  .deck {
    @apply mt-2;
  }

  .input-area {
    @apply mt-4;
    .content {
      @apply w-full p-2 rounded-sm;
      &:focus {
        @apply outline-none;
      }
    }

    .button {
      @apply px-3 py-1 font-semibold text-sm rounded;

      &:focus {
        @apply outline-none;
      }
    }
  }
}


</style>