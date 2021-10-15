<template>
  <div class="header">
    <h1>{{ this.title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TodoHeader',
  props: {
    title: {
      type: String,
      default: 'ALVA-TODO'
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  padding: 0.4rem 0;
}
h1 {
  font-size: 0.72rem;
  color: #4dba87;
}
</style>
