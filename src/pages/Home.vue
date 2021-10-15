<template>
  <div class="home">
    <todo-header />
    <todo-input />
    <todo-list />
    <todo-clear-btn />
    <todo-footer />
  </div>
</template>

<script>
import TodoHeader from '../components/TodoHeader.vue'
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'
import TodoClearBtn from '../components/TodoClearBtn.vue'
import TodoFooter from '../components/TodoFooter.vue'

export default {
  name: 'Home',
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoClearBtn,
    TodoFooter
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
