<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
var store = useStore()
var username = ref(store.state.user.token)
</script>
<template>
  <div>
    {{username}}
    <svg-icon icon="mima" />
  </div>
</template>
