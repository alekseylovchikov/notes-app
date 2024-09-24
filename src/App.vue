<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link to="/">Главная</router-link>
        </li>
        <li><router-link to="/about">О приложении</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  max-width: 1024px;
  margin: 0 auto;
}

nav {
  padding: 16px 0;
}

ul {
  display: flex;
  gap: 8px;
  align-items: center;
  list-style: none;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>
