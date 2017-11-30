<template>
  <div class="box" id="app">
    <header>
      <nav-bar></nav-bar>
    </header>
    <div class="container-fluid">
      <main role="main" class="pt-4">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    'nav-bar': Navbar
  }
}
</script>

<style scoped>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
.box {
  height: 100%;
}
.container-fluid {
  height: 100%;
}
.row {
  height: 100%;
}
</style>
