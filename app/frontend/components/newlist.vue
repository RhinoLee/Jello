<template>
  <div class="container">
    <button @click="newList" class="new_button" v-show="!creatingList">
      <i class="fas fa-plus"></i> 新增其它列表
    </button>

    <template v-if="creatingList">
      <input type="text" ref="list_name" v-model="list_name" class="list_name" placeholder="列表標題">
      <button @click="createList" class="button create_button">建立</button>
      <button @click="creatingList = false" class="button cancel_button">取消</button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Newlist',
  data: function(){
    return {
      creatingList: false,
      list_name: ''
    }
  },
  methods: {
    newList(e){
      e.preventDefault();
      this.creatingList = true;

      this.$nextTick(() => {
        this.$refs.list_name.focus()
      })
    },
    createList(e){
      e.preventDefault();

      this.$store.dispatch('createList', this.list_name)

      this.creatingList = false;
      this.list_name = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.new_button {
  @apply .font-bold .w-full .text-left;

  &:focus {
    @apply .outline-none;
  }
}

.list_name {
  @apply .rounded .w-full .px-3 .py-2 .mb-2;

  &:focus {
    @apply .outline-none;
  }
}

.button {
  @apply .px-3 .py-1 .rounded .font-bold .text-sm;

  &:focus {
    @apply .outline-none;
  }
}

.create_button {
  @apply .bg-gray-400;
}

.cancel_button {
  @apply .bg-white;
}

.container {
  @apply .bg-gray-300 .px-3 .py-2 .mx-2 .w-64 .h-full .rounded .flex-none;
}
</style>