<template>
  <div class="footer">
    <p class="desc">一个简单的todolist</p>
    <p class="project-link">
      <a href="https://github.com/xiaoyang-web/alva-todo" target="_blank">View on GitHub</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'TodoFooter'
}
</script>

<style scoped>
.footer {
  text-align: center;
  font-size: 0.24rem;
  color: #4dba87;
}
.footer p {
  margin-bottom: 0.12rem;
}
.footer .project-link a {
  color: #4dba87;
}
</style>
