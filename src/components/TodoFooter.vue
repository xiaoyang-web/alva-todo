<template>
  <div class="footer">
    <p class="desc">一个简单的todolist</p>
    <p class="author">&copy;Copyright 2021 alva-yky</p>
    <p class="project-link">
      <a href="#" target="_blank">View on GitHub</a>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.24rem;
}
.footer p {
  margin-top: 0.12rem;
}
.footer p:last-child {
  margin-bottom: 0.12rem;
}
</style>
