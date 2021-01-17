<template>
  <div>
    <div class="card" @click="editing='true' ">
      {{ card.name }}
    </div>

    <div v-show="editing" class="dialog">
      <div class="inner">
        <a href="#" class="closeBtn" @click="close">
          <i class="fas fa-times"></i>
        </a>
        <textarea v-model="card_name" class="content"></textarea>
        <button @click="update" class="updateBtn">更新</button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['card'],
  data: function(){
    return {
      editing: false,
      card_name: this.card.name
    }
  },
  methods: {
    close(e){
      e.preventDefault();
      this.editing = false
    },
    update(e){
      e.preventDefault();
      
      this.$store.dispatch('updateCard', { id: this.card.id, name: this.card_name })

      this.editing = false
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @apply bg-gray-100 mb-2 rounded-sm px-2 py-2 cursor-pointer
}

.dialog {
  background-color: rgba(#000, .7);
  @apply fixed flex items-center justify-center w-full h-full top-0 left-0;

  .inner {
    @apply bg-white flex flex-col px-6 py-2;
    width: 700px;

    .content {
      @apply mt-2 px-2 py-2 border border-gray-300;
      &:focus {
        @apply outline-none;
      }
    }

    .updateBtn {
      @apply bg-gray-400 mt-2 px-3 py-2 rounded;
      &:focus {
        @apply outline-none;
      }
    }

    .closeBtn {
      @apply text-gray-800 text-right;
    }
  }
  
}



</style>