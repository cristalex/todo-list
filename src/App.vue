<template>
  <div id="app" class="app">
    <div class="app__content">
      <div class="container">
        <div id="nav">
          <router-link :to="{ name: 'home' }">Home</router-link> |
          <router-link :to="{ name: 'note' }">Add note</router-link>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
