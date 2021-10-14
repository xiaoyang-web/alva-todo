<template>
  <div class="home">
    <todo-header title="TODO-LIST"/>
    <todo-input/>
    <todo-list/>
    <todo-footer/>
  </div>
</template>

<script>
import TodoHeader from '../components/TodoHeader.vue'
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'
import TodoFooter from '../components/TodoFooter.vue'

export default {
  name: 'Home',
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
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
