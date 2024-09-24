<template>
  <header>
    <nav class="container">
      <ul>
        <li>
          <router-link to="/">Главная</router-link>
        </li>
        <li><router-link to="/about">О приложении</router-link></li>
      </ul>
    </nav>
  </header>
  <div class="container main-content">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>

<style scoped>
header {
  background-color: #f8f8f8;
}

.main-content {
  padding: 16px;
}

ul {
  padding: 16px 0;
  display: flex;
  gap: 8px;
  align-items: center;
  list-style: none;
  flex-wrap: wrap;
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
