<template>
  <div class="list">
    <transition name="fade" mode="out-in">
      <div class="list-main" key="main" v-if="todos.length > 0">
        <div class="list-operation">
          <md-notice-bar icon="info">
            <p>共计 {{ censusTodo.allNum }} 条事项，剩余 {{ censusTodo.activeNum }} 条未完成</p>
          </md-notice-bar>
          <md-tab-bar ref="tabs" immediate :has-ink="false" v-model="current" :items="items" @change="tabChange"/>
        </div>
        <div class="list-content">
          <md-field v-if="filteredTodos.length > 0">
            <template v-for="(todo, index) in filteredTodos">
              <todo-item :todo="todo" :key="todo.uid" :noborder="index === filteredTodos.length - 1"></todo-item>
            </template>
          </md-field>
          <md-result-page img-url="./static/norecord.svg" v-else text="暂无记录"></md-result-page>
        </div>
      </div>
      <div class="list-empty" key="empty" v-else>
        <md-result-page img-url="./static/nothing.svg" text="没有记录啦，动手写点吧！"></md-result-page>
      </div>
    </transition>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  name: 'TodoList',
  data () {
    return {
      current: 1,
      items: [{
        name: 1,
        label: '全部',
        link: 'all'
      }, {
        name: 2,
        label: '进行中',
        link: 'active'
      }, {
        name: 3,
        label: '已完成',
        link: 'completed'
      }],
      editing: false
    }
  },
  components: {
    TodoItem
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    visibility () {
      return this.$route.params.filter
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    censusTodo () {
      const obj = {}
      obj.activeNum = filters.active(this.todos).length
      obj.allNum = filters.all(this.todos).length
      return obj
    }
  },
  methods: {
    tabChange (item) {
      const link = item.link
      if (this.visibility === link) return
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>
.md-notice-bar { color: #4dba87; }
.md-tab-bar { padding: 0; }
.list >>> .md-tab-bar-item.is-active {
  background: #4dba87;
  color: #fff;
}
.list >>> .md-result-text {
  color: #4dba87;
}

.list {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.32rem;
  font-size: .28rem;
  overflow: hidden;
}
.list-content {
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
}
.list-main,
.list-empty {
  height: 100%;
}
.list-main {
  display: flex;
  flex-direction: column;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
