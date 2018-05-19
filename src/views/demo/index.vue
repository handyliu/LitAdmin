<template>
  <div class="app-container demo-container">
  </div>
</template>

<script>
export default {
  name: 'demo',
  components: { },
  data() {
    return {}
  },
  computed: {
  },
  created() {
  },
  methods: {
    resize() {
      console.log('resize')
    }
  }
}
</script>

<style scoped>
  .demo-container {
    position: relative;
    height: 100vh;
  }
</style>
