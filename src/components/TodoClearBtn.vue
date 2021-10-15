<template>
  <div class="clear-btn">
    <md-button
      round
      type="default"
      size="small"
      v-show="todos.length > remaining"
      @click="clear"
    >清除已完成</md-button>
    <md-dialog
      title="确认删除？"
      :closable="false"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
      :append-to="model"
    >
    </md-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoClearBtn',
  data () {
    return {
      basicDialog: {
        open: false,
        btns: [
          {
            text: '取消',
            handler: this.onCancel
          },
          {
            text: '确认',
            handler: this.onConfirm
          }
        ]
      }
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    },
    model () {
      return document.querySelector('.model')
    }
  },
  methods: {
    ...mapActions(['clearCompleted']),
    clear () {
      this.basicDialog.open = true
    },
    onCancel () {
      this.basicDialog.open = false
    },
    onConfirm () {
      this.clearCompleted()
      this.basicDialog.open = false
    }
  }
}
</script>

<style scoped>
/* 组件样式 */
.clear-btn >>> .md-dialog-btn:last-child {
  color: #4ab181;
}
.clear-btn >>> .md-button.default.active:active {
  background: #4ab181;
}
.clear-btn >>> .md-button.default:after {
  border: none;
}
.clear-btn >>> .md-dialog-title {
  font-size: 0.28rem;
  margin: 0;
}
.clear-btn >>> .md-dialog-btn {
  font-size: 0.28rem;
}
.md-button {
  color: #fff;
  background: #4dba87;
}
/* 自身样式 */
.clear-btn {
  display: flex;
  align-items: center;
  height: 1rem;
  padding: 0 0.32rem 0.5rem;
}
</style>
