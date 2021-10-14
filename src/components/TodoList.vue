<template>
  <div class="list">
    <div class="list-operation">
      <md-notice-bar icon="volumn">剩余0条未完成</md-notice-bar>
      <md-tab-bar immediate :has-ink="false" v-model="current" :items="items" @change="tabChange"/>
    </div>
    <div class="list-content">
      <md-field v-if="filteredTodos.length > 0">
        <template v-for="todo in filteredTodos">
          <md-cell-item :title="todo.text" :key="todo.uid">
            <md-agree
              slot="left"
              size="lg"
              v-model="todo.done"/>
            <md-icon slot="right" name="close"></md-icon>
          </md-cell-item>
        </template>
      </md-field>
      <md-result-page v-else text="暂无记录"></md-result-page>
    </div>
  </div>
</template>

<script>
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
      agreeConf: {
        name: 'agree1',
        checked: false,
        size: 'lg'
      }
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
.list {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.32rem;
  font-size: .32rem;
  overflow: hidden;
  /* background: skyblue; */
}
.md-notice-bar {
  color: #4dba87
}
.md-tab-bar {
  padding: 0;
}
.list >>> .md-tab-bar-item.is-active {
  background: #4dba87;
  color: #fff;
}
.list-content {
  flex: 1;
  overflow: auto;
}
</style>
