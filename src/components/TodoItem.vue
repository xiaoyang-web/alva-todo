<template>
  <div class="todo-item">
    <md-cell-item :no-border="noborder">
      <md-agree
        slot="left"
        size="lg"
        v-model="todo.done"
        @change="toggleTodo(todo)"
      />
      <md-input-item
        ref="todoInput"
        v-model="todo.text"
        v-if="editing === true"
        slot="default"
        @blur="doneEdit"
        @keydown.enter.native="doneEdit"
      />
      <p
        class="todo-value"
        :class="{'todo-done': todo.done}"
        slot="default"
        v-else
        @click="handleClick"
      >{{ todo.text }}</p>
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
    doneEdit () {
      const { todo } = this
      const value = todo.text
      if (!value) {
        this.removeTodo(todo)
        return
      }
      this.editTodo({ todo, value })
      this.editing = false
    },
    handleClick () {
      this.todo.done = !this.todo.done
      this.toggleTodo(this.todo)
    }
  }
}
</script>

<style scoped>
/* 组件样式 */
.todo-item >>> .md-agree-icon.checked .md-agree-icon-container .md-icon-checked,
.todo-item >>> .md-agree-icon .md-agree-icon-container .md-icon.md-icon-check {
  color: #4dba87;
}
.todo-item >>> .md-cell-item-content {
  font-size: 0.28rem;
}
.todo-item >>> .md-field-item-content {
  min-height: 0.5rem;
}
.todo-item >>> .md-input-item-input {
  padding-left: 0;
  padding-right: 0;
  font-size: 0.28rem;
  height: 0.5rem;
}
/* 自身样式 */
.todo-item .todo-value {
  word-break: break-all;
}
.todo-item .todo-value.todo-done {
  color: #4dba87;
  text-decoration: line-through;
}
.todo-item .todo-options {
  display: flex;
  justify-content: space-between;
  width: 1rem;
  color: #4dba87;
}
</style>
