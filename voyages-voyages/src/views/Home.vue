<template>
  <div class="home">
    <h1><span class="el-icon-location"/> Welcome to travelers!</h1>
    <Trips/>
  </div>
</template>

<script>
import Trips from '@/components/Trips.vue'

export default {
  name: 'home',
  components: {
    Trips
  }
}
</script>
