<template>
  <div class="input-box">
    <md-field>
      <md-input-item
        placeholder="输入点什么吧！"
        v-model="newTodo"
        @keydown.enter.native="addTodo"
      >
        <div class="icon" slot="left">
          <md-agree
            slot="left"
            size="lg"
            v-model="allChecked"
            v-if="todos.length > 0"
            @change="toggleAll(!allChecked)"
          />
          <md-icon name="right" v-else></md-icon>
        </div>
        <md-button slot="right" size="small" @click="addTodo">确定</md-button>
      </md-input-item>
    </md-field>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoInput',
  data () {
    return {
      newTodo: ''
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    allChecked: {
      get () {
        return this.todos.every(todo => todo.done)
      },
      // 浏览器会报警告，设置set函数去除警告
      set () {}
    }
  },
  methods: {
    ...mapActions([
      'toggleAll'
    ]),
    addTodo () {
      const text = this.newTodo.trim()
      if (text) {
        this.$store.dispatch('addTodo', text)
      }
      this.newTodo = ''
    }
  }
}
</script>

<style scoped>
/* 组件样式 */
.input-box >>> .md-agree-icon.checked .md-agree-icon-container .md-icon-checked,
.input-box >>> .md-agree-icon .md-agree-icon-container .md-icon.md-icon-check {
  color: #4dba87;
}
.input-box >>> .md-button.default.active:active {
  background: #4ab181;
}
.input-box >>> .md-button.default:after {
  border: none;
}
.md-button {
  color: #fff;
  background: #4dba87;
}
/* 自身样式 */
.input-box {
  padding: 0 0.32rem;
}
</style>
