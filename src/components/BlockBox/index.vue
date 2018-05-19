<template>
  <div class="box-view">
    <div class="header">
      <span>{{ title }}</span>
      <slot name="tool"></slot>
    </div>
    <div class="body" :style="styles">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "blockBox",
  props: {
    title: {
      type: String,
      default: ''
    },
    styles: {
      type: String,
      default: 'height: 200px'   
    }
  },
  methods: {
  },
  created() {
  },
  activated() {
  }
}
</script>

