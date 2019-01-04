<template>
  <div id="app">
    <el-header>
      <el-header>
        <el-menu :default-active="$route.path" :router="true" mode="horizontal">
          <el-menu-item index="/">Voyages</el-menu-item>
          <el-menu-item index="/about">A propos</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-header>
  </div>
</template>

<script>
import services from './services'

export default {
  mounted() {
    services.csrfToken()
  }
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
