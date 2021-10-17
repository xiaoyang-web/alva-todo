<template>
  <div class="list">
    <transition name="fade" mode="out-in">
      <div class="list-main" style="animation-duration: 0.3s" key="list-main" v-if="todos.length > 0">
        <div>
          <md-notice-bar icon="info">
            <p>
              共计 {{ censusTodo.allNum }} 条事项，
              剩余 {{ censusTodo.activeNum }} 条未完成
            </p>
          </md-notice-bar>
          <md-tab-bar
            immediate
            ref="tabs"
            v-model="current"
            :has-ink="false"
            :items="items"
            @change="tabChange"
          />
        </div>
        <div class="list-content">
          <md-field v-if="filteredTodos.length > 0">
            <transition-group name="fade">
              <template v-for="(todo, index) in filteredTodos">
                <todo-item
                  :todo="todo"
                  :key="todo.uid"
                  :noborder="index === filteredTodos.length - 1"
                  style="animation-duration: 0.3s"
                />
              </template>
            </transition-group>
          </md-field>
          <md-result-page
            text="暂无记录"
            img-url="./static/norecord.svg"
            v-else
          />
        </div>
      </div>
      <div class="list-empty" style="animation-duration: 0.3s" key="list-empty" v-else>
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
      editing: false,
      items: [
        {
          name: 1,
          label: '全部',
          link: 'all'
        },
        {
          name: 2,
          label: '进行中',
          link: 'active'
        },
        {
          name: 3,
          label: '已完成',
          link: 'completed'
        }
      ]
    }
  },
  components: {
    TodoItem
  },
  watch: {
    $route: function () {
      const currentRoute = this.items.find(item => item.link === this.$route.params.filter)
      this.tabChange(currentRoute)
    }
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
      return {
        activeNum: filters.active(this.todos).length,
        allNum: filters.all(this.todos).length
      }
    }
  },
  methods: {
    tabChange (item) {
      this.current = item.name
      const link = item.link
      if (this.visibility === link) return
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>
/* 组件样式 */
.list >>> .md-tab-bar-item.is-active {
  background: #4dba87;
  color: #fff;
}
.list >>> .md-result-text,
.list >>> .md-tab-bar-item,
.md-notice-bar {
  color: #4dba87;
}
.md-tab-bar {
  padding: 0;
}
/* 自身样式 */
.list {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.32rem;
  font-size: .28rem;
  overflow: hidden;
}
.list .list-main,
.list .list-empty {
  height: 100%;
}
.list .list-main {
  display: flex;
  flex-direction: column;
}
.list .list-main .list-content {
  flex: 1;
  overflow: auto;
  background: #fff;
}
</style>
