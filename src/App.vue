<template>
  <div>
    <router-link to="/questions/">
      Index
    </router-link>
    <router-link to="/questions/new">
      New
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
div {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul {
  list-style: none;
  padding-right: 2em;
}
</style>
