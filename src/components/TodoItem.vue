<template>
  <div class="todo-item">
    <md-cell-item :no-border="noborder">
      <md-agree
        slot="left"
        size="lg"
        v-model="todo.done"
        @change="toggleTodo(todo)"/>
      <md-input-item ref="todoInput" v-model="todo.text" v-if="editing === true" slot="default" @blur="doneEdit"></md-input-item>
      <p :class="{done: todo.done}" slot="default" v-else class="todo-value">{{ todo.text }}</p>
      <div slot="right" class="todo-options">
        <md-icon name="edit" size="lg" @click="changeEditing"></md-icon>
        <md-icon name="delete" size="lg" @click="removeTodo(todo)"></md-icon>
      </div>
    </md-cell-item>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoItem',
  props: {
    todo: Object,
    noborder: Boolean
  },
  data () {
    return {
      editing: false
    }
  },
  methods: {
    ...mapActions(['editTodo', 'toggleTodo', 'removeTodo']),
    changeEditing () {
      this.editing = true
      this.$nextTick(() => {
        this.$refs.todoInput.focus()
      })
    },
    doneEdit (e) {
      const { todo } = this
      const value = todo.text
      if (!value) {
        this.removeTodo(todo)
        return
      }
      this.editTodo({
        todo,
        value
      })
      this.editing = false
    }
  }
}
</script>

<style scoped>
.todo-item >>> .md-cell-item-content { font-size: inherit; }
.todo-item >>> .md-agree-icon.checked .md-agree-icon-container .md-icon-checked {
  color: #4dba87;
}
.todo-item >>> .md-agree-icon .md-agree-icon-container .md-icon.md-icon-check {
  color: #4dba87;
}
.md-input-item {
  height: 0.5rem;
}
.todo-item >>> .md-input-item-input {
  padding-left: 0;
  padding-right: 0;
  font-size: 0.28rem;
  height: 0.5rem;
}
.todo-item >>> .md-field-item-content {
  min-height: 0.5rem;
}
.todo-item .todo-value {
  word-break: break-all;
}
.todo-options {
  display: flex;
  justify-content: space-between;
  width: 100px;
}
.done {
  color: #4dba87;
  text-decoration: line-through;
}
</style>
